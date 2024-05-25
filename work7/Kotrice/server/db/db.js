// 导入 mongoose
const mongoose = require('mongoose')
// 导入配置项
const { DBHOST, DBPORT, DBNAME } = require ('../config/config.js')
// 连接服务
module.exports = mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
