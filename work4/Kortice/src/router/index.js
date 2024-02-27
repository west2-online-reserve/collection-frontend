import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Hot from '@/views/Hot.vue'
import New from '@/views/New.vue'
import Editor from '@/views/Editor.vue'
import Article from '@/views/Article.vue'
import User from '@/views/User.vue'
import UserEdited from '@/views/UserEdited.vue'
import UserLiked from '@/views/UserLiked.vue'
import Setting from '@/views/Setting.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      redirect: '/home/hot',
      component: Home,
      children: [
        {
          path: 'hot',
          component: Hot
        },
        {
          path: 'new',
          component: New
        }
      ]
    },
    {
      path: '/article/:articleId',
      component: Article
    },
    {
      path: '/editor',
      component: Editor
    },
    {
      path: '/user',
      component: User,
      redirect: '/user/edited',
      children: [
        {
          path: 'edited',
          component: UserEdited
        },
        {
          path: 'liked',
          component: UserLiked
        }
      ]
    },
    {
      path: '/setting',
      component: Setting
    },
    // 重定向
    {
      path: '/',
      redirect: '/home/hot'
    }
  ]
})

export default router
