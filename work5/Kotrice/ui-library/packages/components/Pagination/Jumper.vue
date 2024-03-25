<template>
  <span class="x-jumper">
    <span>
      <slot>Go to </slot>
    </span>
    <el-input
      type="number"
      v-model.number="jumpPage"
      @keyup.enter="handleJump"
      @blur="handleJump"
    />
  </span>
</template>

<script setup>
  defineOptions({
    name: 'XPaginationJumper'
  })
  import { ref, watch } from "vue";
  const props = defineProps({
    setPager: {
      type: Function
    },
    currentPage: {
      type: Number
    },
    totalPage: {
      typeof: Number
    }
  })
  const jumpPage = ref(props.currentPage)
  watch(()=>props.currentPage, ()=>{
    jumpPage.value = props.currentPage
  })
  function handleJump() {
    if (props.currentPage === props.totalPage && jumpPage.value >= props.totalPage) {
      jumpPage.value = props.totalPage
    } else if (props.currentPage === 1 && jumpPage.value <= 1) {
      jumpPage.value = 1
    } else {
      props.setPager(jumpPage.value)
    }
  }
</script>

<style lang="scss" scoped>

</style>
