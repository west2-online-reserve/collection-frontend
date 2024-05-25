import { defineStore } from 'pinia'
import { ref } from 'vue'
import { socket } from '@/socket'

// 类型定义
interface Msg {
  username: string,
  createTime: string,
  msg: string,
  _id: string
}

interface MsgData {
  createTime: string,
  msg: string,
  username: string,
  __v: number,
  _id: string
}

export const useMsgStore = defineStore('msg', () => {
  // 数据
  const msgs = ref(<Msg[]>([]))
  // 函数
  function addMsg(data: Msg) {
    msgs.value.push(data)
  }
  function bindEvents() {
    socket.on('get msg', (data: MsgData) => {
      const { username, createTime, msg, _id } = data
      addMsg({username, createTime, msg, _id})
    })
  }

  return {
    msgs,
    addMsg,
    bindEvents
  }
}, {
  persist: true
})
