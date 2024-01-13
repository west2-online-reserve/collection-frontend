<script lang="ts" setup>
import { ref } from 'vue'
import { userStore } from '../../stores/userStore';
import {
    ElAvatar, ElHeader, ElForm,
    ElFormItem, ElContainer, ElCard,
    ElInput, ElButton, FormInstance,
    ElMessage,
} from 'element-plus';
const user = userStore();

//Todo：编辑用户信息和头像
const newuser = ref({
    id: 0,
    username: '',
    email: '',
    sex: '',

})

// 操作成功失败的消息提示
const Editerror = () => {
    ElMessage.error('输入不能为空，请输入！')
}
const Deletesuccess = () => {
    ElMessage({
        message: '删除成功',
        type: 'success',
    })
}
const Editsuccess = () => {
    ElMessage({
        message: '修改成功',
        type: 'success',
    })
}

// 修改pinia内存储的待办信息
const editUserName = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            user.EditUserNameById(newuser.value.id, newuser.value.username);
            Editsuccess();
        } else {
            Editerror();
            return false;
        }
    });
};

const currentDate = ref(new Date())
</script>


<template>
    <div style=" width:1400px;background-color: #f4f7f4;">
        <el-card :body-style="{ padding: '0px' }" style="height:90vh;width:80vh;margin-left: 35vh;">
            <img src="../../assets/img/avatar1.jpg" class="image" />

            <div style="padding: 14px">
                <div> 用户名：{{ user.getusername() }}</div>
                <div> 邮箱： {{ user.getEmail() }}</div>
                <div class="bottom">
                    <time class="time">{{ currentDate }}</time>
                </div>
            </div>

        </el-card>
       
    </div>
</template>

<style>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    height: 20%;
    display: block;
}
</style>
