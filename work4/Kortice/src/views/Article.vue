<template>
  <div class="container">
    <Header/>
    <el-container>
      <el-main>
        <ShowArticleCard />
      </el-main>
      <el-aside>
        <div class="about-container">
          <div class="about-user">
            <AboutUserCard />
          </div>
        </div>
        <Catalog />
      </el-aside>
    </el-container>
    <Comment />
  </div>
</template>

<script setup name="Article">
  import Header from '@/components/Header.vue'
  import ShowArticleCard from '@/components/ShowArticleCard.vue'
  import AboutUserCard from '@/components/AboutUserCard.vue'
  import Comment from '@/components/Comment.vue'
  import Catalog from '@/components/Catalog.vue'
  import { onBeforeUnmount, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getBlog, getComment } from '@/api/article'
  import { useArticleStore } from '@/stores/article'
  import { useCommentStore } from '@/stores/comment'
  import { useScroll } from '@vueuse/core'
  // pinia
  const articleStore = useArticleStore()
  const commentStore = useCommentStore()
  // 路由
  const route = useRoute()
  // 生命周期钩子
  onMounted(()=>{
    const { y } = useScroll(window)
    // 获取文章内容
    getBlog(route.params.articleId).then(
      res => {
        if (res.code === 200) {
          articleStore.setArticle(res.data.blog)
          articleStore.setBlogsCount(res.data.count)
        } else {
          ElMessage.error(res.msg)
        }
      },
      err => {
        throw err
      }
    )
    // 获取评论
    getComment(route.params.articleId).then(
      res => {
        if (res.code === 200) {
          commentStore.setComments(res.data)
        } else {
          ElMessage.error(res.msg)
        }
        y.value = 0 //  返回页面顶部
      },
      err => {
        throw err
      }
    )
  })
  onBeforeUnmount(()=>{
    articleStore.clearArticle()
    commentStore.clearComments()
  })
</script>

<style scoped>
  .container {
    background: linear-gradient(#FFABA5, #FFE3E1);
  }
  .el-container {
    margin-top: 40px;
  }
  .el-aside {
    width: 30%;
    padding: 20px 0;
    position: relative;
  }
</style>
