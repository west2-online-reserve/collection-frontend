<template>
<div class="box">
    <div class="banner">
        <div class="command1">
            <RouterLink class="link1" to="/todolist/part1">todolist</RouterLink>
            <RouterLink class="link2" to="/todolist/part2">表格</RouterLink>
        </div>
        
        <div class="command2">
            <p class="userEmail">{{ email }}</p>
            <RouterLink class="link3" to="/home">退出</RouterLink>
        </div>
        

    </div>
    <div class="main">
        <RouterView />
    </div>

</div>

</template>

<script setup>

import { RouterLink  } from 'vue-router';
import useUserStore from '@/stores/userStore';
import { ref } from 'vue';

let user = useUserStore()
let n = user.currentUser
let email = ref("")

if (n === -1)
{
    email = "noUser"
}
else
{
    email = user.users[n].email
}

</script>

<style>

.box{
    display: flex;
    flex-direction: column;
}

.banner{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
    height: 40px;
    background-color:#c4e6c4;
}

.command2{
    display: flex;
    align-items: center;
    justify-content: space-around;
    height:100%
}

.command1{
    display: flex;
    align-items: center;
    justify-content: space-around;
    height:100%
}


.link1{
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    vertical-align:middle;
    color: black;
    font-size: 17px;
    /* height: 100%; */

}

.link2{
    padding-left: 10px;
    padding-right: 10px;
    color: black;
    text-align: center;
    /* height: 100%; */
}

.userEmail{
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    color: black;
    font-size: 17px;
    /* height: 100%; */
}

.link3{
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    color: black;
    /* height: 100%; */
}

</style>