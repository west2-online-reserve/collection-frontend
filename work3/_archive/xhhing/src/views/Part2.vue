<template>

    <div class="part2">
        
        <div class="top">
            <p style="font-size: 20px;">待办</p>
            <div class="select">
                <el-date-picker v-model="value1" type="date" value-format="YYYY-MM-DD" placeholder="Pick a day" :size="size" />
                <el-input v-model="search" size="small" placeholder="Content to search" />
            </div>
            
        </div>
            <el-table :data="filterTableData" style="width: 100%">
                <el-table-column label="序号" prop="index" width="50px" />
                <el-table-column label="内容" prop="content" width="300px"/>
                <el-table-column label="创建时间" prop="creatTime" />
                <el-table-column label="完成时间" prop="finishTime" />
                <el-table-column align="right" width="200px" label="操作">
                <!-- <template #header>
                    

                </template> -->
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">完成</el-button>
                    <el-button size="small" @click="handleRevise(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        
    </div>
    
  </template>
  
<script setup>

import { computed, ref } from 'vue'
import useUserStore from '@/stores/userStore';

let user = useUserStore()

const search = ref('')
const value1 = ref('')
const size = 'small'
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) => (!search.value && !value1.value) || 
            (data.content.toLowerCase().includes(search.value.toLowerCase()) && !value1.value) ||
            (data.day == value1.value && !search.value) ||
            (data.content.toLowerCase().includes(search.value.toLowerCase()) && data.day == value1.value)
  )
)
const handleEdit = (index, row) => {
    if (user.users[user.currentUser].works[index].finishTime == '未完成')
    {
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);

        const formattedTime = year + '-' + month + '-' + day  + ' ' + hours + ':' + minutes;
        user.users[user.currentUser].works[index].finishTime = formattedTime

        const content = user.users[user.currentUser].works[index].content
        const result2 = user.users[user.currentUser].needtodo.filter(
            (data) => data != content
        )
        for (let i=0; i<6; i++)
        {
            user.users[user.currentUser].needtodo[i] = result2[i]
        }
    }
    else
    {
        alert("已完成")
    }
}

const handleRevise = (index, row) => {
   
}

const handleDelete = (index, row) => {
    const content = user.users[user.currentUser].works[index].content

    const result1 = user.users[user.currentUser].works.filter(
        (data) => data.index-1 != index
    )
    user.users[user.currentUser].works = result1
    user.users[user.currentUser].workNumber--
    for (let i=0; i<user.users[user.currentUser].workNumber; i++)
    {
        user.users[user.currentUser].works[i].index = i+1
    }
    tableData.value = user.users[user.currentUser].works

    const result2 = user.users[user.currentUser].needtodo.filter(
        (data) => data != content
    )
    for (let i=0; i<6; i++)
    {
        user.users[user.currentUser].needtodo[i] = result2[i]
    }
}

let tableData = ref([])

if (user.length != 0)
{
    tableData.value = user.users[user.currentUser].works
}

 
</script>

<style scoped>
.part2{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 550px
}

.top{
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 20px;
}
.select{
    display: flex;
    margin-left: 30px;
}

</style>