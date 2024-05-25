import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 数据
  const token = ref('')
  // 方法
  function initToken(t: string) {
    token.value = t
  }
  function deleteToken() {
    token.value = ''
  }

  return {
    token,
    initToken,
    deleteToken
  }
}, {
  persist: true
})
