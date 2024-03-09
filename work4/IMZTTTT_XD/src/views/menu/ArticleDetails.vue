<template>
    <el-affix :offset="150">
        <el-button circle size="large" @click="likeArticle()" v-if="!isLike">
            <img src="../../assets/Union2.png" alt="">
        </el-button>
        <el-button circle size="large" @click="deleteLikeArticle()" v-if="isLike">
            <img src="../../assets/Union3.png" alt="">
        </el-button>
    </el-affix>
    <el-affix :offset="250">
        <el-button circle size="large" @click="scrollToComment">
            <img src="../../assets/Vector.png" alt="">
        </el-button>
    </el-affix>
    <div class="toc-panel">
        <div class="toc-container">
            <div class="toc-title">目录</div>
            <div class="toc-list">
                <template v-if="tocArrey.length == 0">
                    <div class="no-toc">未解析到目录</div>
                </template>
                <template v-else>
                    <div v-for="toc in tocArrey">
                        <span :class="['toc-item', toc.id == anchorId ? 'active' : '']"
                            :style="{ 'padding-left': toc.level * 10 + 'px' }" @click="gotoAnchor(toc.id)">{{ toc.title
                            }}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="articleInfo">
                    <div class="articleTitle">
                        <span>{{ articleDetail.title }}</span>
                    </div>
                    <div class="articledetail">
                        <span>{{ articleDetail.authorName }}</span>
                        <div>
                            {{ articleDetail.publishTime }}
                        </div>
                        <div>
                            <img src="../../assets/Polygon 5.png" alt="">
                            {{ articleDetail.views }}
                        </div>
                    </div>
                </div>
            </el-header>
            <el-main class="articlelist">
                <v-md-preview :text="articleDetail.content" id="detail"></v-md-preview>
            </el-main>
            <div class="comment" ref="commentSection">
                <Commentlist></Commentlist>
            </div>

        </el-container>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useTokenStore } from '@/stores/token.ts';
import { getArticleDetailService, likeArticleService, deletLikeArticleService } from '@/apis/article.js'
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import Commentlist from './Commentlist.vue';
const tokenStore = useTokenStore()
const loading = ref(false)
const route = useRoute()
const articleDetail = ref({})
const commentSection = ref(null);
const isLike = ref(false)
const likeArticle = async () => {
    try {
        let result = await likeArticleService(route.params.articleId, tokenStore.token)
        if (result.code === 1) {
            isLike.value=true
            ElMessage.success("点赞成功");
        } else {
            return false;
        }
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
const deleteLikeArticle = async () => {
    try {
        let result = await deletLikeArticleService(route.params.articleId, tokenStore.token)
        if (result.code === 1) {
            isLike.value=false
            ElMessage.success("取消点赞");
        } else {
            return false;
        }
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
const scrollToComment = () => {
    if (commentSection.value) {
        const top = commentSection.value.getBoundingClientRect().top + window.pageYOffset - 60; // 减去额外的距离
        window.scrollTo({
            top: top,
            behavior: "smooth"
        });
    }
};
const getArticle = async () => {
    try {
        loading.value = true
        let result = await getArticleDetailService(route.params.articleId,tokenStore.token)
        if (result.code === 1) {
            articleDetail.value = result.data
            isLike.value = result.data.like
        } else {
            return false;
        }
        loading.value = false
        makeToc()
    } catch (err) {
        alert(err.message || "加载失败");
    }

}
getArticle()


const tocArrey = ref([]);
const makeToc = () => {
    nextTick(() => {
        const tocTags = ["H1", "H2", "H3", "H4", "H5", "H6"]
        const contentDom = document.querySelector(".github-markdown-body");
        const childNodes = contentDom.childNodes;
        let index = 0;
        childNodes.forEach((item) => {
            let tagName = item.tagName;
            if (tagName == undefined || !tocTags.includes(tagName.toUpperCase())) {
                return true
            }
            index++
            let id = "toc" + index;
            item.setAttribute("id", id);
            tocArrey.value.push({
                title: item.innerText,
                id: id,
                level: Number.parseInt(tagName.substring(1)),
                offsetTop: item.offsetTop,
            });

        })
    })
}

const anchorId = ref(null)
const gotoAnchor = (domId) => {
    const dom = document.querySelector("#" + domId);
    if (dom) {
        const top = dom.getBoundingClientRect().top + window.pageYOffset - 80; // 减去额外的距离
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    }
};
const listenerScroll = () => {
    let currentScrollTop = getScrollTop() + 100;
    tocArrey.value.some((item, index) => {
        if (
            (index < tocArrey.value.length - 1 &&
                currentScrollTop >= tocArrey.value[index].offsetTop &&
                currentScrollTop < tocArrey.value[index + 1].offsetTop) ||
            (index == tocArrey.value.length - 1 &&
                currentScrollTop > tocArrey.value[index].offsetTop)) {
            anchorId.value = item.id
            return true;
        }
    })
}
const getScrollTop = () => {
    let scrollTop = document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
    return scrollTop;
}
onMounted(() => {
    window.addEventListener("scroll", listenerScroll, false)
})
onUnmounted(() => {
    window.removeEventListener("scroll", listenerScroll, false)
})
</script>

<style scoped>
.el-affix {
    display: flex;
    justify-content: flex-start;
    margin-left: 200px;
    height: 0px;

    .el-button {
        width: 50px;
        height: 50px;

        img {
            margin-left: 2px;
            width: 90%;
            height: 90%;
        }

    }


}

.common-layout {
    width: 850px;
    margin: 0px auto;
    margin-top: 40px;

    :deep(.el-header) {
        height: 150px;
        background-color: #fff;

        .articleTitle {
            padding-left: 30px;
            padding-top: 40px;
            font-size: 32px;
            font-weight: 700;
        }

        .articledetail {
            display: flex;
            justify-content: space-between;
            margin: 40px 30px;
            font-size: 16px;


            div {
                color: #A1A1A1;
            }
        }

    }

    .el-main {
        background-color: #fff;

    }

    .comment {
        margin: 50px 0;
        padding: 20px;
        background-color: #fff;
    }

    :deep(.github-markdown-body) {
        font-size: 20px;
        padding: 20px 30px;
    }
}

.el-icon-like {
    width: 50px;
    height: 50px;
}

.toc-panel {
    position: absolute;
    font-size: 16px;
    top: 100px;
    right: 60px;
    width: 285px;

    .toc-container {
        position: fixed;
        width: 285px;
        background-color: white;

        .toc-title {
            border-bottom: 2px solid #f4f5f5;
            padding: 10px;
        }

        .toc-list {
            max-height: calc(100vh - 200px);
            overflow: auto;
            padding: 10px;
        }

        .noc-toc {
            color: rgb(138, 138, 138);
            line-height: 40px;
        }

        .toc-item {
            cursor: pointer;
            display: block;
            line-height: 35px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgb(76, 76, 76);
            position: relative;
            /* 为伪元素定位做准备 */
            transition: background-color 0.3s ease;
            /* 过渡背景色，保持原有的过渡 */
        }

        .toc-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: transparent;
            transition: background-color 0.3s ease;
            /* 过渡背景色 */
        }

        .toc-item:hover::before{
            background-color: #599af47a;
        }
        .toc-item.active::before {
            background-color: #599af4;
            /* 激活状态下的背景色 */
        }

        .toc-item:hover{
            background-color: #fafafa;
        }
        .toc-item.active {
            background-color: #f8f8f8;
            /* 为鼠标悬停和激活状态添加背景色变化 */
        }

    }
}</style>