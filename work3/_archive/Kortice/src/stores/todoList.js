import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTodoListStore = defineStore('todoList', ()=>{
  // 数据(state)
  const todoList = reactive([])

  // 返回相关的数据
  return {
    todoList
  }

}, {
  persist:true
})
