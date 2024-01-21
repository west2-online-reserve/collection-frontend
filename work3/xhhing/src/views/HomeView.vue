<template>

  <el-form  label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="width: 100%;">登录</el-button>
    </el-form-item>
  </el-form>
    <p style="text-align: right; width: 100%;">还没有注册账号？点此<RouterLink to="/about">注册</RouterLink></p>

  

</template>

<script  setup>

import {ref} from 'vue'
import userStore from '../stores/localStorage'

let name = ref("")
let password =ref("")

const onSubmit = () => {

  let user = userStore()

  if (user.length === 0)
  {
    alert("该用户不存在")
    console.log("aaaa")
  }
  else
  {
    console.log("bbbb")
    console.log(user.length)
    console.log(user.length.value)
    for (let i = 0; i<user.length; i++)
    {
      if (user.users[i].name === name && user.users[i].password === password)
      {
        console.log("登录成功")
      }
      else if (user.users[i].name != name)
      {
        alert("该用户不存在")
      }
      else (user.users[i].password != password)
      {
        alert("密码错误")
      }
    }
  }
  
}

</script>

