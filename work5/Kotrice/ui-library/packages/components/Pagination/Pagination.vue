<template>
  <div class="x-pagination">
    <Total :total="total" />
    <el-select
      v-model="pickPageSize"
      @change="changePageSize"
    >
      <el-option
        v-for="ps in pageSizes"
        :key="ps"
        :label="ps"
        :value="ps"
      />
    </el-select>
    <Prev @clickPrev="changePage(-1)" :disabled="isCurrentPage ? (currentPage === 1) : (innerCurrentPage === 1)" ></Prev>
    <Pager
      :current-page="isCurrentPage ? currentPage : innerCurrentPage"
      :total-page="totalPage"
      :setPager="setPager"
      :pager-count="pagerCount"
    ></Pager>
    <Next @clickNext="changePage(+1)" :disabled="isCurrentPage ? (currentPage === totalPage) : (innerCurrentPage === totalPage)"></Next>
    <Jumper :set-pager="setPager" :current-page="isCurrentPage ? currentPage : innerCurrentPage" :total-page="totalPage" />
  </div>
</template>

<script setup>
  import Prev from './Prev.vue'
  import Next from './Next.vue'
  import Pager from './Pager.vue'
  import Jumper from './Jumper.vue'
  import Total from './Total.vue'
  import { computed, ref } from 'vue'
  defineOptions({
    name: 'XPagination'
  })
  // 
  const pageSize = defineModel('pageSize', {type: Number, default: undefined})
  const currentPage = defineModel('currentPage', {type: Number, default: undefined})
  // 
  const props = defineProps({
    total: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    defaultPageSize: {
      type: Number,
      default: 10
    },
    defaultCurrentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: [10, 20, 30, 40, 50, 100]
    }
  })
  // 数据
  const isCurrentPage = ref(currentPage.value ? true : false) //  判断对应的变量是属于 受控 还是 非受控 状态
  const innerCurrentPage = ref(props.defaultCurrentPage)
  
  const isPageSize = ref(pageSize.value ? true : false)       //  判断对应的变量是属于 受控 还是 非受控 状态
  const innerPageSize = ref(props.defaultPageSize)

  // 总页码数
  const totalPage = computed(()=>{
    if (props.pageCount) return props.pageCount
    if (isPageSize.value) return Math.ceil(props.total / pageSize.value)
    if (!isPageSize.value) return Math.ceil(props.total / innerPageSize.value)
  })
  //  选择框的数据控制
  const pickPageSize = computed({
    get() {
      if (isPageSize.value) return pageSize.value
      else return innerPageSize.value
    },
    set(val) {
      if (isPageSize.value) pageSize.value = val
      else innerPageSize.value = val
    }
  })

  // 方法
  function changePage(value) {
    if (isCurrentPage.value) {
      if (value === -1 && currentPage.value === 1) return
      if (value === 1 && currentPage.value === totalPage.value) return
      currentPage.value += value
    } else {
      if (value === -1 && innerCurrentPage.value === 1) return
      if (value === 1 && innerCurrentPage.value === totalPage.value) return
      innerCurrentPage.value += value
    }
  }
  function setPager(page) {
    if (page < 1) page = 1
    if (page > totalPage.value) page = totalPage.value
    if (page === '') page = 1
    if (isCurrentPage.value) {
      currentPage.value = page
    } else {
      innerCurrentPage.value = page
    }
  }
  function changePageSize() {
    if (isCurrentPage.value) {
      if (currentPage.value > totalPage.value) currentPage.value = totalPage.value
      if (currentPage.value < 1) currentPage.value = 1
    } else {
      if (innerCurrentPage.value > totalPage.value) innerCurrentPage.value = totalPage.value
      if (innerCurrentPage.value < 1) innerCurrentPage.value = 1
    }
  }
</script>

<style lang="scss" scoped>

</style>
