<template>
  <div>{{ editTime }}</div>
</template>

<script setup name="EditTime">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  // 数据
  const editTime = ref('')
  // 将把时间格式化的操作分装成一个函数
  const formatDateTime = () => {
    // 获取时间
    let time = new Date()
    // 更改时间的格式为 year.month.day hour:minute:second
    time = time.toLocaleString('zh-CN') // year/month/day hour:minute:second
    time = time.replace(/\/+/g, '.')  // 通过 正则表达式 与 replace 方法配合将 '/' 全替换成 '.'
    editTime.value = time
  }
  // 组件挂载的时候更新时间
  onMounted(()=>{
    formatDateTime()
  })
  // 设置定时器来控制时间同步
  const timer = setInterval(()=>{
    formatDateTime()
  }, 1000)
  // 组件卸载的时候删除定时器
  onBeforeUnmount(()=>{
    clearInterval(timer)
  })
</script>

<style scoped>

</style>
