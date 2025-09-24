<template>

<div class="main">
    <div class="container1">
        <el-calendar>
            <template #date-cell="{ data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }}
                    {{ data.isSelected ? '✔️' : '' }}
                </p>
            </template>
        </el-calendar>
        <div class="task">
            <h1>Task</h1>
            <div class="task-input">
                <textarea v-model="workContent" class="task-work" cols="30" rows="10"></textarea>
                <button class="btn" @click="submit" >添加至待办</button>
            </div>
            
        </div>
    </div>
    <div class="container2">
        <div class="head">
            <h3>待办</h3>
        </div>
        <ul class="works">
            <li class="work">{{ t[0] }}</li>
            <li class="work">{{ t[1] }}</li>
            <li class="work">{{ t[2] }}</li>
            <li class="work">{{ t[3] }}</li>
            <li class="work">{{ t[4] }}</li>
            <li class="work">{{ t[5] }}</li>
        </ul>
    </div>
</div>
    
</template>

<script setup>

import { ref } from 'vue';
import useUserStore from '../stores/userStore'

let workContent = ref("")
let user = useUserStore()
let t = []
if (user.length != 0)
{
    t = user.users[user.currentUser].needtodo
}
// else
// {
//     t = ["","","","","",""]
// }

console.log(t)

function submit (){
    
    if (workContent.value != "")
    {
        console.log("aasa")
        if (user.length != 0)
        {
            user.users[user.currentUser].addWork(workContent.value)
            if (user.users[user.currentUser].workNumber <= 6)
            {
                t[user.users[user.currentUser].workNumber-1] = workContent.value
            }
        }
        else{
            alert("无用户存在")
        }
        workContent.value = ""
    }
    else
    {
        alert("内容不能为空")
    }
}

</script>
  
<style>
    .main{
        display: flex;
        width: 800px;
        height: 550px;
    }

    .el-calendar__body{
        padding-bottom: 20px;
        padding-top: 0px;
    }

    thead{
        height: 50px;
    }

    .el-calendar-table .el-calendar-day{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
    }
  .is-selected {
    color: #1989fa;
  }
    .container1
    {
     width: 500px;
    }
  .task{
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
  .task-input{
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    width: 100%;
    
  }
  .task-work{
    width: 100%;
    height: 100px;
    border-radius: 5px;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    background-color: #d2ecd2;
    border-style: none;
  }
  .btn{
    height: 100px;
    width: 40px;
    font-size: 13px;
    background-color: #d2ecd2;
    border-radius: 5px;
    border-style: none;
  }
  .btn:hover {
  background-color: #b5dfb5;
}
.container2{
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-top: 50px;
    margin-left: 20px;
}

.works{
    width: 100%;
    padding-left: 0px;
}

.work{
    width: 100%;
    height: 50px;
    list-style-type: none;
    background-color: #d2ecd2;
    margin-top: 10px;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    line-height: 50px;
    font-size: 15px;
}

</style>