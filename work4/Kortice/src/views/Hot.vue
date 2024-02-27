<template>
  <el-card class="Card">
    <el-skeleton :rows="9" animated :loading="loading" >
      <template #default>
        <el-empty style="height: 318px;" v-show="!hot.length" />
        <div class="content-container" v-for="h in hot" :key="h.id" @click="toArticlePage(h.id)" v-show="hot.length">
          <h3 class="title">{{ h.title }}</h3>
          <div class="info">{{ h.info }}</div>
          <div class="aboutUser">
            <div class="left">
              <span class="username">{{ h.username }}</span>
              <el-divider direction="vertical"></el-divider>
              <span class="time">{{ h.createTime }}</span>
            </div>
            <div class="right">
              <img src="@/assets/view.svg" alt="view"> <span>{{ h.views }}</span>
              <img src="@/assets/like.svg" alt="like" v-if="!h.isLike">
              <img src="@/assets/heartLiked.svg" alt="like" v-if="h.isLike">
                <span>{{ h.liked }}</span>
            </div>
          </div>
          <el-divider/>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<script setup name="Hot">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useHotStore } from '@/stores/hot'
  import { getHotBlogs } from '@/api/article'
  // 生命周期钩子
  onMounted(()=>{
    getHotBlogs().then(
      res => {
        if (res.code === 200) {
          hotStore.setHotBlogs(res.data)
          setTimeout(()=>{
            loading.value = false
          }, 500)
        } else {
          ElMessage.error(res.msg)
        }
      }
    )
  })
  // pinia
  const hotStore = useHotStore()
  const { hot } = hotStore // 关于最热的数据
  // 路由
  const router = useRouter()
  // 数据
  const loading = ref(true)
  // 方法
  function toArticlePage(articleId) {
    router.push({
      path: `/article/${articleId}`
    })
  }
</script>

<style scoped>
  .Card {
    width: 80%;
    margin: 0 auto;
  }
  .content-container {
    padding: 0 20px;
    padding-top: 24px;
    cursor: pointer;
  }
  .content-container:hover {
    background-color: #dcdfe6;
    transition: all .3s linear;
  }
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 42px;
    color: #000;
  }
  .info {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.6);
  }
  .title,
  .info {
    margin-bottom: 10px;
  }
  .aboutUser {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;

  }
  .right {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-style: normal;
    font-weight: 290;
    font-size: 20px;
    line-height: 27px;
  }
  .right img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
  .right span {
    margin-right: 36px;
  }
  .el-divider--horizontal {
    margin: 0;
    margin-top: 24px;
    height: 0;
  }
</style>
