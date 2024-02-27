<template>
  <div class="comment-container" :data-v-md-line="lineIndex" ref="commentRef">
    <el-row justify="center" >
      <el-col :span="3" />
      <el-col :span="18">
        <el-card class="comment-total">
          <span>评论</span>
          <span>共{{ comments.length }}评论</span>
        </el-card>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="3" />
      <el-col :span="18">
        <el-input
          type="textarea"
          :placeholder="isDisabled ? '请先登录！' : '留下你自己的见解吧' "
          :rows="6"
          v-model="newComment"
          :disabled="isDisabled"
        />
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="3" />
      <el-col :span="18">
        <el-button type="danger" @click="publishComment" :disabled="isDisabled">发表</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="3" />
      <el-col :span="18">
        <el-card class="comment">
          <template #header>
            <span class="title">精彩评论</span>
          </template>
          <el-empty v-show="!comments.length" />
          <div class="comment-box" v-for="c in comments" :key="c.id" v-show="comments.length">
            <div class="comment-user">
              <el-avatar shape="square" :size="60" :src="c.avatarUrl" :icon="UserFilled"/>
              <div class="about-user">
                <span>{{ c.createTime }}</span>
                <span>{{ c.username }}：</span>
              </div>
            </div>
            <div class="comment-text">
              {{ c.content }}
            </div>
            <div class="comment-footer">
              <div class="commentSvg" @click="showReply(c)">
                <img src="@/assets/comment.svg" alt="comment">
                <span>{{ c.children.length }}</span>
              </div>
              <div class="likeSvg">
                <img src="@/assets/heartLike.svg" alt="like" width="28px" height="28px" v-if="!c.isLike" @click="changeLike(c.id)">
                <img src="@/assets/liked.svg" alt="liked" width="28px" height="28px"    v-if="c.isLike"  @click="changeLike(c.id)">
                <span>{{ c.liked }}</span>
              </div>
            </div>
            <div class="reply-box" v-if="c.showReply">
              <el-input
                type="textarea"
                :placeholder="isDisabled ? '请先登录！' : `回复 ${c.username}：`"
                :rows="6"
                v-model="replyComment"
                :disabled="isDisabled"
              >
              </el-input>
              <div class="button-container">
                <el-button type="danger" @click="publishReply(c.id)" :disabled="isDisabled">发表</el-button>
              </div>
              <div  v-for="r in c.children" :key="r.id">
                <div class="reply-user">
                  <el-avatar shape="square" :size="60" :src="r.avatarUrl" :icon="UserFilled" />
                  <div class="about-user">
                    <span>{{ r.createTime }}</span>
                    <span>{{ r.username }}：</span>
                  </div>
                </div>
                <div class="reply-text">
                  {{ r.content }}
                </div>
              </div>
            </div>
            <el-divider />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Comment">
  import emitter from '@/utils/emitter'
  import { useRoute } from 'vue-router'
  import { computed, nextTick, ref } from 'vue'
  import { useCommentStore } from '@/stores/comment'
  import { pubComment, pubReply, likeComment } from '@/api/article'
  import { UserFilled } from '@element-plus/icons-vue'
  import { useStorage } from '@vueuse/core'
  // 路由
  const route = useRoute()
  // pinia
  const commentStore = useCommentStore()
  const { comments } = commentStore //  comments数据
  // 数据
  const newComment = ref('')
  const replyComment = ref('')
  const isLogined = useStorage('isLogined')
  const isDisabled = computed(()=>{ //  控制没登录锁不锁
    if (isLogined.value === 'true') {
      return false
    } else {
      return true
    }
  })
  // 方法
  function getTime() {
    // 获取时间
    let time = new Date()
    // 更改时间的格式为 year.month.day hour:minute:second
    time = time.toLocaleString('zh-CN') // year/month/day hour:minute:second
    time = time.replace(/\/+/g, '.')  // 通过 正则表达式 与 replace 方法配合将 '/' 全替换成 '.'
    return time
  }

  function publishComment() { //  发表新的评论
    // 打包请求体数据
    const data = {
      blogId: route.params.articleId,
      content: newComment.value,
      createTime: getTime()
    }
    pubComment(data).then(
      res => {
        if (res.code === 200) { //  如果评论成功
          commentStore.pushNewComment(res.data)
          newComment.value = ''
          ElMessage.success(res.msg)
        }
      },
      err => {
        throw err
      }
    )
  }

  function showReply(c) { //  展示不展示子评论的方法
    c.showReply = !c.showReply
  }
  
  function publishReply(parentId) { //  回复评论
    // 打包请求体数据
    const data = {
      parentId,
      blogId: route.params.articleId,
      content: replyComment.value,
      createTime: getTime()
    }
    pubReply(data).then(
      res => {
        if (res.code === 200) {
          commentStore.pushNewReply(res.data, parentId)
          replyComment.value = ''
          ElMessage.success(res.msg)
        }
      },
      err => {
        throw err
      }
    )
  }

  function changeLike(commentId) {
    if (isLogined.value === 'true') {
      likeComment(commentId).then(
        res => {
          if (res.code === 200) {
            commentStore.handleCommentLike(commentId)
          }
        },
        err => {
          throw err
        }
      )
    } else {
      ElMessage.error('您还未登录，请先登录！');
    }
  }

  // mitt(目录导航相关)
  const lineIndex = ref()
  const commentRef = ref('')
  emitter.on('getLineIndex', (val)=>{
    lineIndex.value = val
  })
  nextTick(()=>{
    emitter.emit('getCommentRef', commentRef.value)
  })
</script>

<style scoped>
  .comment-container {
    width: 70%;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 40px;
  }
  .comment-total {
    width: 253px;
    height: 77px;
    background: #F55E54;
    border-radius: 16px;
    border: none;
  }
  .comment-total span:first-child {
    font-weight: 700;
    font-size: 48px;
    line-height: 77px;
    color: #FFFFFF;
    margin: 0 20px;
  }
  .comment-total span:last-child {
    font-weight: 400;
    line-height: 26px;
    color: rgba(255, 255, 255, 0.6);
  }
  :deep(.comment-total .el-card__body) {
    padding: 0;
  }
  .el-row:nth-child(2) {
    margin-top: 40px;
  }
  .el-textarea {
    background: #FFFFFF;
    box-shadow: -7px 7px 8.4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    --el-input-focus-border-color: transparent;
  }
  .el-row:nth-child(3) .el-col {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
  }
  .el-row:nth-child(3) .el-col .el-button {
    width: 100px;
    height: 45px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #FFFFFF;
  }
  .el-row:nth-child(4) {
    margin-top: 40px;
  }
  .comment .title {
    font-weight: 700;
    font-size: 32px;
    line-height: 42px;
  }
  .comment .comment-box {
    display: flex;
    flex-direction: column;
  }
  .comment .comment-box .comment-user {
    display: flex;
  }
  .comment .comment-box .about-user {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 20px;
  }
  .comment .comment-box .about-user span:first-child {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #959595;
    margin-bottom: 10px;
  }
  .comment .comment-box .about-user span:last-child {
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    color: #000;
  }
  .comment .comment-box .comment-text {
    padding: 10px;
    font-weight: 290;
    font-size: 18px;
    line-height: 24px;
  }
  .comment-footer {
    display: flex;
    justify-content: flex-end;
  }
  .commentSvg,
  .likeSvg {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .comment-footer img,
  .comment-footer span {
    margin-right: 25px;
  }
  .reply-box .el-textarea {
    box-shadow: -7px 7px 8.4px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
  }
  :deep(.reply-box .el-textarea__inner) {
    border-radius: 8px;
    background: #EDEDED;
  }
  :deep(.el-textarea__inner::placeholder) {
    font-weight: 290;
    font-size: 20px;
    line-height: 27px;
    color: rgba(0, 0, 0, 0.71);
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #FFFFFF;
  }
  .button-container .el-button {
    width: 62px;
    height: 28px;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
  .reply-user {
    display: flex;
  }
  .reply-text {
    padding: 10px;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;
    color: #000000
  }
</style>
