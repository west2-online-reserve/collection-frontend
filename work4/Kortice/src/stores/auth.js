import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', ()=>{
  // 数据
  const token = ref('')

  // 方法
  function setAuthToken(val) {
    token.value = val
  }
  function clearAuthToken() {
    token.value = ''
  }

  return {
    token,
    setAuthToken,
    clearAuthToken
  }
},{
  persist: true
})
