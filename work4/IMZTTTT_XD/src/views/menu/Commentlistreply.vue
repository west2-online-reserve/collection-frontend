<template>
    <div class="reply-item">
        <div class="reply-avatar">
            <Avatar :size="50" :userId="data.authorId"></Avatar>
        </div>
        <div class="reply-info">
            <div class="reply-author">
                {{ data.authorName }}
                <span>{{ data.publishTime }}</span>
            </div>
            <div class="reply-content">
                {{ data.content }}
            </div>
        </div>
        <div class="iconfont">
            <img src="../../assets/Union3.png" alt="" v-show="isLike">
            <img src="../../assets/Union2.png" alt="" v-show="!isLike">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Avatar from '../../components/Avatar.vue';
const isLike = ref(false)
const props = defineProps({
    data: {
        type: Object,
    }
})

</script>

<style scoped>
.reply-item {
    display: flex;
    padding: 10px 0;
    padding-left: 90px;

    .reply-avatar {
        padding: 0 20px 0 30px
    }

    .reply-info {
        width: 520px;

        .reply-author {
            font-size: 18px;
            margin: 0 0 10px 0;

            span {
                margin-left: 50px;
                color: #4A4A4A;
                font-size: 14px;

            }
        }

        .reply-content {
            font-size: 16px;
            line-height: 1.8;
            color: #4A4A4A;
        }

    }

    .iconfont {
        display: flex;
        align-items: center;

        img {
            width: 20px;
            height: 17px;
            margin-left: 20px;
        }
    }


}
</style>