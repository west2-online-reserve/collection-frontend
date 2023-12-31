<!-- RegisterView.vue -->
<template>
    <div class="container">
        <div class="container-of-form">
            <RouterView> </RouterView>
        </div>
        <div class="container-of-background"></div>
    </div>
</template>

<script setup lang="ts" name="RegisterView"> 
    import {RouterView} from 'vue-router'

</script>

<style scoped>

.container{
        display: flex;
        border-radius: 5px;
        
    }
    .container-of-form{
        background: #FAFCF9;
        width: 557px;
        height: 692px;
        
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 10px 0 0 10px;
    }
    .container-of-background{
        width: 588px;
        height: 692px;
        background-color: #D1E2CF;
        background-image: url('@/assets/img/pic01.png');
        background-repeat: no-repeat;
        background-size: 492px;
        background-position: 26px 92px;

        border-radius: 0 10px 10px 0;
    }
</style>
