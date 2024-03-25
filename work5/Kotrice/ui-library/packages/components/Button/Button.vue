<template>
  <div>
    <button
      class="x-button"
      :class="[
        `x-button--${size}`,
        disabled ? `x-button--${type}--disabled` : `x-button--${type}`,
        round ? `x-button--round` : ''
        ]"
      :disabled="disabled"
    >
      <span>
        <slot></slot>
      </span>
    </button>
  </div>
</template>

<script setup>
  //  命名组件
  defineOptions({
    name: 'XButton'
  })
  // 定义props
  defineProps({
    size: {
      type: String,
      default: 'default',
      validator: value => ['small', 'default', 'large'].includes(value)
    },
    type: {
      type: String,
      default: 'info',
      validator: value => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    round: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  })
</script>

<style lang="scss" scoped>

</style>
