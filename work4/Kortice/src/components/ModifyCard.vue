<template>
  <el-card>
    <div class="container">
      <div class="modify-container username">
        <span>用户名</span>
        <el-input :disabled="updateName" v-model="newName"></el-input>
        <img src="@/assets/pencil.svg" alt="pencil" @click="clickUpdateName" v-show="updateName">
        <el-button v-show="!updateName" @click="confirmName" type="danger">确认</el-button>
      </div>
      <div class="modify-container motto">
        <span>个性签名</span>
        <el-input :disabled="updateMotto" v-model="newMotto"></el-input>
        <img src="@/assets/pencil.svg" alt="pencil" @click="clickUpdateMotto" v-show="updateMotto">
        <el-button v-show="!updateMotto" @click="confirmMotto" type="danger">确认</el-button>
      </div>
      <div class="modify-container password">
        <span>密码</span>
        <el-input :disabled="updatePwd" :type="isPwd" v-model="newPwd"></el-input>
        <img src="@/assets/pencil.svg" alt="pencil" @click="clickUpdatePwd" v-show="updatePwd">
        <el-button v-show="!updatePwd" @click="confirmPwd" type="danger">确认</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup name="ModifyCard">
  import { ref } from 'vue'
  import { useUserStore } from '@/stores/user'
  import { useRouter } from 'vue-router'
  // 路由
  const router = useRouter()
  // pinia
  const userStore = useUserStore()
  const { user } = userStore // 用户相关的数据
  const { setUsername, setMotto, setPassword } = userStore // 用户相关的方法
  // 数据
  const newName = ref(user.username)
  const newMotto = ref(user.motto)
  const newPwd = ref(user.password)
  const updateName = ref(true)
  const updateMotto = ref(true)
  const updatePwd = ref(true)
  const isPwd = ref('password')
  // 方法
  function toHomePage() {
    router.replace({
      path: '/'
    })
  }
  function clickUpdateName() {
    updateName.value = false
  }
  function clickUpdateMotto() {
    updateMotto.value = false
  }
  function clickUpdatePwd() {
    updatePwd.value = false
    isPwd.value = 'text'
  }
  function confirmName() {
    updateName.value = true
    setUsername(newName.value)
    toHomePage()
  }
  function confirmMotto() {
    updateMotto.value = true
    setMotto(newMotto.value)
    toHomePage()
  }
  function confirmPwd() {
    updatePwd.value = true
    isPwd.value = 'password'
    setPassword(newPwd.value)
    toHomePage()
  }
</script>

<style scoped>
  .el-card {
    width: 80%;
    height: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .modify-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 2px solid rgba(120, 120, 120, 0.43);;
    position: relative;
  }
  .modify-container span {
    font-weight: 400;
    font-size: 36px;
    line-height: 48px;
  }
  .modify-container .el-input {
    width: 60%;
    border: none;
    font-weight: 290;
    font-size: 24px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 30%;
  }
  :deep(.el-input__wrapper) {
    box-shadow: none;
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    cursor: auto;
  }
  .modify-container img {
    cursor: pointer;
  }
</style>
