<template>
    <el-container>
        <el-header>
            <el-input v-model="articleModel.title" maxlength="30" placeholder="请输入文章标题" show-word-limit type="text" style="width:810px;font-size: 20px;" size="large"></el-input>
            <el-button type="primary" style="margin-right: 10px;font-size: 20px;" size="large" @click="postArticle">发布</el-button>
        </el-header>
        <el-main>
            <v-md-editor v-model="articleModel.content" height="85vh"></v-md-editor>
        </el-main>
    </el-container>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token.ts'
const tokenStore = useTokenStore()
const articleModel = ref({
    title: '',
    content: '',
})
import { postArticleService } from '@/apis/article.js';
import router from '@/router';
import { ElMessage } from 'element-plus';
const postArticle = async() => {
    if(articleModel.value.title===''){
        ElMessage.error('请输入标题')
        return false;
    }else if(articleModel.value.content===''){
        ElMessage.error('请输入内容')
    }else{
        try{
        let result=await postArticleService(articleModel.value,tokenStore.token)
        if (result.code === 1) {
          ElMessage.success('发布成功')
          router.push('/menu')
      } else {
        return false;
      }
    }catch (error) {
        alert(err.message || "加载失败");
    }
    }
}
</script>

<style scoped>
.el-header {
    border: 1px solid #dddfe5;
    background-color: white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    --el-header-padding: 0 10px;
}

.el-main {
    border: 1px solid #dddfe5;
    padding: 0px
}
</style>