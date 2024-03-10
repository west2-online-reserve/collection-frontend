import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
      
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: () => import('../views/Todolist.vue'),
      children:[
        {
          path:'/todolist/part1',
          name:'part1',
          component: () => import('../views/Part1.vue')
        },
        {
          path:'/todolist/part2',
          name:'part2',
          component: () => import('../views/Part2.vue')
        }
      ],
      redirect:'/todolist/part1'
    }
  ]
})

export default router
