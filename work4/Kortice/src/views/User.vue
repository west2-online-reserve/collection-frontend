<template>
  <Header />
  <div class="user-card-container">
    <UserCard />
  </div>
  <el-main class="about-user-article">
    <div class="nav">
      <div :class="activeEdited" @click="toUserEditedPage">创作</div>
      <div :class="activeLiked"  @click="toUserLikedPage" >赞过</div>
    </div>
    <RouterView />
  </el-main>
  <!-- 返回顶部按钮 -->
  <BackTopBtn />
</template>

<script setup name="User">
  import Header from '@/components/Header.vue'
  import UserCard from '@/components/UserCard.vue'
  import { RouterView, useRouter, useRoute } from 'vue-router'
  import { ref } from 'vue'
  // 路由
  const router = useRouter()
  const route = useRoute()
  // 数据
  const activeEdited = ref(route.path.split('/')[2] === 'edited' ? 'active-nav' : 'unactive-nav')
  const activeLiked = ref(route.path.split('/')[2] === 'liked' ? 'active-nav' : 'unactive-nav')
  // 方法
  function toUserEditedPage() {
    router.push({
      path: '/user/edited'
    })
    activeEdited.value = 'active-nav'
    activeLiked.value = 'unactive-nav'
  }
  function toUserLikedPage() {
    router.push({
      path: '/user/liked'
    })
    activeEdited.value = 'unactive-nav'
    activeLiked.value = 'active-nav'
  }
</script>

<style scoped>
  .user-card-container {
    width: 100%;
    height: 40vh;
    background-color: #fff;
    display: flex;
    align-items: flex-end;
  }
  .about-user-article {
    background: linear-gradient(to bottom, rgba(255,171,165,0.5), #fff);
  }
  .nav {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .nav div {
    width: 128px;
    height: 69px;
    text-align: center;
    line-height: 69px;
    font-weight: 400;
    font-size: 24px;
    cursor: pointer;
    margin-top: 40px;
    transition: all .3s ease-out;
  }
  .nav div:first-child {
    border-radius: 16px 0px 0px 0px;
  }
  .nav div:last-child {
    border-radius: 0px 16px 0px 0px;
  }
  .active-nav {
    background-color: #F55E54;
    color: #fff;
  }
  .unactive-nav {
    background-color: #fff;
    color: #F55E54;
  }
</style>
