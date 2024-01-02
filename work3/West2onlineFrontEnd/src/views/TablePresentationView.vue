<!-- TablePresentationView.vue -->
<template> 
    TablePresentationView
</template>
    
<script setup lang="ts" name="TablePresentationView"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // router
    import { useRouter } from 'vue-router';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    import {registerAccountToLocalStorage} from '@/utils/userMangent'
    //ui
    import {ElMessage} from 'element-plus'
    
    let router = useRouter();

    const { testInfo, registerAccount, addAccountToCollection, resetPasswordByName, isAccountCorrect, updateLoginStatus, isAutoLogin} = useUserCollectionStore();
    
  
</script>
    
<style scoped>
    
</style>
    