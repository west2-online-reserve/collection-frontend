// router/index.ts
import {createRouter, createWebHashHistory, } from 'vue-router'
import HomeView from '@/views/HomeView.vue' 
import TodoListViewVue from '@/views/TodoListView.vue'
import TablePresentationViewVue from '@/views/TablePresentationView.vue'

const router = createRouter({
  history: createWebHashHistory(), 
  routes: [
    {
      name: 'authentication',
      path: '/authentication',
      component: () => import('@/views/AuthenticationView.vue'),
      children: [
        {
          name: 'login',
          path: '',
          component: () => import('@/components/CustomLoginForm.vue')
        },
        {
          name: 'register',
          path: 'register',
          component: () => import('@/components/CustomRegisterForm.vue')
        },
        {
          name: 'reset-password',
          path: 'reset-password',
          component: () => import('@/components/CustomResetPasswordForm.vue')
        },
      ]
    },
    {
      name: 'home',
      path: '/home',
      component: HomeView,
      children: [
        {
          name: 'todolist',
          path: '',
          component: TodoListViewVue,
        },
        {
          name: 'table-presentation',
          path: 'table-presentation',
          component: TablePresentationViewVue,
        },
      ]
    },
    {
      path:'/',
      redirect: '/authentication'
    }
  ]
})

export default router
