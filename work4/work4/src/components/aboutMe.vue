<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
</script>

<template>
  
  <el-input
    v-model="username"
    style="width: 400px"
    maxlength="10"
    placeholder="Please input"
    show-word-limit
    type="text"
  />
</template>

<style scoped>

</style>