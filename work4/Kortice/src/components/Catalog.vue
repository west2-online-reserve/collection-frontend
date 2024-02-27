<template>
  <el-card>
    <template #header>
      <span class="catalog-header">目录</span>
    </template>
    <el-skeleton :loading="loading">
      <template #default>
        <ul>
          <li 
            v-for="(anchor, index) in titles" :key="anchor.title" 
            :style="{ paddingLeft: `${anchor.indent * 15 + 5}px` }"
            :class="currentIndex === index ? 'anchor-active' : '' "
          >
          <a
            @click="handleAnchorClick(anchor, domRef, commentRef)"
            class="catalog-anchor"
          >{{ anchor.title }}</a>
          </li>
        </ul>
      </template>
    </el-skeleton>  
  </el-card>
</template>

<script setup name="Catalog">
  import emitter from '@/utils/emitter'
  import { ref, onBeforeUnmount } from 'vue'
  import { useScroll, watchThrottled  } from '@vueuse/core'
  // 数据
  const titles = ref([])
  const domRef = ref(null)
  const currentIndex = ref()
  const { y } = useScroll(window)
  const commentRef = ref(null)

  // 骨架屏的数据
  const loading  = ref(true)

  // 处理标题
  function handleTitles(domRef) {
    const anchors = domRef.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')  //  获取所以H元素
    titles.value = Array.from(anchors).filter( title => !!title.innerText.trim()) //  将没内容的标题过滤掉
    // 如果全都被过滤掉了(也就是都不满足)
    if (!titles.value.length) {
      titles.value = []
      return ;
    }
    // 获取H标签名去重然后排序
    const hTags = [...new Set(titles.value.map( title => title.tagName ))].sort()
    // 为titles赋值
    titles.value = titles.value.map( el => ({
      title: el.innerText,  //  目录子标题
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName), //  缩进
    }))

    // 找到所有有 data-v-md-line 的属性的dom元素
    const countMdLine = domRef.$el.querySelectorAll('[data-v-md-line]')
    // 计算得最后一个 data-v-md-line 是多少 然后赋值给评论组件的dom
    const commentLineIndex = countMdLine[countMdLine.length - 1].getAttribute('data-v-md-line') + 1

    // 最后再塞入一个评论区
    titles.value.push({
      title: '评论',
      lineIndex: commentLineIndex,
      indent: 0 //  缩进
    })
    // 把属性值传给评论容器外壳
    emitter.emit('getLineIndex', commentLineIndex)
  }
  
  // 处理点击事件
  function handleAnchorClick(anchor, domRef, commentRef) { 
    const { lineIndex } = anchor
    const heading = domRef.$el.querySelector(`[data-v-md-line="${lineIndex}"]`) || commentRef
    if (heading) {
      domRef.previewScrollToTarget({
        target: heading,
        scrollContainer: window,
        top: 0
      })
    }
  }

  // 处理目录对应高亮
  watchThrottled(y, ()=>{ //  利用watchThrottled节流防抖
    titles.value.forEach((anchor, index) => {
      const { lineIndex } = anchor
      const heading = domRef.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`) || commentRef.value
      if (index < titles.value.length - 1) {
        if (y.value >= heading.offsetTop + 300) {
          currentIndex.value = index
        }
      } else if (index === titles.value.length - 1) {
        if (y.value >= heading.offsetTop - 10) {
          currentIndex.value = index
        }
      }
    });
  }, { throttle: 400 })

  emitter.on('getArticleRef',  articleRef => {
    // 更新domRef
    domRef.value = articleRef
    // 更新标题
    handleTitles(domRef.value)
    // 
    loading.value = false
  })
  emitter.on('getCommentRef', val => {
    commentRef.value = val
  })
  
  // 组件卸载的时候解绑对应的mitt
  onBeforeUnmount(()=>{
    emitter.off('getArticleRef')
    emitter.off('getCommentRef')
  })
</script>

<style scoped>
  .el-card {
    position: fixed;
    top: 450px;
    width: 21%;
  }
  .el-card ul li {
    list-style: none;
    margin: 10px 0;
    box-sizing: border-box;
    border-left: 2px solid transparent;
  }
  .catalog-header {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
  .catalog-anchor {
    cursor: pointer;
    transition: all .3s linear;
  }
  .catalog-anchor:hover {
    color: #FFABA5;
  }
  .anchor-active {
    color: #FFABA5;
    border-left: 2px solid #FFABA5 !important;
  }
</style>
