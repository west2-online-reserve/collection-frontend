<template>
  <div class="left">
    <div class="register-form">
      <div class="welcome">Nice to meet you</div>
      <div class="info">Please enter your details</div>
      <div class="username">用户名</div>
      <input type="text" class="inputUsername" placeholder="用户名长度不小于6位" v-model="username">
      <span class="alert" v-show="isNameTrue">用户名格式无效</span>
      <!-- <div class="email">邮箱</div>
      <input type="email" class="inputEmail" placeholder="邮箱格式需正确" v-model="email">
      <span class="alert" v-show="isEmailTrue">邮箱格式无效</span> -->
      <div class="password">密码</div>
      <input type="password" class="inputPassword" placeholder="密码长度不小于8位，同时包含大小写" v-model="password">
      <span class="alert" v-show="isPwdTrue">密码格式无效</span>
      <button class="regBtn" @click="reg">注册</button>
      <div class="footer">已经注册账号？点击此<RouterLink to="/home/login" class="link">登录</RouterLink></div>
    </div>
  </div>
</template>

<script setup>
  name:'Register'

  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAccountsStore } from '../stores/accounts.js'
  // 数据
  const username = ref('')
  // const email = ref('')
  const password = ref('')
  // 判断输入的格式是否正确
  const isNameTrue = ref(false)
  // const isEmailTrue = ref(false)
  const isPwdTrue = ref(false)
  // 定义存在localStorage上的数据
  const accountsStore = useAccountsStore()
  // 路由器
  const router = useRouter()

  // 方法
  function reg() {
    // 如果输入的都符合要求
    if ((!isNameTrue.value && /* !isEmailTrue.value && */ !isPwdTrue.value) && (username.value !== '' && /* email.value !== '' && */ password.value !== '')) {
      // 创建一个新的账户对象
      const newAccount = {
        username:username['value'],
        // email:email['value'],
        password:password['value']
      }
      // 塞进accounts里边
      accountsStore.addAccount(newAccount)
      // 清空输入框
      username.value = ''
      // email.value = ''
      password.value = ''
      alert('注册成功！')
      // 注册成功跳转到登录页面并且无法后退到注册页面
      router.replace({
        path:'/home/login'
      })
    } else {
      alert('请检查输入的格式是否正确！')
    }
  }

  // 正则表达式
  const usernameReg = /\S{6,}/
  // const emailReg = /^[A-Za-z0-9]+([-._][A-Za-z0-9]+)*@[A-Za-z0-9]+(-[A-Za-z0-9]+)*(\.[A-Za-z]{2,6}|[A-Za-z]{2,4}\.[A-Za-z]{2,3})$/
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  // 监视注册数据的改变
  watch([username/* ,email */,password], ()=>{
    (username.value !== '') && (isNameTrue.value = !usernameReg.test(username.value));
    // (email.value !== '') && (isEmailTrue.value = !emailReg.test(email.value));
    (password.value !== '') && (isPwdTrue.value = !passwordReg.test(password.value));
  })
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
  .register-form {
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
  .left .email,
  .left .password {
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    color: #3D565A;
    margin-top: 20px;
    margin-bottom: 2px;
  }
  .left .inputUsername,
  .left .inputEmail,
  .left .inputPassword {
    width: 288px;
    height: 34px;
    border: 1px solid #426440;
    border-radius: 5px;
  }
  input::placeholder {
    color: #D2D2D2;
  }
  .inputPassword:focus,
  .inputUsername:focus {
    outline: none;
  }
  .left .regBtn {
    width: 288px;
    height: 34px;
    color: #FEFFFF;
    background-color: #456442;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    border: none;
    margin-top: 20px;
    cursor: pointer;
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
