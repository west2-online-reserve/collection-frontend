<template>
  <div class="x-pagination-total"> 
    Total {{ total }}
  </div>
</template>

<script setup>
  defineOptions({
    name: 'XPaginationTotal'
  })
  defineProps({
    total: {
      type: Number
    }
  })
</script>

<style lang="scss" scoped>

</style>
