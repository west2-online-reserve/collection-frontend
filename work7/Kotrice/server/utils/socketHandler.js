// 导入 MsgModel
const MsgModel = require('../db/models/msg')

// 暴露socketHandler函数
module.exports = (io) => {
  io.on('connect', (socket) => {
    console.log('server connect')

    socket.on('send msg', (msg) => {
      MsgModel.create(msg)
      .then(data => {
        io.emit('get msg', data)
      })
      .catch(err => {
        console.log(err)
      })
    })

    socket.on('disconnect', () => {
      console.log('server disconnect')
    })
  })
}
