import { io } from 'socket.io-client'
import config from '@/config/config'
const { HOST, PORT }  = config

export const socket = io(`http://${HOST}:${PORT}`, {
  autoConnect: false  //  禁止自动连接
})

socket.on('connect', () => {
  console.log('client connect')
})



