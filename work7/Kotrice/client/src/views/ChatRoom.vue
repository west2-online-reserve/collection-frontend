<template>
  <div>
    <el-page-header @back="handleLogout(userStore.username)">
      <template #title>
        Logout
      </template>
      <template #content>
        {{ userStore.username }}
      </template>
      <template />
    </el-page-header>
    <div class="main">
      <el-card>
        <template #header>
          <h2 class="title">Chat-Room</h2>
        </template>
            <el-scrollbar height="70vh" ref="scrollbarRef">
              <ul ref="wrapper">
                <!-- <li class="msg msg-other">
                  <el-avatar shape="square">
                    User
                  </el-avatar>
                  <div class="wrapper">
                    <span class="username-other">User</span>
                    <el-card>这是一段没有意义的文字.</el-card>
                  </div>
                </li>
                <li class="msg msg-me">
                  <el-avatar shape="square">
                    Me
                  </el-avatar>
                  <div class="wrapper">
                    <span class="username-me">Me</span>
                    <el-card>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsum consectetur molestias deserunt ipsam debitis laborum. Eligendi fuga distinctio magnam natus cum temporibus adipisci voluptatum, quasi aperiam a incidunt illo.</el-card>
                  </div>
                </li> -->
                <li
                  class="msg"
                  v-for="m in msgStore.msgs"
                  :key="m._id"
                  :class="m.username === userStore.username ? 'msg-me' : 'msg-other' "
                >
                  <el-avatar shape="square">
                    头像
                  </el-avatar>
                  <div class="wrapper">
                    <span
                      :class="m.username === userStore.username ? 'username-me' : 'username-other'"
                    >
                      {{ m.username }}
                    </span>
                    <el-card>{{ m.msg }}</el-card>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
      </el-card>
      <el-input size="large" v-model="chatMsg" @keyup.enter="sendMsg()">
        <template #append>
          <el-button @click="sendMsg()">
            Send
          </el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { useAuthStore } from '@/stores/auth'
  import { useMsgStore } from '@/stores/msg'
  import { Logout } from '@/api/logout'
  import { useRouter } from 'vue-router'
  import { socket } from '@/socket'
  import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
  import type { ElScrollbar } from 'element-plus'
  // 生命周期钩子
  onMounted(() => {
    const username = JSON.parse(localStorage.getItem('user') || '{"username": ""}').username
    if (username === '') {
      router.replace({
        path: '/'
      })
    }
    socket.connect()
    msgStore.bindEvents()
    scrollbarRef.value?.setScrollTop(wrapper.value?.clientHeight as number)
  })
  onUnmounted(() => {
    socket.off()  //  解绑事件，避免重复触发
    socket.disconnect()
  })
  // pinia
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const msgStore = useMsgStore()
  // 路由
  const router = useRouter()
  // 数据
  const chatMsg = ref('')
  const wrapper = ref<HTMLUListElement>()
  const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
  // 函数
  function handleLogout(username: string) {
    Logout({username})
    .then(data => {
      if (data.code === 200) {
        userStore.deleteUser()
        authStore.deleteToken()
        router.replace({
          path: '/'
        })
        ElNotification({
          title: data.msg,
          type: 'success',
        })
      } else {
        ElNotification({
          title: data.msg,
          type: 'error',
        })
      }
    })
    .catch(err => {
      ElNotification({
        title: '登出错误！请重试！',
        type: 'error',
      })
    })
  }
  function sendMsg() {
    const data = {
      username: userStore.username,
      createTime: Date.now(),
      msg: chatMsg.value
    }
    socket.emit('send msg', data)
    chatMsg.value = ''
  }
  // watch
  watch(msgStore.msgs, async () => {
    await nextTick()
    scrollbarRef.value?.setScrollTop(wrapper.value?.clientHeight as number)
  })
</script>

<style scoped>
  .main {
    width: 90vw;
    height: 93vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .el-card {
    width: 100%;
    height: 90%;
  }
  .main :deep(.el-card__body) {
    padding: 0;
  }
  .title {
    text-align: center;
    user-select: none;
  }
  :deep(.el-card__header) {
    padding: 0;
  }
  ul {
    padding: 0;
  }
  .msg {
    margin: 0 15px;
    margin-bottom: 35px;
    display: flex;
  }
  .msg-me {
    justify-content: end;
    flex-direction: row-reverse;
  }
  .wrapper {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
  }
  .el-avatar {
    flex-shrink: 0;
  }
  .username-me {
    text-align: end;
  }
  .wrapper :deep(.el-card__body) {
    padding: 5px;
    white-space: normal;
  }
</style>
