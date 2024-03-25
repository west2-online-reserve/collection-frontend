<template>
  <div class="x-checkbox-div">
    <label
      class="x-checkbox-container"
      :class="isDisabled ? 'x-checkbox-disabled' : ''"
    >
      <input
        class="x-checkbox"
        type="checkbox"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="handleChange"
      >
      <span
        class="x-checkbox-label"
        :class="[
          isChecked ? 'is-checked' : '' ,
          isDisabled ? 'x-checkbox-label-disabled' : ''
        ]"
      >
        <slot>
          {{ label }}
        </slot>
      </span>
    </label>
  </div>
</template>

<script setup>
  import { computed, inject, nextTick, onMounted, ref, watch } from "vue"
  // 命名组件
  defineOptions({
    name: 'XCheckbox'
  })
  // 接收父组件传来的v-model
  const checkedValue = defineModel({type: Boolean, default: undefined})
  // 声明父组件传来的props
  const props = defineProps({
    label: {
      type: String
    },
    checked: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  })
  // 声明父组件传来的事件
  const emit = defineEmits(['change'])
  //  数据
  //  checkbox-gourp注入的数据和方法
  const { labelArray, updateLabelArray, deleteLabel, allDisabled, min, max } 
  = inject('labelArray', {
    labelArray: undefined,
    updateLabelArray: undefined,
    deleteLabel: undefined,
    allDisabled: false,
  })
  const innerChecked = ref(props.checked)   //  非受控的时候的内部checked数据
  const isDisabled = ref(props.disabled)
  const isChecked = computed({
    get() {
      // 如果value没有定义，也就是当前x-checkbox非受控
      if (checkedValue.value === undefined) {
        return innerChecked.value
      } else {
        return checkedValue.value
      }
    },
    set(val) {
      // 如果value没有定义，也就是当前x-checkbox非受控
      if (checkedValue.value === undefined) {
        innerChecked.value = val
      } else {
        checkedValue.value = val
      }
    }
  })
  // 监听 isChecked 的值，改变了就触发change事件
  watch(isChecked, () => {
    emit('change', isChecked.value)
  }, {immediate: false})
  // 方法
  function handleChange() {
    isChecked.value = !isChecked.value
    if (labelArray) { //  对于有checkbox-group包裹的时候
      if (isChecked.value) {  //  就是如果 false -> true
        updateLabelArray(props.label)
      } else {  //  true -> false
        deleteLabel(props.label)
      }
    }
    // emit('change', isChecked.value)
  }
  //  对于有 checkbox-group 包裹的，挂载的时候初始化
  onMounted(()=>{
    if (labelArray) { //  如果 lableArray 不是 undefined  也就是有 checkbox-group 包裹
      watch(labelArray, ()=>{
        if (labelArray.includes(props.label)) {
          if (!isChecked.value) {
            isChecked.value = !isChecked.value
          }
        } else {
          if (isChecked.value) {
            updateLabelArray(props.label)
          }
        }
      }, {immediate: true})
    }
    if (allDisabled) {
      isDisabled.value = allDisabled;
    }
  })
  const maxValue = ref(max)
  // 上面初始化完，下面对 min 和 max 的逻辑
  nextTick(()=>{
    if (labelArray !== undefined) {
      if (max === undefined) {
        maxValue.value = 999999 //  这里后期修改，索性写死
      }
      // if (labelArray.length <= min) { //  如果打钩的没到 min 的个数
      //   if (labelArray.includes(props.label)) {
      //     if (!props.disabled) {  //  就是不是默认disabled绑死的
      //       isDisabled.value = true
      //     }
      //   }
      // } else if (labelArray.length >= max) {
      //   if (!labelArray.includes(props.label)) {
      //     if (!props.disabled) {
      //       isDisabled.value = true
      //     }
      //   }
      // }
      //  监视labelArray长度的改变，比较其 min 和 max 的关系，然后修改对应的 isDisabled
      watch(labelArray, ()=>{
        if (maxValue.value <= 0) {
          // isChecked.value = false
          isDisabled.value = true
          return
        }
        if (labelArray.length <= min) { //  改了之后勾选的项少于 min 个
          if (labelArray.includes(props.label)) {
            if (!props.disabled && !allDisabled) {
              isDisabled.value = true
            }
          } else {
            if (!props.disabled && !allDisabled) {
              isDisabled.value = false
            }
          }
        } else if (min < labelArray.length && labelArray.length < maxValue.value) {
          if (!props.disabled && !allDisabled) {
            isDisabled.value = false
          }
        } else if (maxValue.value <= labelArray.length) {
          if (labelArray.includes(props.label)) {
            if (!props.disabled && !allDisabled) {
              isDisabled.value = false
            }
          } else {
            if (!props.disabled && !allDisabled) {
              isDisabled.value = true
            }
          }
        }
      }, {immediate: true})
    }
  })
</script>

<style lang="scss" scoped>

</style>
