<template>
  <x-button @click="$emit('clickNext')" :disabled="$attrs" >></x-button>
</template>

<script setup>
  defineOptions({
    name: 'XPaginationNext'
  })
  const emit = defineEmits(['clickNext'])
</script>

<style lang="scss" scoped>

</style>
