<template>

  <el-form  label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
    <p style="text-align: right; width: 100%;">还没有注册账号？点此<RouterLink to="/about">注册</RouterLink></p>

  

</template>

<script  setup>

import {ref} from 'vue'
import useUserStore from '../stores/userStore'
import { RouterLink, useRouter} from 'vue-router'

let router = useRouter()

let name = ref("")
let password =ref("")

const onSubmit = () => {

  let user = useUserStore()

  if (user.length === 0)
  {
    alert("该用户不存在")
  }
  else
  {
    let flag = false
    for (let i = 0; i<user.length; i++)
    {
      if (user.users[i].name == name.value)
      {
        if (user.users[i].password === password.value)
        {
          console.log("登录成功")
          user.update(i);
          router.push({name:"todolist"})
        }
        else if(user.users[i].password != password.value)
        {
          alert("密码错误")
        }
        flag = true
        break
      }
    }
    if (flag != true)
    {
      alert("该用户不存在")
    }
    flag = false
  }
  
}

</script>

<style>

a{
  margin:0;
  padding:0;
  background:none;
  width: 100%;
}

</style>