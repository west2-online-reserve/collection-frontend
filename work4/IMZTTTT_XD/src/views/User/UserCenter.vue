<template>
  <div class="common-layout">
    <div class="user">
      <div class="userTotal">
        <Avatar :size="80" :userId="userStore.user.userId"></Avatar>
        <div class="userInfo">
          <div class="userName" style="margin-bottom: 12px;font-size: 24px;">
            {{ userInfo.userName }}
          </div>
          <div class="userIntr" style="font-size: 16px;">
            {{ userInfo.introduction ? userInfo.introduction : '一句话个人简介' }}
          </div>
        </div>
      </div>
      <el-button type="primary" @click="router.push('/User')" size="large"
        style="width:100px;font-size: 20px;margin-right: 100px;">设置</el-button>
    </div>
    <el-container>
      <el-header>
        <el-menu router mode="horizontal">
          <el-menu-item :class="tabClass(0)" @click="changeOrderType(0)">文章</el-menu-item>
          <el-menu-item :class="tabClass(1)" @click="changeOrderType(1)">点赞</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="articlelist">
        <div class="skeleton" v-if="loading">
          <el-skeleton :rows="5" animated />
        </div>
        <div v-for="item in articleListInfo" v-if="!loading">
          <ArticleListItem :data="item" :loading="loading"></ArticleListItem>
        </div>
        <el-empty :image-size="200" v-if="isEmpty && !loading" description="暂无文章" />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUserArticleSevrvice, getUserLikeSevrvice } from '../../apis/user.js'
import ArticleListItem from '../menu/ArticleListItem.vue';
import { useRouter } from 'vue-router';
import { useTokenStore } from '@/stores/token.ts'
import { useUserStore } from '@/stores/user.ts'
import Avatar from '@/components/Avatar.vue';
const tokenStore = useTokenStore()
const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const orderType = ref(0)
const isEmpty = ref(false)
const userInfo = userStore.user
const articleListInfo = ref({})

// 根据标签获取文章
const loadArticle = async () => {
  try {
    loading.value = true
    if (orderType.value === 0) {
      let result = await getUserArticleSevrvice(tokenStore.token)
      if (result.code === 1) {
        articleListInfo.value = result.data
        isEmpty.value = false
      }else{
        isEmpty.value = true
      }
    } else if (orderType.value === 1){
      let result = await getUserLikeSevrvice(tokenStore.token)
      if (result.code === 1) {
        articleListInfo.value = result.data
        isEmpty.value = false
      } else{
        isEmpty.value = true
      }
    }
    loading.value = false
  } catch (err) {
    alert(err.message || "加载失败");
  }
}
loadArticle()

const tabClass = (type) => {
  return ['tab', orderType.value === type ? 'active' : ''];
};

const changeOrderType = (type) => {
  orderType.value = type;
  articleListInfo.value = {}
  loadArticle()
}
</script>

<style scoped>
.common-layout {
  width: 850px;
  margin: 100px auto;
  text-align: center;

  .user {
    background-color: white;
    height: 160px;
    margin-bottom: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .userTotal {
      display: flex;
      align-items: center;

      .el-avatar {
        margin-left: 80px;
      }

      .userInfo {
        text-align: left;
        margin-left: 50px;
      }
    }

  }

  .el-container {
    background-color: white;

    .el-header {
      padding: 0px
    }

    .el-main {
      --el-main-padding: 0px;
      overflow-y: hidden;
    }

    .el-menu-item {
      width: 100px;
      font-size: 18px;
      display: block;
    }
  }

  .active {
    transition: border-bottom 0.3s ease;
    border-bottom: 3px solid transparent;
  }

  .active::after {
    content: '';
    display: block;
    width: 50%;
    height: 3px;
    background-color: #4585FF;
    margin: auto;
    border-radius: 3px;
  }
}</style>