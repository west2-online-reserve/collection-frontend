<template>
  <div class="x-pager-container">
    <ul class="x-pager">
      <li
        :class="{active: currentPage === 1}"
        @click="setPager(1)"
      >1</li>
      <li
        v-if="showMoreLeft"
        @click="setPager(currentPage - pagerCount + 2)"
      >...</li>
      <li
        v-for="p in centerPages" :key="p"
        @click="setPager(p)"
        :class="{active: p === currentPage}"
      >{{ p }}</li>
      <li
        v-if="showMoreRight"
        @click="setPager(currentPage + pagerCount - 2)"
      >...</li>
      <li
        :class="{active: currentPage === totalPage}"
        @click="setPager(totalPage)"
        v-if="totalPage !== 1"
      >{{ totalPage }}</li>
    </ul>
  </div>
</template>

<script setup>
  defineOptions({
    name: 'XPaginationPager'
  })
  import { computed } from "vue"
  const props = defineProps({
    currentPage: {
      type: Number
    },
    totalPage: {
      type: Number
    },
    setPager: {
      type: Function
    },
    pagerCount: {
      type: Number
    }
  })
  // 数据
  // 左侧的更多按钮
  const showMoreLeft = computed(()=>{
    return props.totalPage > props.pagerCount && props.currentPage >= (props.pagerCount - (props.pagerCount - 3) / 2)
  })
  // 右侧的更多按钮
  const showMoreRight = computed(()=>{
    return props.totalPage > props.pagerCount && props.currentPage <= (props.totalPage - ((props.pagerCount -3) / 2 + 2))
  })
  // 中间展示出来的页码
  const centerPages = computed(()=>{
    let centerArray = []
    // 如果小于等于2页
    if (props.totalPage <= 2) return
    // 如果大于2页但是小于折叠所需要的数量
    if (props.totalPage <= props.pagerCount) {
      for (let i=2; i<props.totalPage; i++) {
        centerArray.push(i);
      }
    } else if (props.currentPage < (props.pagerCount - (props.pagerCount - 3) / 2)) {
      for (let i=2, step=0; step<props.pagerCount-2; i++, step++) {
        centerArray.push(i)
      }
    } else if (props.currentPage > (props.totalPage - ((props.pagerCount -3) / 2 + 2))) {
      for (let i=props.totalPage-1, step=0; step<props.pagerCount-2; i--, step++) {
        centerArray.unshift(i)
      }
    } else {
      for (let i=props.currentPage-(props.pagerCount - 3)/2; i<=props.currentPage+(props.pagerCount - 3)/2; i++) {
        centerArray.push(i)
      }
    }
    return centerArray
  })
</script>

<style lang="scss" scoped>

</style>
