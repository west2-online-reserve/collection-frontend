import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 数据
  const username = ref('')
  // 函数
  function initUsername(name: string) {
    username.value = name
  }
  function deleteUser() {
    username.value = ''
  }

  return {
    username,
    initUsername,
    deleteUser
  }
}, {
  persist: true
})
