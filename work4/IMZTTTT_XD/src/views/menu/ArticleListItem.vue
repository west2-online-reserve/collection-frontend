<template>
    <div class="article-item" @click="router.push(`/post/${data.id}`), click(data.id)">
        <div class="article-info">
            <router-link :to="{ path: `/post/${data.id}` }" @click="click(data.id)" class="article-title">
                {{ data.title }}
            </router-link>
            <span class="article-time">
                {{ data.publishTime }}
            </span>
        </div>
        <div class="article-details">
            <span class="article-author">
                {{ data.authorName }}
            </span>
            <div class="iconfont">
                <img src="../../assets/Polygon 5.png" alt="">
                {{ data.views === 0 ? "阅读" : data.views }}
                <div class="untriggered" v-show="!isLike"  @click.stop="likeArticle(data.id)" >
                    <img src="../../assets/Union.png" alt="">
                    {{ data.favoriteNumber === 0 ? "喜欢" : data.favoriteNumber }}
                </div>
                <div class="triggered" v-show="isLike"  @click.stop="deleteLikeArticle(data.id)" >
                    <img src="../../assets/Union0.png" alt="">
                    {{ data.favoriteNumber === 0 ? "喜欢" : data.favoriteNumber }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    data: {
        type: Object,
    },
    loading: {
        type: Boolean,
    }
})
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token.ts';
import { clickArticleService, likeArticleService, deletLikeArticleService } from '@/apis/article.js'
import { ElMessage } from 'element-plus';
const tokenStore = useTokenStore()
const isLike = ref(props.data.like)
const click = async (id) => {
    try {
        let result = await clickArticleService(id, tokenStore.token)
        if (result.code === 1) {
            return true
        } else {
            return false;
        }
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
const likeArticle = async (id) => {
    try {
        let result = await likeArticleService(id, tokenStore.token)
        if (result.code === 1) {
            ElMessage.success("点赞成功");
            isLike.value=result.data.like
            props.data.favoriteNumber=result.data.likeNumber
        } else {
            return false;
        }
    } catch (err) {
        alert("不好意思已经点过赞喽");
    }
}
const deleteLikeArticle = async (id) => {
    try {
        let result = await deletLikeArticleService(id, tokenStore.token)
        if (result.code === 1) {
            ElMessage.success("取消点赞");
            props.data.favoriteNumber=result.data.likeNumber
            isLike.value=result.data.like            
        } else {
            return false;
        }
    } catch (err) {
        alert("不好意思已经点过赞喽");
    }
}
</script>

<style scoped>
.article-item {
    border-bottom: 1px solid #dddfe5;
    height: 82px;
    cursor: pointer;
    background-color: white;

    .article-info {
        display: flex;
        justify-content: space-between;

        .article-title {
            font-size: 20px;
            padding: 18px 0 0 28px
        }

        .article-time {
            font-size: 14px;
            padding: 20px 34px 0 0
        }
    }

    .article-details {
        display: flex;
        justify-content: space-between;
        padding-top: 8px;

        .article-author {
            font-size: 12px;
            padding-left: 28px;
        }

        .iconfont {
            color: #A1A1A1;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;
            padding-right: 34px;
            line-height: 10px;

            img {
                height: 10px;
                margin: 0px 10px;
            }

            .untriggered:hover {
                filter: hue-rotate(180deg) brightness(0.5) saturate(2);
            }


        }

    }


}

.article-item:hover {
    background: #f7f8fa;
}

a:-webkit-any-link {
    text-decoration: none;
    color: black;
    font-weight: 500;
}
</style>