<template>
  <div v-infinite-scroll="load" :infinite-scroll-immediate="false" :infinite-scroll-distance="50">
    <div class="affix-container">
      <el-affix target=".affix-container">
        <Header/>
      </el-affix>
      <div class="bar-container">
        <div class="left">
          <div><img src="@/assets/logo.svg" alt="logo"></div>
          <div><p>Article House</p></div>
        </div>
        <img src="@/assets/bar.svg" alt="bar" class="bar">
        <div class="right">
          <div><p>Using Reading To</p></div>
          <div><p>Enjoy Life</p></div>
        </div>
      </div>
    </div>
    <el-main class="show-article">
      <div class="show-nav">
        <div @click="toHotPage" :class="activeHot">最热</div>
        <div @click="toNewPage" :class="activeNew">最新</div>
      </div>
      <RouterView/>
    </el-main>
    <!-- 返回顶部按钮 -->
    <BackTopBtn />
  </div>
</template>

<script setup name="Home">
  import Header from '@/components/Header.vue'
  import BackTopBtn from '@/components/BackTopBtn.vue'
  import { RouterView, useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue'
  import { useHotStore } from '@/stores/hot'
  import { useLatestStore } from '@/stores/latest'
  // 路由
  const router = useRouter()
  const route = useRoute()
  // pinia
  const hotStore = useHotStore()
  const { addHotNews } = hotStore //  关于最热的无限滚动方法
  const latestStore = useLatestStore()
  const { addLatestNews } = latestStore //  关于最新的无限滚动方法
  // 数据
  let activeHot = ref(route.path.split('/')[2] === 'hot' ? 'active-nav' : 'unactive-nav')
  let activeNew = ref(route.path.split('/')[2] === 'new' ? 'active-nav' : 'unactive-nav')
  // 方法
  function toHotPage() {
    router.push({
      path: '/home/hot'
    })
    // 导航栏切换样式
    activeHot.value = 'active-nav'
    activeNew.value = 'unactive-nav'
  }
  function toNewPage() {
    router.push({
      path: '/home/new'
    })
    // 导航栏切换样式
    activeHot.value = 'unactive-nav'
    activeNew.value = 'active-nav'
  }

  // 无限滚动的方法
  const load = () => {
    // 如果路由是 hot
    if (route.path.split('/')[2] === 'hot') addHotNews()
    // 如果路由是 new
    else if (route.path.split('/')[2] === 'new') addLatestNews()
  }
</script>

<style scoped>
  .bar-container {
    display: flex;
  }
  .left,
  .right {
    flex: 1;
    text-align: center;
    color: #FFF;
    font-weight: 700;
  }
  .left div,
  .right div {
    height: 50%;
    display: flex;
    justify-content: center;
  }
  .left div:first-child,
  .right div:first-child {
    background-color: #DE7F80;
    align-items: flex-end;
    font-size: 36px;
    line-height: 48px;
  }
  .left div:last-child,
  .right div:last-child {
    background-color: #DB7070;
    align-items: flex-start;
    font-size: 40px;
    line-height: 53px;
  }
  .show-article {
    background-color: #fff8f8;
  }
  .show-nav {
    width: 80%;
    margin: 0 auto;
    display: flex;
  }
  .show-nav div {
    margin-left: 80px;
    padding: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #FFF;
    border-radius: 16px 16px 0px 0px;
    cursor: pointer;
    transition: all 0.2s linear;
  }
  .show-nav div:hover {
    background-color: #F55E54;
  }
  .unactive-nav {
    background-color: #FFABA5;
  }
  .active-nav {
    background-color: #F55E54;
  }
  
</style>
