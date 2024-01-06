<!-- To doListView.vue -->
<template> 
    <el-container>
        <el-main style="height: 586px;">
            <el-row justify="space-between">
                <el-col :span="12" >
                    <Calendar/>
                    <AddTasks/>
                </el-col>

                <el-col :span="11">
                    <TodoList/>
                </el-col>                
            </el-row>
        </el-main>

    </el-container>
</template>
    
<script setup lang="ts" name="TodoListView"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // router
    import { useRouter } from 'vue-router';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    // import {registerAccountToLocalStorage} from '@/utils/userManagement'
    import * as dateUtils from '@/utils/dateUtils'
    // ui
    import {ElMessage} from 'element-plus'
    import type { CalendarDateType, CalendarInstance } from 'element-plus'
    // components
    import Calendar from '@/components/CalendarComponent.vue'
    import AddTasks from '@/components/AddTasksComponent.vue'
    import TodoList from '@/components/TodoListComponet.vue'

    let router = useRouter();


</script>

<style scoped>
    
</style>
    @/utils/userMangement@/utils/dateUtilities@/backup/userInfo