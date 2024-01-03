<!-- To doListView.vue -->
<template> 
    <div class="container-todolist-item">
        <el-container>
            <el-row style="width: 100%;">
                <el-col :span="2">
                    <el-checkbox></el-checkbox>
                </el-col>
                <el-col :span="20" >
                    <el-text >df</el-text>
                </el-col>
                <el-col :span="2">
                    <el-checkbox-button><el-icon><Star /></el-icon></el-checkbox-button>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>
    
<script setup lang="ts" name="TodoListItem"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    import {registerAccountToLocalStorage} from '@/utils/userMangent'
    import * as dateUtils from '@/utils/dateUtils'
    // ui
    import {ElMessage} from 'element-plus'


    
</script>
<style>
.el-checkbox .el-checkbox__inner {
  border-radius: 50%;
}
</style>
<style scoped>

.container-todolist-item{
    /* background-color: #DDEBDB */
    border-radius: 10px;
    padding: 0;
    width: 100%;
    margin: 10px 10px;
}


</style>
    