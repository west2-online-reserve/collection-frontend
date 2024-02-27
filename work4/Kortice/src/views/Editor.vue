<template>
  <div class="container">
    <Header/>
    <div class="editor-container">
      <el-input v-model="title" placeholder="输入文章标题..." clearable size="large" />
      <v-md-editor
        placeholder="编辑文章内容..."
        v-model="content"
        height="75vh"
      />
      <div class="editor-footer">
        <div class="author">{{ user.username }}</div>
        <el-divider direction="vertical" />
        <EditTime />
        <el-button type="danger" @click="publishBlog">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script setup name="Editor">
  import Header from '@/components/Header.vue'
  import EditTime from '@/components/EditTime.vue'
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { publishBlogs } from '@/api/article'
  // pinia
  const userStore = useUserStore()
  const { user } = userStore
  // 数据
  const title = ref('')
  const content = ref('')
  // 方法
  function publishBlog() {
    const createTime = getTime()
    const data = {
      title: title.value,
      content: content.value,
      createTime
    }
    publishBlogs(data).then(
      res => {
        if (res.code === 200) {
          ElMessage.success('发表成功！')
          title.value = ''
          content.value = ''
          userStore.addBlogCount()
        } else {
          ElMessage.error(res.msg)
        }
      },
      err => {
        throw err
      }
    )
  }
  function getTime() {
    // 获取时间
    let time = new Date()
    // 更改时间的格式为 year.month.day hour:minute:second
    time = time.toLocaleString('zh-CN') // year/month/day hour:minute:second
    time = time.replace(/\/+/g, '.')  // 通过 正则表达式 与 replace 方法配合将 '/' 全替换成 '.'
    return time
  }
</script>

<style scoped>
  .container {
    height: 100vh;
    background-color: #fff8f8;
  }
  .editor-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-input {
    width: 90vw;
    --el-input-border-color: transparent;
    --el-input-focus-border-color: transparent;
    --el-input-hover-border-color: transparent;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    margin: 20px 0;
    font-size: 20px;
  }
  .v-md-editor {
    width: 90vw;
  }
  .editor-footer {
    width: 90vw;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #000;
  }
  .el-divider--vertical {
    border-left: 1.8px solid black;
  }
  .el-button {
    width: 100px;
    height: 45px;
    margin-left: 30px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
</style>
