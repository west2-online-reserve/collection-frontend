<template>
  <div class="son-container">
    <span>Son 组件</span>
    <div>App 送来的：{{ bigHouse }}</div>
    <button class="son-btn" @click="giveGift">扣这向老登回礼</button>
  </div>
</template>

<script setup lang="ts">
// 声明 Props 的类型
type PropsType = {
  bigHouse?: string
}
// 设置 Props 属性的默认值
withDefaults(defineProps<PropsType>(), {
  bigHouse: '啥也没有😭'
})
// 声明 emit
const emit = defineEmits<{
  getGift: [val: string]
}>()
// 方法
const giveGift = () => {
  emit('getGift', 'iBanana X Plus Max')
}

</script>

<style scoped>
  .son-container {
    font-size: 40px;
    margin: 20px 0;
    padding: 20px;
    border-radius: 20px;
    background-color: rgba(128, 128, 128, 0.5);
    box-shadow: 0px 0px 10px 0px gray;
  }
  .son-btn {
    font-size: 25px;
    background-color: rgb(128, 128, 128, 0.8);
    border-radius: 7px;
    padding: 7px;
    box-shadow: 0px 0px 20px 0px gray;
    border: none;
    transition: all .3s ease-in-out;
    user-select: none;
  }
  .son-btn:hover {
    cursor: pointer;
    background-color: gray;
  }
</style>
