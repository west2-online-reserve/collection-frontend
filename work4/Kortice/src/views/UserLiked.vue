<template>
  <el-card class="Card">
    <el-skeleton :rows="7" animated :loading="loading">
      <el-empty :image-size="150" v-if="!blogList.length" />
      <div class="content-container" v-for="b in blogList" :key="b.id" @click="toArticlePage(b.id)">
        <h3 class="title">{{ b.title }}</h3>
        <div class="info">
          {{ b.info }}
        </div>
        <div class="aboutUser">
          <div class="left">
            <span class="username">{{ b.username }}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="time">{{ b.createTime }}:33:41</span>
          </div>
          <div class="right">
            <img src="@/assets/view.svg" alt="view"> <span>{{ b.views }}</span>
            <img src="@/assets/like.svg" alt="like" v-if="!b.isLike">
            <img src="@/assets/heartLiked.svg" alt="like" v-if="b.isLike">
              <span>{{ b.liked }}</span>
          </div>
        </div>
        <el-divider/>
      </div>
    </el-skeleton>
  </el-card>
</template>

<script setup name="UserLiked">
  import { getMyLiked } from '@/api/article'
  import { onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  // 路由
  const router = useRouter()
  // 数据
  const blogList = reactive([])
  const loading = ref(true)
  // 方法
  function setBlogsInfo(b) { // 设置info
    // 找到第一个 '\n'
    const startIndex = b.content.indexOf('\n')
    // 截取片段
    const info = b.content.slice(2, startIndex)
    // 设置这个属性
    b.info = info
  }
  
  function toArticlePage(articleId) {
    router.push({
      path: `/article/${articleId}`
    })
  }
  // 挂载的时候
  onMounted(()=>{
    getMyLiked().then(
      res => {
        if (res.code === 200) {
          Object.assign(blogList, [...res.data.blogList])
          blogList.forEach(b => {
            setBlogsInfo(b)
          })
        } else {
          ElMessage.error(res.msg)
        }
      },
      err => {
        throw err
      }
    )
    setTimeout(()=>{
      loading.value = false
    }, 500)
  })
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
