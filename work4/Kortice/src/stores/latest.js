import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { getLatestBlogs } from "@/api/article"

export const useLatestStore = defineStore('latest', ()=>{
  // 数据
  const latest = reactive([])
  const minTime = ref(null)
  const offset = ref(null)
  // 方法

  // 设置info
  function setBlogsInfo(l) {
    // 找到第一个 '\n'
    const startIndex = l.content.indexOf('\n')
    // 截取片段
    const info = l.content.slice(2, startIndex)
    // 设置这个属性
    l.info = info
  }

  // 设置数据
  function setLatestBlogs(data, minTimeVal, offsetVal) {
    Object.assign(latest, [...data])
    latest.forEach(l => {
      setBlogsInfo(l)
    })
    minTime.value = minTimeVal
    offset.value = offsetVal
  }

  // 无限滚动的推入新数据的方法
  function pushLatestBlogs(data, minTimeVal, offsetVal) {
    latest.push(...data)
    latest.forEach(l => {
      setBlogsInfo(l)
    })
    minTime.value = minTimeVal
    offset.value = offsetVal
  }
  // 无限滚动新增 latestNews
  function addLatestNews() {
    getLatestBlogs(minTime.value, offset.value).then(
      res => {
        if (res.code === 200) {
          pushLatestBlogs(res.data.list, res.data.minTime, res.data.offset)
        }
      },
      err => {
        throw err
      }
    )
    
  }

  // 返回相关的数据
  return {
    latest,
    setLatestBlogs,
    addLatestNews
  }
})
