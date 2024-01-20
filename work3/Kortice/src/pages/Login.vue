<template>
  <div class="left">
    <div class="login-form">
      <div class="welcome">Welcome back</div>
      <div class="info">Please enter your details</div>
      <div class="username">用户名</div>
      <input type="text" class="inputUsername" v-model="username">
      <span class="alert" v-show="isTrue">用户名或密码错误</span>
      <div class="password">密码</div>
      <input type="password" class="inputPassword" v-model="password">
      <span class="alert" v-show="isTrue">用户名或密码错误</span>
      <div class="othOpt">
        <div>
          <input type="checkbox">
          <span>30天内免登录</span>
        </div>
        <a href="#">忘记密码</a>
      </div>
      <button class="loginBtn" @click="login">登录</button>
      <div class="footer">还没有账号？点此<RouterLink to="/home/register" class="link">注册</RouterLink></div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { useAccountsStore } from '../stores/accounts.js'
  export default {
    name:'Login',
    setup(){
      // 数据
      let username = ref('')
      let password = ref('')
      let accounts = JSON.parse(localStorage.getItem('accounts'))
      let isTrue = ref(false)
      // 路由器
      const router = useRouter()
      // accountsStore
      const accountsStore = useAccountsStore()

      // 方法
      function login() {
        accounts.accounts.forEach( account => {
          // 判断是否有匹配的account信息
          if (account.username === username.value && account.password === password.value) {
            isTrue.value = false
            alert(`登录成功！欢迎 ${username.value} 回来！`)
            // 打包account信息
            const loginAccount = {
              username:account.username,
              email:account.email,
              password:account.password
            }
            localStorage.setItem('loginAccount', JSON.stringify(loginAccount))
            router.replace({
              path:'/todolist'
            })
          } else {
            isTrue.value = true
          }
        });
      }

      // 返回相关的数据
      return {
        username,
        password,
        isTrue,
        login
      }
    }
  }
</script>

<style scoped>
  
  a {
    text-decoration-line: none;
    color: #3D565A;
  }
  .left {
    width: 557px;
    background-color: #FAFCF9;
  }
  .login-form {
    width: 300px;
    margin: 0 auto;
    margin-top: 163px;
  }
  .left .welcome {
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    color: #426440;
    text-align: center;
  }
  .left .info {
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    color: #3D565A;
    text-align: center;
    margin-top: 10px;
  }
  .left .username,
  .left .password {
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    color: #3D565A;
    margin-top: 20px;
    margin-bottom: 2px;
  }
  .left .inputUsername,
  .left .inputPassword {
    width: 288px;
    height: 34px;
    border: 1px solid #426440;
    border-radius: 5px;
  }
  .inputPassword:focus,
  .inputUsername:focus {
    outline: none;
  }
  .left .othOpt{
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    color: #3D565A;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left .loginBtn {
    width: 288px;
    height: 34px;
    color: #FEFFFF;
    background-color: #456442;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    border: none;
  }
  .loginBtn:hover {
    cursor: pointer;
  }
  .left .footer {
    font-size: 13px;
    line-height: 16px;
    color: #3D565A;
    text-align: center;
    margin-top: 20px;
  }
  .link {
    font-weight: 700;
  }
  .alert {
    width: 288px;
    font-size: 10px;
    font-weight: bold;
    line-height: 12px;
    letter-spacing: 0em;
    color: #EB1B41;
    display: block;
    text-align: end;
  }
</style>
