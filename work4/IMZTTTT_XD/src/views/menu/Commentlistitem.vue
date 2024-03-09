<template>
    <div class="comment-item">
        <div class="comment-avatar">
            <Avatar :size="70" :userId="data.authorId"></Avatar>
        </div>
        <div class="comment-info">
            <div class="comment-author">
                {{ data.authorName }}
            </div>
            <div class="comment-content">
                {{ data.content }}
            </div>
            <div class="iconfont">
                <span>{{ data.publishTime }}</span>
                <img src="../../assets/Union3.png"  alt="" v-show="isLike">
                <img src="../../assets/Union2.png" class="untriggered" alt="" v-show="!isLike">
                <img src="../../assets/Vector.png" class="untriggered" alt="" v-show="!isComment" @click="isComment=!isComment">
                <img src="../../assets/Vector2.png" alt="" v-show="isComment" @click="isComment=!isComment">
            </div>
            <div class="reply" v-show="isComment">
                <el-input v-model="reply" :autosize="{ minRows: 4 }" type="textarea" placeholder="和平发言" maxlength="100" show-word-limit/>
                <div class="button">
                    <el-button type="primary" @click="postReply()" style="margin-right: 0;">回复</el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="replyList">
        <div v-for="item in replyList">
            <Commentlistreply :data="item"></Commentlistreply>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import Commentlistreply from './Commentlistreply.vue';
import { postReplyCommentService,getReplyCommentService } from '@/apis/comment.js'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()
const route = useRoute()
const isLike = ref(false)
const isComment = ref(false)
const reply = ref('')
const replyList = ref([])
const props = defineProps({
    data: {
        type: Object,
    }
})
const postReply = async () => {
    try {
        if(reply.value==''){
            ElMessage.error('请输入评论内容')
            return false
        }
        let result = await postReplyCommentService(props.data.id,route.params.articleId, reply.value, tokenStore.token)
        if (result.code === 1) {
            ElMessage.success('评论成功')
            reply.value = ''
            isComment.value=false
            loadReplyComment()
        } else {
            return false;
        }
    } catch (err) {
        console.log(err)
    }
}
const loadReplyComment = async () => {
    try {
        let result = await getReplyCommentService(props.data.id)
        replyList.value = result
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
loadReplyComment()
</script>

<style scoped>
.comment-item {
    display: flex;
    padding: 10px 0;

    .comment-avatar {
        padding: 0 20px 0 30px
    }

    .comment-info {
        width: 650px;

        .comment-author {
            font-size: 22px;
            margin: 0 0 10px 0;
        }

        .comment-content {
            font-size: 16px;
            line-height: 1.8;
            color: #4A4A4A;
        }

        .iconfont {
            margin: 10px 0;
            font-size: 14px;
            color: #4A4A4A;
            display: flex;
            align-items: center;

            img {
                width: 20px;
                height: 17px;
                margin-left: 40px;
                cursor: pointer;
            }

            .untriggered:hover {
                filter: hue-rotate(180deg) brightness(0.5) saturate(2);
                cursor: pointer;
            }
        }

        .reply {
            margin-top: 20px;
            :deep(.el-textarea__inner) {
                font-size: 16px;
                background-color: #E7E7E7;
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
        }
    }

}


</style>