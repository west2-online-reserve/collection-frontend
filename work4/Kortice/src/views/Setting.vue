<template>
  <Header />
  <div class="container">
    <div class="setting-card-container">
      <SettingCard />
    </div>
    <div class="modify-card-container">
      <ModifyCard />
    </div>
  </div>
</template>

<script setup name="Setting">
  import Header from '@/components/Header.vue'
  import SettingCard from '@/components/SettingCard.vue'
  import ModifyCard from '@/components/ModifyCard.vue'
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px);
  }
  .setting-card-container {
    width: 100%;
    height: 40vh;
    background-color: #fff;
    display: flex;
    align-items: flex-end;
  }
  .modify-card-container {
    background: linear-gradient(to bottom, rgba(255,171,165,0.5), #fff);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
