<template>
  <el-menu
    mode="horizontal"
    background-color="#F55E54"
    text-color="#FFF"
    active-text-color="#F55E54"
    :router="true"
    :default-active="activeIndex"
  >
    <el-menu-item class="logo-box" @click="clickLogo">
      <img src="@/assets/logo.svg" alt="logo" class="logo">
      Article House
    </el-menu-item>
    <el-menu-item class="nav-box" index="/home">首页</el-menu-item>
    <el-menu-item class="nav-box" index="/editor" :disabled="!isLogined">创作</el-menu-item>
    <div class="flex-grow1" />
    <el-input
      placeholder="搜索感兴趣的文章"
      class="search-input"
      v-model="searchInfo"
    >
      <template #prefix>
        <img src="@/assets/search.svg" alt="search" class="search-icon">
      </template>
    </el-input>
    <div class="flex-grow2" />
    <el-menu-item class="nav-box" @click="clickToLogin" v-if="!isLogined">登录</el-menu-item>
    <el-menu-item class="nav-box" @click="clickToExit"  v-if="isLogined">退出</el-menu-item>
    <el-popover
      trigger="click"
      :show-arrow="false"
      popper-style="
      background-color: #FFABA5;
      width: 208px;
      height: 202px;
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      color: #FFF;
      line-height: 32px;
      padding: 10px 30px;
      border: none;
      display: flex;
      flex-direction: column; 
      justify-content: space-evenly;"
    >
      <template #reference>
        <el-avatar class="avatar" shape="square" :size="60" :src="user.avatarUrl" :icon="UserFilled" />
      </template>
        <div class="info-outer">
          <div>关注</div>
          <div>{{ user.follow }}</div>
        </div>
        <div class="info-outer">
          <div>粉丝</div>
          <div>{{ user.fans }}</div>
        </div>
        <div class="info-outer" @click="toUserPage">
          <div>我的主页</div>
          <img src="@/assets/door.svg" alt="door">
        </div>
    </el-popover>
  </el-menu>
  <el-dialog
    v-model="dialogFormVisible"
    center
    style="border-radius: 12px;"
    :show-close="false"
  >
    <!-- dialog头部 -->
    <template #header="{ titleId }">
        <h4 :id="titleId" class="dialog-title">Welcome</h4>
    </template>
    <div class="dialog-main-container">
      <div class="dialog-nav-container">
        <el-radio-group v-model="radio" size="large">
          <el-radio-button label="Login" />
          <el-radio-button label="Register" />
        </el-radio-group>
      </div>
      <el-form class="form" :model="form">
        <el-form-item label="username">
          <el-input v-model="form.username" size="large"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="form.password" size="large" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm">Enjoy now!</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup name="Header">
  import { useRoute, useRouter } from 'vue-router'
  import { computed, reactive, ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useAuthStore } from '@/stores/auth'
  import { userReg, userLogin } from '@/api/user'
  import { useStorage } from '@vueuse/core'
  import { UserFilled } from '@element-plus/icons-vue'
  // 路由
  const route = useRoute()
  const router = useRouter()
  // pinia
  const userStore = useUserStore()
  const { user } = userStore // 用户的数据
  const authStore = useAuthStore()
  // 数据
  const searchInfo = ref('') // 搜索框里面的数据
  const activeIndex = computed(()=>{
    return (`/${route.path.split('/')[1]}` === '/article' || `/${route.path.split('/')[1]}` === '/user' || `/${route.path.split('/')[1]}` === '/setting') ? '/home' : `/${route.path.split('/')[1]}`
  })  // 计算激活的index(利用计算属性)
  const isLogined = useStorage('isLogined', false) // 弄一个响应式的storage给isLogined，防止刷新又要登录
  const dialogFormVisible = ref(!isLogined.value)
  const radio = ref('Login')
  const form = reactive({ //  表单数据
    username: '',
    password: ''
  })
  // 方法
  function clickLogo() {
    router.push({
      path: '/'
    })
  }
  function toUserPage() {
    if (!isLogined.value) {
      ElMessage.error('您还未登录，请先登录！')
      dialogFormVisible.value = true
    } else {
      router.push({
        path: '/user/edited'
      })
    }
  }
  function clickToLogin() {
    dialogFormVisible.value = true
  }
  function clickToExit() {
    isLogined.value = false
    userStore.clearUserInfo()
    authStore.clearAuthToken()
    ElMessage.success("退出成功！")
    if (route.path.split('/')[1] === 'user' || route.path.split('/')[1] === 'setting' || route.path.split('/')[1] === 'editor') {
      router.replace({
        path: '/'
      })
    }
  }
  function submitForm() {
    // 打包一下表单数据
    const data = {
      username: form.username,
      password: form.password
    }
    // 注册
    if (radio.value === 'Login') {
      // 发请求
      userLogin(data).then(
        res => {
          if (res.code === 200) {
            // 设置token
            authStore.setAuthToken(res.data.token)
            isLogined.value = true
            dialogFormVisible.value = false
            ElMessage.success(res.msg)
            // 更新用户数据
            userStore.setUserInfo(data.password)
            // 刷新页面
            // location.reload()
          } else {
            ElMessage.error(res.msg)
          }
        },
        err => {
          ElMessage.error('登录失败！')
        }
      )
    }
    if (radio.value === 'Register') {
      // 发请求
      userReg(data).then(
        res => {
          if (res.code === 200) {
            radio.value = 'Login'
            ElMessage.success(res.msg)
          } else {
            ElMessage.error(res.msg) 
          }
        },
        err => {
          ElMessage.error('注册失败！')
        }
      )
    }
    form.username = ''
    form.password = ''
  }
</script>

<style scoped>
  .el-menu {
    height: 80px;
    align-items: center;
    border-bottom: none;
  }
  .el-menu--horizontal>.el-menu-item {
    border-bottom: none;
    padding: 0px !important;
  }
  .el-menu-item.is-active {
    background-color: #FFF !important;
    border-bottom: none !important;
  }
  .logo {
    width: 72px;
    height: 77px;
  }
  .logo-box {
    width: 358px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    --el-menu-hover-bg-color: transparent !important;
  }
  .nav-box {
    width: 150px;
    height: 80px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    margin-right: 10px;
  }
  .search-icon {
    width: 32px;
    height: 32px;
  }
  .search-input {
    width: 400px;
    height: 50px;
    font-style: normal;
    font-weight: 290;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
  }
  .avatar {
    cursor: pointer;
  }
  /* .info {
    display: flex;
    flex-direction: column;
  } */
  .info-outer {
    display: flex;
    justify-content: space-between;
  }
  .info-outer:last-child {
    cursor: pointer;
  }
  .flex-grow1 {
    flex-grow: 0.3;
  }
  .flex-grow2 {
    flex-grow: 0.5;
  }
  .dialog-title {
    font-weight: 700;
    font-size: 64px;
    line-height: 84px;
    color: #F55E54;
  }
  .dialog-main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .dialog-nav-container {
    display: flex;
    justify-content: center;
  }
  .el-radio-button {
    --el-radio-button-checked-bg-color: #f55e54;
    --el-radio-button-checked-border-color: #f55e54;
  }
  :deep(.el-radio-button__inner) {
    background-color: rgba(245, 94, 84, 0.3);
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #FFFFFF;
    border: none;
    width: 150px;
  }
  :deep(.el-radio-button:first-child .el-radio-button__inner) {
    border-radius: 8px 0px 0px 8px;
  }
  :deep(.el-radio-button:last-child .el-radio-button__inner) {
    border-radius: 0px 8px 8px 0px;
  }
  
  .el-radio-button.is-active :deep(.el-radio-button__inner) {
    background-color: #F55E54;
  }
  .form {
    width: 600px;
    margin-top: 40px;
  }
  .el-input {
    --el-input-focus-border-color: #F55E54;
  }
  :deep(.el-form-item__label) {
    width: 80px;
    font-size: 20px;
  }
  .el-form-item {
    align-content: center;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
    margin-bottom: 20px;
  }
  .el-button {
    border-radius: 8px;
    width: 200px;
    height: 50px;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
</style>
