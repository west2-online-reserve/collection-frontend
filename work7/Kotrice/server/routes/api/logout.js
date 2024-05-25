// 导入 express
const express = require('express')
// 引入模型对象
const UserModel = require('../../db/models/user')
// 创建路由对象
const router = express.Router()
// 创建路由规则
router.post('/logout', (req, res) => {
  const { username } = req.body
  UserModel.deleteOne({username})
  .then(data => {
    res.json({
      code: 200,
      msg: '登出成功！',
      data: null
    })
  })
  .catch(err => {
    res.json({
      code: 500,
      msg: '登出失败！请重试！',
      data: null
    })
  })
})


module.exports = router
