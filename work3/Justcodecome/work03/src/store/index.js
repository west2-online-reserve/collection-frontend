import { createPinia, defineStore } from 'pinia'

export const useStore = createPinia()

export const store = defineStore({
  id: 'app',
  state: () => ({
    userInfo: {
      username: '',
      email: ''
    },
    todos: []
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    addTodoItem(item) {
      this.todos.push(item)
    }
  }
})

export default useStore;