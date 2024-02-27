import { defineStore } from "pinia";
import { reactive } from "vue";

export const useCommentStore = defineStore('comment', ()=>{
  // 数据
  const comments = reactive([])

  // 方法

  // 添加showReply属性
  function setShowReply() {
    comments.forEach(c => {
      c.showReply = false
    })
  }

  // 设置数据
  function setComments(data) {
    Object.assign(comments, [...data])
    setShowReply()  //  设置showReply属性,控制展示不展示子评论
  }

  // 点不点赞评论
  function handleCommentLike(commentId) {
    comments.forEach(c => {
      if (c.id === commentId) {
        c.isLike = !c.isLike
        if (c.isLike) { //  不喜欢 => 喜欢
          c.liked += 1
        } else {
          c.liked -= 1
        }
      }
    })
  }
  
  // 添加新的父评论
  function pushNewComment(newComment) {
    newComment.showReply = false  //  设置showReply属性
    comments.unshift(newComment)
  }

  // 添加新的子评论
  function pushNewReply(newReply, commentId) {
    comments.forEach(c => {
      if (c.id === commentId) {
        c.children.unshift(newReply)
      }
    })
  }

  // 清空评论
  function clearComments() {
    comments.length = 0
  }

  return {
    comments,
    setComments,
    handleCommentLike,
    pushNewComment,
    pushNewReply,
    clearComments
  }
})
