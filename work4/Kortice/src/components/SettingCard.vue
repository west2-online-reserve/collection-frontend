<template>
  <el-card>
    <div class="container">
      <div class="mask-container">
        <el-upload
          action="http://47.113.145.156:8081/user/uploadAvatar"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :headers="{
            Authorization: authStore.token
          }"
        >
          <div class="mask">
            <img src="@/assets/camera.svg" alt="camera">
            <span>修改我的头像</span>
          </div>
        </el-upload>
      </div>
      <el-avatar shape="square" :size="210" :src="user.avatarUrl" :icon="UserFilled" />
      <div class="user-info">
        <div class="username">{{ user.username }}</div>
        <div class="motto">{{ user.motto }}</div>
      </div>
    </div>
    <el-button @click="toUserPage">返回个人主页</el-button>
  </el-card>
</template>

<script setup name="UserCard">
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import { UserFilled } from '@element-plus/icons-vue'
  import { useAuthStore } from '@/stores/auth'
  // pinia
  const userStore = useUserStore()
  const { user } = userStore // 用户相关的数据
  const authStore = useAuthStore()
  // 路由
  const router = useRouter()
  // 方法
  function toUserPage() {
    router.push({
      path: '/user'
    })
  }
  function handleAvatarSuccess(response) {
    console.log(response)
    if (response.code === 200) {
      userStore.updateAvatar(response.data)
      ElMessage.success('修改成功！')
    } else {
      if (response.msg) {
        ElMessage.error(response.msg)
      } else {
        ElMessage.error(response.data)
      }
    }
  }
</script>

<style scoped>
  .el-card {
    width: 80%;
    height: 90%;
    margin: 0 auto;
    background-image: linear-gradient(to bottom, #F55E54, #FFE3E1 50%, transparent 50%);
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .container {
    position: relative;
  }
  .mask-container {
    position: absolute;
    margin-left: 40px;
  }
  .mask {
    width: 210px;
    height: 210px;
    background-color: rgba(81, 81, 81, 0.45);
    backdrop-filter: blur(2.05px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mask img {
    width: 78px;
    height: 78px;
  }
  .mask span {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #fff;
  }
  .el-avatar {
    margin-left: 40px;
  }
  .user-info {
    position: absolute;
    top: 50%;
    left: 260px;
    height: 105px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .username {
    font-weight: 400;
    font-size: 48px;
    line-height: 63px;
  }
  .motto {
    font-weight: 290;
    font-size: 24px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.6);
  }
  .about-user-container {
    position: absolute;
    top: 50%;
    height: 105px;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .article-container {
    left: 70%;
  }
  .subscribe-container {
    left: 80%;
  }
  .fans-container {
    left: 90%;
  }
  .title {
    font-weight: 400;
    font-size: 32px;
    line-height: 42px;
    color: #F55E54;
  }
  .count {
    font-weight: 290;
    font-size: 24px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.6);
  }
  .el-button {
    box-sizing: border-box;
    width: 175px;
    height: 48px;
    border: 3px solid #F55E54;
    border-radius: 16px;
    font-weight: 290;
    font-size: 20px;
    line-height: 27px;
    color: #F55E54;
    position: absolute;
    left: 85%;
    bottom: 2%;
    --el-button-hover-bg-color: #fef0f0;
    transition: all .3s linear;
  }
</style>
