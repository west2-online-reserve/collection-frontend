<!-- HomeView.vue -->
<template> 
    <el-button type="primary" @click="testButton">test</el-button>
    <el-button type="primary" @click="testButton1">addAccountToCollection</el-button>
    <el-button type="primary" @click="testButton2">resetPasswordByName</el-button>
    <el-button type="primary" @click="testButton3">isAccountCorrect</el-button>

    <!-- <el-icon class="is-loading">
        <Search width="1/>
    </el-icon> -->
    <RouterView> </RouterView>
</template>
    
<script setup lang="ts" name="HomeView"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // router
    import { RouterView, RouterLink, useRouter } from 'vue-router';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    import {registerAccountToLocalStorage} from '@/utils/userMangent'
    
    import {ElMessage} from 'element-plus'
    
    let router = useRouter();

const { testInfo, registerAccount, addAccountToCollection, resetPasswordByName, isAccountCorrect, updateLoginStatus, isAutoLogin} = useUserCollectionStore();
    
    let testInfo1 = reactive<UserInfo>({
    id: '23131231434',
    username: 'NoVarYe',
    password: 'Qazwsx1234',
    email: 'yy@qq.com',
});
    let testInfo2 = reactive<UserInfo>({
    id: '2313wfssfs434',
    username: 'NoQweYe',
    password: 'Qadgad234',
    email: 'yqqy@qq.com',
});
const testButton = () => {
    testInfo();
}
const testButton1 = () => {
    addAccountToCollection(registerAccount(testInfo1));
    addAccountToCollection(registerAccount(testInfo2));
}


const testButton2 = () => {
    console.log(resetPasswordByName('NoVarYe', 'tedsft'))
}
const testButton3 = () => {    
    // console.log(isAccountCorrect('NoVarYe', 'test'))
    console.log(isAccountCorrect('NoVarYe', 'tedsft'))
}


function loginSuccessfully() {
        ElMessage({
            message: 'Log in Successffuly!', type: 'success',
            grouping: true, showClose: false, offset: 100, duration:1000,
        });
    }    
</script>
    
<style scoped>
    
</style>
    