<script lang="ts" setup>
import { ref } from 'vue';
import { getRankingListService, getCurrentListService } from '@/apis/article.js';
import ArticleListItem from './ArticleListItem.vue';
import { useTokenStore } from '@/stores/token';
const loading = ref(false)
const orderType = ref(0)
const articleListInfo = ref({})
const isEmpty = ref(false)
const tokenStore = useTokenStore()
const loadArticle = async () => {
  try {
    loading.value = true
    if (orderType.value === 0) {
      let result = await getRankingListService(tokenStore.token)
      if (result.code === 1) {
        articleListInfo.value = result.data
        if (articleListInfo.value.records.length === 0) {
          isEmpty.value = true
        }
      }else{
        return false;
      }
    }
    if (orderType.value === 1) {
      let result = await getCurrentListService(tokenStore.token)
      if (result.code === 1) {
        articleListInfo.value = result.data
        if (articleListInfo.value.records.length === 0) {
          isEmpty.value = true
        }
      } else {
        return false
      }
    }
    loading.value = false
  } catch (err) {
    alert(err.message || "加载失败");
  }

}
loadArticle()
const changeOrderType = (type) => {
  orderType.value = type;
  loadArticle()
}
const tabClass = (type) => {
  return ['tab', orderType.value === type ? 'active' : ''];
};

</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu router mode="horizontal">
          <el-menu-item :class="tabClass(0)" @click="changeOrderType(0)">推荐</el-menu-item>
          <el-menu-item :class="tabClass(1)" @click="changeOrderType(1)">最新</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="articlelist">
        <div class="skeleton" v-if="loading">
          <el-skeleton :rows="5" animated />
        </div>
        <div v-for="item in articleListInfo.records" v-if="!loading">
          <ArticleListItem :data="item" :loading="loading"></ArticleListItem>
        </div>
        <el-empty :image-size="200" v-if="isEmpty && !loading" description="暂无文章" />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  width: 850px;
  margin: 0px auto;
  text-align: center
}

.el-container {
  background-color: white;
  margin-top: 100px;

  .el-header {
    padding: 0px
  }

  .el-main {
    --el-main-padding: 0px;
    overflow-y: hidden;
  }
}

.el-menu-item {
  width: 100px;
  font-size: 18px;
  display: block;
}

.active::after {
  content: '';
  display: block;
  width: 50%;
  height: 3px;
  background-color: #4585FF;
  margin: auto;
  border-radius: 3px;
  transition: width var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier), transform var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}
</style>