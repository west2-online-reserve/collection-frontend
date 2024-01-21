<template>

  <el-form  label-width="120px">
    <el-form-item label="用户名">
      <el-input type="text" v-model="name" @focus="hidTip" placeholder="用户名长度不小于6位" />
    </el-form-item>
    <!-- <p class="tip" :hidden="noterror1">用户名格式不正确</p> -->
    <el-form-item label="邮箱">
      <el-input v-model="email" @focus="hidTip" placeholder="邮箱格式正确"/>
    </el-form-item>
    <!-- <p class="tip" :hidden="noterror2">邮箱格式不正确</p> -->
    <el-form-item label="密码">
      <el-input type="password" v-model="password" @focus="hidTip" placeholder="密码长度不小于8位，同时包含大小写字母"/>
    </el-form-item>
    <!-- <p class="tip" :hidden="noterror3">密码格式不正确</p> -->

    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="width: 100%;">注册</el-button>
    </el-form-item>
  </el-form>
  <p style="text-align: right; width: 100%;">已经注册账号？点此<RouterLink to="/home" style="width: 50px;">登录</RouterLink></p>
  

</template>

<script  setup>

import { ref } from 'vue'
import userStore from '../stores/localStorage'

let name = ref("")
let email = ref("")
let password =ref("")

// let noterror1 = true   
// let noterror2 = true    
// let noterror3 = true    

let x1 = /^.{6,}$/
let x2 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/
let x3 = /(?=.*[A-Z])(?=.*[a-z]){8,}/

function hidTip()
{
  // noterror1 = true    
  // noterror2 = true    
  // noterror3 = true 
}

const onSubmit = () => {

  let user = userStore()
  let flag1 = x1.test(name.value)
  let flag2 = x2.test(email.value)
  let flag3 = x3.test(password.value)

  if (flag1 && flag2 && flag3)
  {
    user.add(name, email, password)
  }
  else
  {
    if (!flag1)
    {
      // noterror1 = false
      alert("用户名格式不正确")
    }
    if (!flag2)
    {
      // noterror2 = false
      alert("邮件格式不正确")
    }
    if (!flag3)
    {
      // noterror3 = false
      alert("密码格式不正确")
    }
  }
  
}

</script>

<style>

.el-form-item{
  margin-top: 28px;
  margin-bottom: 0px;
}

/* .tip{
  width: 100%;
  color: red;
  font-size: 10px;
  text-align: right;
} */

input::-webkit-input-placeholder
{
  font-size: 8px;
}

</style>
