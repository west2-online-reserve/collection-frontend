<template>
  <el-row justify="center">
    <el-col :span="3" class="like-col">
      <div class="like-container" :class="isLike" @click="changeLike">
        <img src="@/assets/whiteLike.svg" alt="like" v-show="!article.isLike">
        <img src="@/assets/redLike.svg" alt="like"   v-show="article.isLike">
      </div>
    </el-col>
    <el-col :span="18">
      <el-card>
        <h1 class="title">
          {{ article.title }}
        </h1>
        <div class="aboutUser">
          <div class="left">
            <span class="username">{{ article.username }}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="time">{{ article.createTime }}</span>
          </div>
          <div class="right">
            <img src="@/assets/view.svg" alt="view"> <span>{{ article.views }}</span>
            <img src="@/assets/like.svg" alt="like"> <span>{{ article.liked }}</span>
          </div>
        </div>
        <v-md-editor :model-value="article.content" mode="preview" class="content" ref="articleRef" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup name="ShowArticleCard">
  import { useRoute } from 'vue-router'
  import { computed, nextTick, ref } from 'vue'
  import emitter from '@/utils/emitter'
  import { useArticleStore } from '@/stores/article'
  import { handleBlogLike } from '@/api/article'
  import { useStorage } from '@vueuse/core'
  // pinia
  const articleStore = useArticleStore()
  const { article } = articleStore // article 数据
  // 路由
  const route = useRoute()
  // 数据
  const isLike = computed(()=>{  // 控制点赞样式的
    return article.isLike ? 'like' : 'unlike'
  })
  const isLogined = useStorage('isLogined')
  // 目录导航相关的
  const articleRef = ref('')
  nextTick(()=>{
    setTimeout(()=>{
      emitter.emit('getArticleRef', articleRef.value)
    }, 500)
  })
  // 方法
  function changeLike() {
    if (isLogined.value === 'true') {
      handleBlogLike(route.params.articleId).then(
        res => {
          if (res.code === 200) {
            articleStore.handleArticleLike()
          }
        },
        err => {
          throw err
        }
      )
    } else {
      ElMessage.error('请先登录！')
    }
  }
</script>

<style scoped>
  .title {
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
  }
  .aboutUser {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    margin: 30px 0;
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
  .like-col {
    display: flex;
    justify-content: flex-end;
  }
  .like-container {
    width: 65px;
    height: 104px;
    background: #FFFFFF;
    box-shadow: -2px -3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px 16px 0px 0px;
    transform: rotate(-90deg) translateY(-19px) translateX(-110px);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .3s linear;
  }
  .like-container img {
    transform: rotate(90deg);
    width: 50px;
    height: 52px;
  }
  .like {
    background-color: #F55E54;
  }
</style>
