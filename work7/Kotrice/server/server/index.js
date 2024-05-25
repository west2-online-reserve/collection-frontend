// 导入 express
const express = require('express')
// 导入 http
const http = require('http')
// 导入 db
const db = require('../db/db.js')
// 导入socket.io
const socketIO = require('socket.io')
// 导入 cors
const cors = require('cors')
// 导入 body-parser
const bodyParser = require('body-parser')
// 导入路由模块
const loginRouter = require('../routes/api/login.js')
const logoutRouter = require('../routes/api/logout.js')
// 导入socketHandler
const socketHandler = require('../utils/socketHandler.js')

// 创建服务对象
const app = express()
// 创建服务器实例
const server = http.createServer(app)
// 创建socket.io实例对象 并且 解决socket.io的跨域问题
const io = new socketIO.Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})
// 调用socket-io的事件
socketHandler(io)

// 解决跨域问题
app.use(cors({
  origin: 'http://localhost:5173', // 允许的前端URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true // 允许携带凭证
}));
// body-parser相关中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 应用api模块
app.use('/', loginRouter)
app.use('/', logoutRouter)

// 连接数据库
db.then(() => {
  // 监听端口，启动服务
  server.listen(3000, () => {
    console.log('server is running')
  })
}).catch(err => {
  throw(err)
})
