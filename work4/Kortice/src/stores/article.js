import { defineStore } from "pinia"
import { reactive } from "vue"

export const useArticleStore = defineStore('article', ()=>{
  // 数据
  const article = reactive({})
  const aboutAuthor = reactive({})
  // 方法
  function setArticle(articleVal) {
    Object.assign(article, articleVal)
  }
  function handleArticleLike() {
    article.isLike = !article.isLike
    if (article.isLike) { //  改了之后是喜欢
      article.liked += 1
    } else { //  改了之后是不喜欢
      article.liked -= 1
    }
  }
  function clearArticle() {
    Object.keys(article).forEach(key => {
      delete article[key]
    })
  }

  function setBlogsCount(val) {
    aboutAuthor.blogsCount = val
  }


  return {
    article,
    aboutAuthor,
    setArticle,
    handleArticleLike,
    clearArticle,
    setBlogsCount
  }
}, {
  persist: true
})
