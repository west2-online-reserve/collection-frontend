<!-- TestView.vue -->
<template>
  <el-row>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </el-row>
</template>
    
<script setup lang="ts" name="TestView"> 
  import {Check, Delete, Edit, Message, Search, Star, } from '@element-plus/icons-vue'

</script>
    
<style scoped>
    
</style>
    