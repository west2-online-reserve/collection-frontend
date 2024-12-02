import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAccountsStore = defineStore('accounts', ()=>{
  // 数据(state)
  const accounts = reactive([])

  // 返回相关的数据
  return {
    accounts,
  }

},{
  persist:true
})
