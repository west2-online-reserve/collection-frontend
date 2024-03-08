<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
</script>

<template>
 <div class="container">
  <div class="label-box">用户名：</div>
  <el-input
    v-model="username"
    class="input-box"
    maxlength="20"
    placeholder="Please input"
    show-word-limit
    type="text"
  />
  <el-button type="primary" plain class="button1">确认修改用户名</el-button>
  <img src="../pictures/touxiang.png" class="avatar">
  <div  class="button2">
    <el-button type="primary" plain>上传头像</el-button>
    <h4>格式: 支持JPG、PNG、JPEG  大小: 5M以内</h4>
  </div>
  
</div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
}

.input-box {
  position: absolute;
  bottom: 480px;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  width: 400px;
}

.label-box {
  position: absolute;
  bottom: 550px;
}

.avatar {
  position: absolute;
  bottom: 150px;
}

.button2 {
  position: absolute;
  bottom: 0px;
  text-align: center;
}

.button1 {
  position: absolute;
  bottom: 400px;
  text-align: center;
}
</style>