<template>
  <div class="container">
    <RouterView/>
    <div class="right">
      <svg>
        <use xlink:href="#icon-img"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
  name:'Home'
  import { RouterView } from 'vue-router'
</script>

<style scoped>
  .container {
    width: 1145px;
    height: 692px;
    margin: 0 auto;
    display: flex;
    margin-top: 63px;
  }
  
  .right {
    width: 588px;
    background-color: #D1E2CF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right svg {
    width: 492px;
    height: 429px;
  }
</style>
