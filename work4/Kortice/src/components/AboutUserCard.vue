<template>
  <el-card>
    <template #header>
      <span class="about-text">关于作者</span>
    </template>
    <div class="about-body">
      <el-avatar shape="square" :size="85" :src="article.avatarUrl" :icon="UserFilled"/>
      <span class="username">{{ article.username }}</span>
      <el-button type="danger" @click="handleFollow">
        <span v-show="!isFollowed" >关注</span>
        <img src="@/assets/followed.svg" alt="followed" v-show="isFollowed">
      </el-button>
    </div>
    <template #footer>
      <div class="about-author">
        <div class="item-container">
          <div class="item-title">文章</div>
          <div class="item-count">{{ aboutAuthor.blogsCount }}</div>
        </div>
        <div class="item-container">
          <div class="item-title">粉丝</div>
          <div class="item-count">233</div>
        </div>
        <div class="item-container">
          <div class="item-title">关注</div>
          <div class="item-count">233</div>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup name="AboutUserCard">
  import { ref } from "vue"
  import { useArticleStore } from "@/stores/article"
  import { UserFilled } from '@element-plus/icons-vue'
  // pinia
  const articleStore = useArticleStore()
  const { article, aboutAuthor } = articleStore  //  关于文章的数据
  // 数据
  const isFollowed = ref(false)
  // 方法
  function handleFollow() {
    isFollowed.value = !isFollowed.value
  }
</script>

<style scoped>
  .el-card {
    position: fixed;
    width: 21%;
    border-radius: 16px;
  }
  .about-body {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .about-text {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #000000;
  }
  .username {
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #000000;
  }
  .el-button {
    background: #F55E54;
    border-radius: 16px;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: #FFFFFF;
    width: 70px;
  }
  .about-author {
    display: flex;
    justify-content: space-around;
  }
  .item-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  }
  .item-title {
    color: rgba(0, 0, 0, 0.6);
  }
  :deep(.el-card__header),
  :deep(.el-card__footer) {
    border: none;
  }
</style>
