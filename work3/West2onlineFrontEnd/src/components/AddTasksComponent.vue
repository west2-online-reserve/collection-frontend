<!-- To doListView.vue -->
<template> 
    <div class="container-add-task">
        <el-container>
            <el-main style="padding:0;">
                <el-row>
                    <el-text class="title-task">
                        TASK
                    </el-text>
                </el-row>
                <el-row justify="space-between" style="width: 100%;">
                    <el-col :span="20" style="background-color: aliceblue;">
                    <el-input
                        v-model="textarea"
                        :rows="3"
                        type="textarea"
                        placeholder="Please input"
                        resize="none"
                        class="text-area"
                        />
                    </el-col>
                    <el-col :span="3" >
                    <el-button class="button-reset-task" style="width: 100%; margin: 0;" @click="resetTextArea">Reset</el-button>
                    <div style="height: 10px;"></div>
                    <el-button class="button-add-task" style="width: 100%; margin: 0;" @click="addTask">Add</el-button>
                </el-col>
            </el-row>
        </el-main>    
    </el-container>
</div>
</template>
    
<script setup lang="ts" name="AddTasks"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    import {registerAccountToLocalStorage} from '@/utils/userManagement'
    import * as dateUtils from '@/utils/dateUtils'
    // ui
    import {ElMessage} from 'element-plus'
    import type { CalendarDateType, CalendarInstance } from 'element-plus'

    const textarea = ref('')

    const resetTextArea = ()=>{
        textarea.value = '';
        console.log('Reset TextArea!');
    }
    const addTask = ()=>{
        console.log('Add Task!');
    }


    
</script>

<style scoped>
.container-add-task{
    background-color: #DDEBDB;
    border-radius: 10px;
    padding: 0 4px 4px 4px;
    height: 116px;
}
.title-task{
    user-select:none;
    padding-left: 4px;
    font-size: 24px;
    font-weight: bold;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
.text-area{
    /* font-size: 18px; */
    font-family: Inter;
}

.button-add-task, .button-reset-task{
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

</style>
    @/utils/userMangement@/stores/userCollectionStore@/utils/dateUtilities@/utils/userManagementUtilities@/backup/userInfo