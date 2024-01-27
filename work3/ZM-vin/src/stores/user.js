import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
export const useUserStore = defineStore('user1', () => {
    const register = reactive([])
    const name = ref('')
    return {
        register,
        name,
    }
}, {
    persist:true
})