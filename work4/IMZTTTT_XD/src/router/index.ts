import { createRouter,createWebHistory } from "vue-router";
// 导入组件
import Layout from '@/views/Layout.vue';
import Login from '@/views/Login.vue';
import ArticleListVue from "../views/menu/ArticleList.vue";
import post from '../views/menu/ArticleDetails.vue';
import EditPost from '../views/menu/EditPost.vue';
import User from '../views/User/User.vue';
import UserCenter from '@/views/User/UserCenter.vue';

// 定义路由关系
const routes=[
    {path :'/login',component: Login},
    {path :'/',component: Layout,redirect:'/login' ,children: [
        {path:'/menu',component:ArticleListVue},
        {path:'/EditPost',component:EditPost},
        {path:'/post/:articleId',component:post},
        {path:'/UserCenter',component:UserCenter}
    ]},
    {path:'/User',component:User}
]
// 创建路由器
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})
// 导出路由
export default router