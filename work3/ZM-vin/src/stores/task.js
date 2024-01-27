import { defineStore } from 'pinia'
import { ref,reactive } from 'vue'
export const useTaskStore = defineStore('user2', () => {
    const count=ref(0)
    const list = reactive([])
    const data = reactive(list)
    return { list, count, data}
}, {
    persist: true
})