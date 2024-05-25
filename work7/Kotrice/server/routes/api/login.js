// 导入 express
const express = require('express')
// 导入 jwt
const jwt = require('jsonwebtoken')
// 导入 config
const { secret } = require('../../config/config')
// 引入模型对象
const UserModel = require('../../db/models/user')
// 创建路由对象
const router = express.Router()
// 创建路由规则
router.post('/login', (req, res) => {
  const { username } = req.body
  const token = jwt.sign({username}, secret, {
    // expiresIn: 60  设置token过期时间(单位为秒)
  })
  UserModel.create({
    username,
    token
  }).then(data => {
    res.json({
      code: 200,
      msg: '登录成功！',
      data: {
        token: data.token
      }
    })
  }).catch(err => {
    res.json({
      code: 500,
      msg: '该用户名已被登录，请更改用户名！',
      data: null
    })
  })
})


module.exports = router
