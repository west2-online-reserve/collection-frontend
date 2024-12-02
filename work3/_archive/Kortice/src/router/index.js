import { createRouter, createWebHashHistory } from 'vue-router'

// 引入组件
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import TodoList from '../pages/TodoList.vue'
import TodoForm from '../pages/TodoForm.vue'

// 创建路由器
const router = createRouter({
  // 开启哈希模式
  history:createWebHashHistory(),
  // 路由配置
  routes:[
    {
      path:'/home',
      component:Home,
      redirect:'/home/login',
      children:[
        {
          path:'login',
          component:Login
        },
        {
          path:'register',
          component:Register
        }
      ]
    },
    {
      path:'/todolist',
      component:TodoList
    },
    {
      path:'/todoform',
      component:TodoForm
    },
    // 重定向
    {
      path:'/',
      redirect:'/home/login'
    }
  ]
})

export default router
