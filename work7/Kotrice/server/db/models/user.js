// 导入 mongoose
const mongoose = require('mongoose')
// 创建文档对象
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
})
// 创建模型对象
const UserModel = mongoose.model('users', UserSchema)

// 暴露模型对象
module.exports = UserModel
