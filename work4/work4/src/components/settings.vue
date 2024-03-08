<script setup lang="ts">
import { ref } from 'vue'
const password = ref('')
</script>

<template>
<div class="container">
<div class="label-box">请输入新的密码：</div>
<el-input
  v-model="password"
  class="input-box"
  maxlength="20"
  placeholder="Please input"
  show-word-limit
  type="text"
/>
<el-button type="primary" plain class="button">确认修改用户名</el-button>
</div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
}

.input-box {
  position: absolute;
  bottom: 450px;
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

.button {
  position: absolute;
  bottom: 300px;
  text-align: center;
}
</style>