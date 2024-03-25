<template>
  <Teleport to="body">
    <Transition name="fade" :duration="200">
      <div
        id="mask"
        v-if="visiable"
        @click="handleClose"
      >
        <div class="x-dialog-container" @click.stop>
          <header class="x-dialog-header">
            <slot name="header">
              <span>{{ title }}</span>
            </slot>
            <div class="close-container" @click="handleClose">
              <svg t="1710844041590" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16540" width="200" height="200">
                <path d="M457.601148 514.235536L9.128596 66.957641c-7.893265-15.750974-15.78653-39.380991 0-55.131966 15.800752-15.758085 39.494768-15.758085 55.288409 0l448.237887 447.043231L957.052812 11.882564c15.750974-15.843418 39.380991-15.843418 55.131966 0 15.758085 15.843418 15.758085 39.608545 0 55.459074l-444.156144 446.744566 444.1277 442.947266c15.793641 15.758085 15.793641 39.395214 0 55.139077-15.793641 15.758085-39.487657 15.758085-55.281298 0L512.974889 569.459946l-446.005017 448.593439c-15.758085 7.92882-47.267145 7.92882-55.139077 0-15.758085-15.843418-15.758085-39.608545 0-55.451963l445.770353-448.365886z" fill="#909399" p-id="16541">
                </path>
              </svg>
            </div>
          </header>
          <div class="x-dialog-content">
            <slot></slot>
          </div>
          <footer class="x-dialog-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { watch } from 'vue'
  //  命名组件
  defineOptions({
    name: 'XDialog'
  })
  // 声明父组件传来的 v-model
  const visiable = defineModel({type: Boolean, required: true})
  // 声明父组件传来的 props
  const props = defineProps({
    title: {
      type: String
    },
    beforeClose: {
      type: Function
    }
  })
  // 自定义事件
  const emit = defineEmits(['open', 'close'])
  // 方法
  function done() {
    visiable.value = !visiable.value
  }
  function handleClose() {
    if (!props.beforeClose) { //  如果父组件没传before-close
      done()
    } else {
      props.beforeClose(done)
    }
  }
  watch(visiable, (newValue, oldValue) => {
    if (newValue == true) {
      emit('open')
    } else if (newValue == false) {
      emit('close')
    }
  })
</script>

<style lang="scss" scoped>
  // 遮罩层的过渡
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  // 对话框的过渡
  .fade-enter-active .x-dialog-container,
  .fade-leave-active .x-dialog-container {
    transition: all .2s ease-in-out;
  }
  .fade-enter-from .x-dialog-container,
  .fade-leave-to .x-dialog-container {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
