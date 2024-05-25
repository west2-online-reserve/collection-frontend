// 导入 mongoose
const mongoose = require('mongoose')

// 创建文档对象
const MsgSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  createTime: {
    type: String,
    require: true
  },
  msg: {
    type: String,
    require: true
  }
})

// 创建模型对象
const MsgModel = mongoose.model('msg', MsgSchema)

// 暴露模型对象
module.exports = MsgModel
