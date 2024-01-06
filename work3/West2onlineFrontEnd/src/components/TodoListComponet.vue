<!-- To doListView.vue -->
<template> 
    <div class="container-add-task">
        <el-container>
            <el-main style="padding:0;">
                <el-row style="width: 100%;">
                    <el-col :span="15">
                        <el-text class="title-todo">TODO LIST</el-text>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox-button v-model="checked1"><el-icon><Menu/></el-icon></el-checkbox-button>
                    </el-col>
                    <el-col :span="5">
                        <el-checkbox-group v-model="checkboxGroup1">
                            <el-checkbox-button label="Star"><el-icon><StarFilled/></el-icon></el-checkbox-button>
                            <el-checkbox-button label="Completed"><el-icon><CircleCheckFilled/></el-icon></el-checkbox-button>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-scrollbar style="height: 484px;">
                    <div v-for="item in 20" :key="item" class="scrollbar-demo-item"><TodoListItem/></div>
                </el-scrollbar>
        </el-main>    
    </el-container>
</div>
</template>
    
<script setup lang="ts" name="TodoList"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    // import {registerAccountToLocalStorage} from '@/utils/userManagement'
    import * as dateUtils from '@/utils/dateUtils'
    // ui
    import {ElMessage} from 'element-plus'
    import TodoListItem from '@/components/TodoListItemComponent.vue'

    const checked1 = ref(true)
    const checkboxGroup1 = ref(['Star'])
    const labels = ['All', 'Star', 'Completed'];
    
</script>

<style scoped>

.container-add-task{
    background-color: #DDEBDB;
    border-radius: 10px;
    padding: 10px 4px 10px 4px;
}
.title-todo{
    user-select:none;
    padding-left: 14px;
    font-size: 24px;
    font-weight: bold;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
    @/utils/userMangement@/stores/userCollectionStore@/utils/dateUtilities@/backup/userInfo