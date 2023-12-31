// router/index.ts
import {createRouter, createWebHashHistory, } from 'vue-router'
import HomeView from '@/views/HomeView.vue' 


const router = createRouter({
  history: createWebHashHistory(), 
  routes: [
    {
      name: 'test',
      path: '/test',
      // 
      component: () => import('@/views/TestView.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      name: 'home',
      path: '/home',
      component: HomeView
    },
    {
      path:'/',
      redirect:'/login'
  }
  ]
})

export default router
