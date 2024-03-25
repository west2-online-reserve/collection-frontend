<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
  import { provide, reactive, ref, watch } from "vue"
  // 命名组件
  defineOptions({
    name: 'XCheckboxGroup'
  })
  // 接收父组件传过来的v-model
  const labelArray = defineModel({type: Array, default: reactive([])})
  // 声明父组件传过来的属性值
  const props = defineProps({
    disabled: {
      type: Boolean
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: undefined
    }
  })
  // 声明父组件定义的change事件
  const emit = defineEmits(['change'])
  watch(labelArray.value, ()=>{
    emit('change', labelArray.value)
  })
  // 方法
  const updateLabelArray = (checkedLabel) => {
    labelArray.value.push(checkedLabel)
  }
  const deleteLabel = (label) => {
    labelArray.value.splice(labelArray.value.indexOf(label), 1)
  }
  // 给CheckBox提供数据与方法
  provide('labelArray', {
    labelArray: labelArray.value,
    updateLabelArray,
    deleteLabel,
    allDisabled: props.disabled,
    min: props.min,
    max: props.max,
  })
</script>

<style lang="scss" scoped>

</style>
