import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import ChatRoom from '@/views/ChatRoom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => Login
    },
    {
      path: '/chat-room',
      component: () => ChatRoom
    }
  ]
})

export default router
