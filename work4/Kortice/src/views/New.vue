<template>
  <el-card class="Card">
    <el-skeleton :rows="9" animated :loading="loading" >
      <template #default>
        <el-empty style="height: 318px;" v-show="!latest.length" />
        <div class="content-container" v-for="l in latest" :key="l.id" @click="toArticlePage(l.id)" v-show="latest.length" >
          <h3 class="title">{{ l.title }}</h3>
          <div class="info">{{ l.info }}</div>
          <div class="aboutUser">
            <div class="left">
              <span class="username">{{ l.username }}</span>
              <el-divider direction="vertical"></el-divider>
              <span class="time">{{ l.createTime }}</span>
            </div>
            <div class="right">
              <img src="@/assets/view.svg" alt="view"> <span>{{ l.views }}</span>
              <img src="@/assets/like.svg" alt="like" v-if="!l.isLike">
              <img src="@/assets/heartLiked.svg" alt="like" v-if="l.isLike">
                <span>{{ l.liked }}</span>
            </div>
          </div>
          <el-divider/>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<script setup name="New">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useLatestStore } from '@/stores/latest'
  import { getLatestBlogs } from '@/api/article'
  // 生命周期钩子
  onMounted(()=>{
    getLatestBlogs().then(
      res => {
        if (res.code === 200) {
          latestStore.setLatestBlogs(res.data.list, res.data.minTime, res.data.offset)
          setTimeout(()=>{
            loading.value = false
          }, 500)
        } else {
          ElMessage.error(res.msg)
        }
      },
      err => {
        throw err
      }
    )
  })
  // 路由
  const router = useRouter()
  // pinia
  const latestStore = useLatestStore()
  const { latest } = latestStore // 关于 latest 中的数据
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
