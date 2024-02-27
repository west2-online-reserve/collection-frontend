// 引入 axios 实例
import { service } from "@/utils/request"

// 获取最热榜的文章
export const getHotBlogs = current => service.request({
  method: 'get',
  url: '/blog/hot',
  params: {
    current
  }
})

// 获取最新榜的文章
export const getLatestBlogs = (lastId=Date.now(), offset=0) => service.request({
  method: 'get',
  url: '/blog/new',
  params: {
    lastId,
    offset
  }
})

// 创作文章
export const publishBlogs = data => service.request({
  method: 'post',
  url: '/blog',
  data
})

// 查询我的文章
export const getMyBlogs = () => service.request({
  method: 'get',
  url: '/blog/of/me'
})

// 查询我赞过的文章
export const getMyLiked = () => service.request({
  method: 'get',
  url: '/blog/like/me'
})

// 查看文章
export const getBlog = articleId => service.request({
  method: 'get',
  url: `/blog/${articleId}`
})

// 点赞文章
export const handleBlogLike = articleId => service.request({
  method: 'put',
  url: `/blog/like/${articleId}`
})

// 查询评论
export const getComment = articleId => service.request({
  method: 'get',
  url: `/blog-comments/${articleId}`
})

// 发表评论
export const pubComment = data => service.request({
  method: 'post',
  url: '/blog-comments',
  data
})

// 回复评论
export const pubReply = data => service.request({
  method: 'post',
  url: '/blog-comments/reply',
  data
})

// 点赞评论
export const likeComment = id => service.request({
  method: 'put',
  url: `/blog-comments/like/${id}`
})
