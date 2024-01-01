<template>
    test
    <el-button type="primary" @click="testButton">test </el-button>

</template>


<script setup lang="ts">

import {ElMessage} from 'element-plus'

function testButton() {
    ElMessage({
        message: 'error submit!',
        grouping: true,
        type: 'error',
        showClose: true,
        offset: 100,
        duration:1500,
    });
}    
</script>

<style scoped>

</style>