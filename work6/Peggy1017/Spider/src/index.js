const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const startDate = new Date('2025-01-01');
const endDate = new Date('2025-12-31');
const allNotices = [];

async function scrapeNotices() {
  try {
    console.log('开始爬取福州大学通知文件系统...');
    
    console.log('启动浏览器...');
    const browser = await puppeteer.launch({
      headless: false, 
      defaultViewport: null,
      args: ['--start-maximized'],
      timeout: 60000 
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    page.setDefaultNavigationTimeout(60000); 
    console.log('直接访问WebVPN登录页面...');
    try {
      await page.goto('https://info22-443.webvpn.fzu.edu.cn/lm_list.jsp?urltype=tree.TreeTempUrl&wbtreeid=1460', { 
        waitUntil: 'networkidle2',
        timeout: 60000 
      });
    } catch (error) {
      console.error('访问登录页面超时，尝试继续执行:', error.message);
    }
    await page.screenshot({ path: path.join(__dirname, '..', 'webvpn_login_page.png') });
    console.log('请手动在浏览器中输入学工号和密码并登录，登录成功后程序将继续执行...');
    console.log('请在登录后手动导航到通知列表页面，然后按回车键继续爬取...');
    await new Promise((resolve) => {
      rl.question('已导航到通知列表页面，按回车键继续爬取...', () => {
        resolve();
      });
    });
    const currentUrl = await page.url();
    console.log(`当前页面URL: ${currentUrl}`);
    let totalPages = 0;
    try {
      const urlParams = new URL(currentUrl).searchParams;
      const totalPageParam = urlParams.get('totalpage');
      if (totalPageParam) {
        totalPages = parseInt(totalPageParam);
      }
      if (!totalPages || isNaN(totalPages)) {
        totalPages = await page.evaluate(() => {
          const paginationText = document.querySelector('.page_nav')?.textContent;
          if (paginationText) {
            const match = paginationText.match(/共(\d+)页/);
            return match ? parseInt(match[1]) : 0;
          }
          return 0;
        });
      }
    } catch (error) {
      console.error('提取总页数失败:', error.message);
    }
    if (!totalPages || isNaN(totalPages)) {
      totalPages = 1074; 
      console.log(`无法获取总页数，默认设置为 ${totalPages} 页`);
    } else {
      console.log(`检测到总页数: ${totalPages} 页`);
    }
    console.log('开始爬取第1页...');
    let pageNotices = await scrapePageContent(page);
    console.log(`第1页爬取完成，获取到 ${pageNotices.length} 条通知`);
    allNotices.push(...pageNotices);
    for (let pageNum = 2; pageNum <= totalPages; pageNum++) {
      console.log(`开始爬取第${pageNum}页...`);
      const nextPageUrl = `https://info22-443.webvpn.fzu.edu.cn/lm_list.jsp?totalpage=${totalPages}&PAGENUM=${pageNum}&urltype=tree.TreeTempUrl&wbtreeid=1460`;
      try {
        await page.goto(nextPageUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        pageNotices = await scrapePageContent(page);
        console.log(`第${pageNum}页爬取完成，获取到 ${pageNotices.length} 条通知`);
        const has2025Notices = pageNotices.some(notice => {
          const noticeDate = new Date(notice.date);
          return noticeDate.getFullYear() === 2025;
        });
        
        if (!has2025Notices) {
          console.log(`第${pageNum}页没有2025年的通知，停止爬取`);
          break;
        }
        allNotices.push(...pageNotices);
      } catch (error) {
        console.error(`爬取第${pageNum}页时出错:`, error.message);
      }
    }
    
    console.log(`爬取完成，共获取${allNotices.length}条通知`);
    const notices2025 = allNotices.filter(notice => {
      const noticeDate = new Date(notice.date);
      return noticeDate >= startDate && noticeDate <= endDate;
    });
    
    console.log(`2025年的通知共有 ${notices2025.length} 条`);
    if (notices2025.length === 0) {
      console.log('未能获取到任何2025年的通知数据，请检查页面结构');
      await browser.close();
      rl.close();
      return [];
    }
    
    saveToJson(notices2025);
    await browser.close();
    rl.close();
    return notices2025;
  } catch (error) {
    console.error('爬取过程中出现错误:', error);
    rl.close();
    throw error;
  }
}

async function scrapePageContent(page) {
  const pageContent = await page.content();
  const $ = cheerio.load(pageContent);
  const noticeItems = $('li.clearfloat');
  console.log(`找到 ${noticeItems.length} 个可能的通知项`);
  const pageNotices = [];
  noticeItems.each((i, item) => {
    try {
      const $item = $(item);
      const links = $item.find('a');
      if (links.length < 2) {
        console.log(`通知项 #${i+1} 的链接数量不足: ${links.length}`);
        return;
      }
      const departmentElem = links.first();
      const department = departmentElem.text().trim().replace(/[\[\]【】]/g, '');
      const titleElem = links.eq(1);
      const title = titleElem.text().trim();
      const relativeLink = titleElem.attr('href');
      
      if (!title || !relativeLink) {
        console.log(`通知项 #${i+1} 缺少标题或链接`);
        return;
      }
      let fullLink = relativeLink;
      if (!fullLink.startsWith('http')) {
        const currentUrl = page.url();
        const urlObj = new URL(currentUrl);
        const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
        
        if (fullLink.startsWith('/')) {
          fullLink = `${baseUrl}${fullLink}`;
        } else {
          const pathParts = urlObj.pathname.split('/');
          pathParts.pop();
          const basePath = pathParts.join('/');
          fullLink = `${baseUrl}${basePath}/${fullLink}`;
        }
      }
      const dateElem = $item.find('span.fr');
      let dateText = dateElem.length > 0 ? dateElem.text().trim() : '';
      if (!dateText) {
        const itemText = $item.text().trim();
        const dateMatch = itemText.match(/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          dateText = dateMatch[1];
        }
      }
      let noticeDate = null;
      let formattedDate = '';
      if (dateText) {
        try {
          formattedDate = dateText;
          noticeDate = new Date(dateText);
        } catch (e) {
          console.log(`日期解析错误: ${e.message}, 日期文本: ${dateText}`);
        }
      }
      if (!noticeDate) {
        const now = new Date();
        formattedDate = now.toISOString().split('T')[0];
        noticeDate = now;
      }
      pageNotices.push({
        title,
        link: fullLink,
        department,
        date: formattedDate
      });
      
    } catch (error) {
      console.error(`处理通知项时出错: ${error.message}`);
    }
  });
  
  return pageNotices;
}

function saveToJson(data) {
  const filePath = path.join(__dirname, '..', 'notices.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`数据已保存到 ${filePath}`);
}

scrapeNotices().catch(console.error); 