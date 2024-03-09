<template>
    <div>
        <div class="user">
            <div class="userAvatar">
                <Avatar :size="70" :userId="userStore.user.userId"></Avatar>
            </div>
            <el-input v-model="comment" :autosize="{ minRows: 4 }" type="textarea" placeholder="和平发言" maxlength="100" show-word-limit/>
        </div>
        <div class="button">
            <el-button type="primary" @click="postMainComment()">评价</el-button>
        </div>
        <div class="comment">
            <div v-for="item in articleMainComment">
                <Commentlistitem :data="item"></Commentlistitem>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const comment = ref('')
import { useUserStore } from '@/stores/user.js'
import { useTokenStore } from '@/stores/token.js'
import { useRoute } from 'vue-router';
import Avatar from '@/components/Avatar.vue';
import Commentlistitem from './Commentlistitem.vue'
const tokenStore = useTokenStore()
const userStore = useUserStore()
const route = useRoute()
const articleMainComment = ref([])
import { postMainCommentService, getMainCommentService } from '@/apis/comment.js'
import { ElMessage } from 'element-plus';
const postMainComment = async () => {
    try {
        if(comment.value === ''){
            ElMessage.error('评论不能为空')
            return false;
        }
        let result = await postMainCommentService(route.params.articleId, comment.value, tokenStore.token)
        if (result.code === 1) {
            ElMessage.success('评论成功')
            loadMainComment()
            comment.value = ''
        } else {
            return false;
        }
    } catch (err) {
        console.log(err)
    }
}
const loadMainComment = async () => {
    try {
        let result = await getMainCommentService(route.params.articleId)
        articleMainComment.value = result
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
loadMainComment()

</script>

<style scoped>
.user {
    padding: 30px 0 0;
    display: flex;
    align-items: center;

    .userAvatar {
        padding: 0 20px 0 30px
    }
    .el-textarea{
        width: 650px;
    }

    :deep(.el-textarea__inner) {
        width: 650px;
        font-size: 18px;
        background-color: #E7E7E7;
    }

}

.button {
    display: flex;
    justify-content: flex-end;
    

    .el-button {
        margin-top: 10px;
        margin-right: 40px;
        height: 30px;
        width: 80px;
        font-size: 20px;
    }
}

:deep(.el-textarea .el-input__count){
    background: #ffffff00;
}

</style>