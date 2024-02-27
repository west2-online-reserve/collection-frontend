import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { getHotBlogs } from '@/api/article'

export const useHotStore = defineStore('hot', ()=>{
  // 数据
  const hot = reactive([])
  const current = ref(1)

  // 方法
  // 设置info
  function setBlogsInfo(h) {
    // 找到第一个 '\n'
    const startIndex = h.content.indexOf('\n')
    // 截取片段
    const info = h.content.slice(2, startIndex)
    // 设置这个属性
    h.info = info
  }
  
  // 设置数据
  function setHotBlogs(data) {
    Object.assign(hot, [...data])
    hot.forEach(h => {
      setBlogsInfo(h)
    })
  }

  // 无限滚动的推入新数据的方法
  function pushHotBlogs(data) {
    hot.push(...data)
    hot.forEach(h => {
      setBlogsInfo(h)
    })
  }
  // 无限滚动新增 hotNews
  function addHotNews() {
    getHotBlogs(++current.value).then(
      res => {
        if (res.code === 200 && res.data.length !== 0) {
          pushHotBlogs(res.data)
        }
      },
      err => {
        throw err
      }
    )
  }

  // 返回相关数据
  return {
    hot,
    setHotBlogs,
    addHotNews
  }
})
