# 福州大学通知爬虫
这是一个用于爬取福州大学通知文件系统（ https://info22.fzu.edu.cn/lm_list.jsp?wbtreeid=1460 ）上2025年1月1日至今所有通知的Node.js爬虫程序。

# 功能特点
爬取通知的发表日期、部门、标题和访问链接

额外爬取通知正文内容和访问人数

使用并发控制提升爬取效率

将数据保存到SQLite数据库和JSON文件

自动过滤重复通知
# 运行指南
## 前置要求
确保在福州大学校园网环境（或通过VPN连接校园网）下运行

Node.js 14+ 版本

网络连接正常

## 安装步骤
安装依赖
`npm install axios cheerio p-queue sqlite3`

运行爬虫
`node spider.js`


输出文件

爬虫完成后，将生成以下文件：

notices.db - SQLite数据库文件

notices.json - JSON格式的通知数据

## 数据字段说明

每个通知对象包含以下字段：

| 字段名         | 类型   | 说明                     |
|---------------|--------|-------------------------|
| publish_date  | String | 发布日期 (YYYY-MM-DD)   |
| department    | String | 发布部门                |
| title         | String | 通知标题                |
| url           | String | 通知详情链接            |
| content       | String | 通知正文内容            |
| view_count    | Number | 访问人数                |
## 数据库查询示例
使用SQLite命令行工具查询数据：

`sqlite3 notices.db`

查询所有通知

`SELECT * FROM notices;`

按部门统计通知数量

`SELECT department, COUNT(*) as count 
FROM notices 
GROUP BY department 
ORDER BY count DESC;`

查询访问量最高的10条通知

`SELECT title, view_count 
FROM notices 
ORDER BY view_count DESC 
LIMIT 10;`

# 其他说明
请确保在福州大学校园网环境下运行本程序

合理设置并发数（默认5），避免对服务器造成过大压力

爬取大量数据可能需要较长时间（10-30分钟）

数据库文件会持续累积数据，可定期清理

依赖项
axios: HTTP客户端

cheerio: HTML解析器

p-queue: 并发控制队列

sqlite3: SQLite数据库驱动