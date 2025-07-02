const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const PQueue = require('p-queue').default;
const sqlite3 = require('sqlite3').verbose();

// 配置参数
const BASE_URL = 'https://info22.fzu.edu.cn/lm_list.jsp';
const START_DATE = new Date('2025-01-01');
const CONCURRENCY = 5; // 并发控制
const DB_FILE = 'notices.db';


const db = new sqlite3.Database(DB_FILE);


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    publish_date TEXT NOT NULL,
    department TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    content TEXT,
    view_count INTEGER
  )`);
});

async function getTotalPages() {
  try {
    const response = await axios.get(BASE_URL, {
      params: { wbtreeid: 1460 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
  
    const paginationText = $('.p_t').first().text();
    const match = paginationText.match(/共(\d+)条/);
    if (match) {
      const totalItems = parseInt(match[1]);
      return Math.ceil(totalItems / 20); // 每页20条
    }
    

    const lastPageLink = $('.p_last a').attr('href');
    if (lastPageLink) {
      const pageMatch = lastPageLink.match(/PAGENUM=(\d+)/);
      if (pageMatch) return parseInt(pageMatch[1]);
    }
    
    console.log('无法确定总页数，使用默认值1');
    return 1;
    
  } catch (error) {
    console.error('获取总页数失败:', error.message);
    return 1;
  }
}


function parsePage(html, pageNum) {
  const $ = cheerio.load(html);
  const notices = [];
  

  const items = $('li.clearfloat');
  
  items.each((i, item) => {
    const $item = $(item);
    
  
    const dateText = $item.find('.fr').text().trim();
    const dateMatch = dateText.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!dateMatch) return;
    
    const publishDate = new Date(
      parseInt(dateMatch[1]),
      parseInt(dateMatch[2]) - 1,
      parseInt(dateMatch[3])
    );
    

    if (publishDate < START_DATE) return;
    
  
    let department = $item.find('a.lm_a').text().trim();

    department = department.replace(/【|】/g, '');

    const titleLink = $item.find('p a').last();
    const title = titleLink.attr('title') || titleLink.text().trim();
    let url = titleLink.attr('href');
    
 
    if (url && !url.startsWith('http')) {
      if (url.startsWith('content.jsp')) {
        url = `https://info22.fzu.edu.cn/${url}`;
      } else {
        url = new URL(url, BASE_URL).href;
      }
    }
    
    if (!title || !url) return;
    
    notices.push({
      publish_date: publishDate.toISOString().split('T')[0],
      department,
      title,
      url
    });
  });

  return notices;
}


async function fetchNoticeDetail(notice) {
  try {
    const response = await axios.get(notice.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': BASE_URL
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
  
    let content = $('.v_news_content').text().trim();
    if (!content) {
      content = $('#news_content_display').text().trim() || '无法提取内容';
    }
    
 
    let viewCount = 0;
    const viewText = $('.conthsj').text();
    const viewMatch = viewText.match(/阅读：(\d+)/);
    if (viewMatch) {
      viewCount = parseInt(viewMatch[1]);
    }

    return {
      ...notice,
      content,
      view_count: viewCount
    };
  } catch (error) {
    console.error(`获取详情失败: ${notice.url}`, error.message);
    return {
      ...notice,
      content: "获取内容失败",
      view_count: 0
    };
  }
}


function insertNotice(notice) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR IGNORE INTO notices (publish_date, department, title, url, content, view_count)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        notice.publish_date,
        notice.department,
        notice.title,
        notice.url,
        notice.content,
        notice.view_count
      ],
      function(err) {
        if (err) {
          console.error(`插入数据库失败: ${notice.url}`, err.message);
          reject(err);
        } else {
          if (this.changes > 0) {
            console.log(`已保存: ${notice.title}`);
          }
          resolve();
        }
      }
    );
  });
}

// 主爬虫函数
async function main() {
  try {
    const totalPages = await getTotalPages();
    console.log(`总页数: ${totalPages}`);
    
    const queue = new PQueue({ concurrency: CONCURRENCY });
    const allNotices = [];
    

    for (let page = 1; page <= totalPages; page++) {
      queue.add(async () => {
        try {
          console.log(`抓取第 ${page}/${totalPages} 页...`);
          const response = await axios.get(BASE_URL, {
            params: {
              wbtreeid: 1460,
              pagenno: page
            },
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 15000
          });
          
          const notices = parsePage(response.data, page);
          console.log(`第 ${page} 页找到 ${notices.length} 条通知`);
          
 
          for (const notice of notices) {
            queue.add(async () => {
              try {
                const fullNotice = await fetchNoticeDetail(notice);
                allNotices.push(fullNotice);
                await insertNotice(fullNotice);
              } catch (err) {
                console.error(`处理通知失败: ${notice.url}`, err.message);
              }
            });
          }
          
        } catch (error) {
          console.error(`第 ${page} 页抓取失败:`, error.message);
        }
      });
    }

    await queue.onIdle();
    

    fs.writeFileSync('notices.json', JSON.stringify(allNotices, null, 2));
    console.log(`共爬取 ${allNotices.length} 条通知，数据已保存到 notices.json 和数据库`);
    
  } catch (error) {
    console.error('爬虫运行失败:', error);
  } finally {
    db.close();
  }
}

main();