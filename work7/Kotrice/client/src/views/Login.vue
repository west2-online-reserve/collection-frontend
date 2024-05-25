<template>
  <div class="wrapper">
    <el-card>
      <template #header>
        <h1 class="title">Chat-Room</h1>
      </template>
      <div class="user-container">
        <el-form v-model="form">
          <el-form-item>
            <el-input v-model="form.username" size="large" placeholder="Please Input username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" round type="primary" @click="handleLogin(form.username)">Login</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { Login } from '@/api/login'
  import { onMounted, reactive } from 'vue';
  import { useAuthStore } from '@/stores/auth'
  import { useUserStore } from '@/stores/user'
  // 路由
  const router = useRouter()
  // pinia
  const authStore = useAuthStore()
  const userStore = useUserStore()
  // 生命周期钩子
  onMounted(() => {
    if (JSON.parse(localStorage.getItem('user') || '{"username": ""}').username !== '') {
      router.replace({
        path: '/chat-room'
      })
    }
  })
  // 数据
  const form = reactive({
    username: ''
  })
  //  函数
  function handleLogin(username: string) {
    if (username === '') {
      ElMessage({
        message: '请输入昵称！',
        type: 'error',
        grouping: true
      })
      return
    }
    //  发送登录请求
    Login({username}).then(data => {
      if (data.code === 200) {
        authStore.initToken(data.data!.token)
        userStore.initUsername(username)
        router.replace({
          path: '/chat-room'
        })
        ElMessage({
          message: data.msg,
          type: 'success',
          grouping: true
        })
      } else {
        ElMessage({
          message: data.msg,
          type: 'error',
          grouping: true
        })
      }
    })
  }
</script>

<style scoped>
  .wrapper {
    width: 50%;
    margin: 0 auto;
    margin-top: 25vh;
  }
  .el-card {
    width: 100%;
    height: 40vh;
  }
  .title {
    text-align: center;
  }
  :deep(.el-card__body) {
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .user-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
  .el-form-item {
    margin: 20% 0;
  }
</style>
