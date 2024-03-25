<template>
  <x-button @click="$emit('clickPrev')" :disabled="$attrs" >&lt;</x-button>
</template>

<script setup>
  defineOptions({
    name: 'XPaginationPrev'
  })
  const emit = defineEmits(['clickPrev'])
</script>

<style lang="scss" scoped>

</style>
