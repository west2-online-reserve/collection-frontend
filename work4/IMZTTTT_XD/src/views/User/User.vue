<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-page-header :icon="ArrowLeft" title="返回个人主页" @back="router.push('/UserCenter')">
                    <template #content>
                        <span class="text-large font-600 mr-3"> 个人资料 </span>
                    </template>
                </el-page-header>
            </el-header>
            <el-main>
                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="个人资料" name="first">
                        <div class="user">
                            <el-form label-width="150px" style="width: 900px;">
                                <el-form-item label="用户名">
                                    <el-input v-model="username" :placeholder="userInfo.userName" style="width: 900px;" />
                                </el-form-item>
                                <el-form-item label="个人简介">
                                    <el-input v-model="introduction" :rows="6" type="textarea"
                                        :placeholder="userInfo.introduction ? userInfo.introduction : '一句话个人简介'" />
                                </el-form-item>
                            </el-form>
                            <div class="userImg">
                                <el-avatar :size="80" :src="img"></el-avatar>
                                <el-upload class="avatar-uploader" action="http://47.120.41.47:8091/common/upload"
                                    :auto-upload="true" :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload" name="file"
                                    :headers="{ 'token': tokenStore.token }">
                                    <el-button style="margin-top: 10px;">上传头像</el-button>
                                    <template #tip>
                                        <div class="el-upload__tip text-red">
                                            格式：支持JPG、PNG、JPEG
                                            <br>
                                            大小：5M以内
                                        </div>
                                    </template>
                                </el-upload>
                                <el-button type="primary" @click="change()" size="large"
                                    style="margin-top: 90px;">确认修改</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="账户设置" name="second">
                        <div class="Reset" v-if="!isReset">
                            <span>密码</span>
                            <el-button type="primary" @click="isReset = true" size="large">重置</el-button>
                        </div>

                        <el-form label-width="150px" style="width: 900px;margin:0 auto;" v-model="passwordChange"
                            v-if="isReset">
                            <el-form-item label="原密码">
                                <el-input v-model="passwordChange.oldPassword" type="password"
                                    placeholder="请输入原密码" show-password />
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input v-model="passwordChange.newPassword" type="password"
                                    placeholder="请输入新密码" show-password />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="changePassword" size="large"
                                    style="margin: 0 auto;width:150px;font-size: 20px;">设置新密码</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref } from 'vue'
import { type TabsPaneContext } from 'element-plus'

const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
}
const username = ref('')
const introduction = ref('')
const isReset = ref(false)
import { useTokenStore } from '@/stores/token.ts'
const tokenStore = useTokenStore()
import { useUserStore } from '@/stores/user.ts'
const userStore = useUserStore()
const userInfo = userStore.user
import type { UploadProps } from 'element-plus'
// 上传头像
const img = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    img.value = URL.createObjectURL(uploadFile.raw!)
    userStore.setUser(userInfo)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

const passwordChange = ref({
    oldPassword: '',
    newPassword: '',
})
// 修改密码
import { ElMessage } from 'element-plus'
import { changePasswordSevrvice, getImgSevrvice, changeNameSevrvice, postIntrSevrvice } from '@/apis/user.js'
const changePassword = async () => {
    try {
        let result = await changePasswordSevrvice(passwordChange.value, tokenStore.token)
        userStore.user.userPassword = passwordChange.value.newPassword
        if (result.code === 1) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        } else {
            ElMessage({
                message: '密码错误',
                type: 'error',
            })
        }
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
// 修改名字
const changeName = async () => {
    try {
        let result = await changeNameSevrvice(username.value, tokenStore.token)
        userStore.user.userName = username.value
        if (result.code === 1) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            router.push('/UserCenter')
        } else {
            ElMessage({
                message: '修改失败',
                type: 'error',
            })
        }
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
// 修改简介
const postIntr = async () => {
    try {
        let result = await postIntrSevrvice(introduction.value, tokenStore.token)
        userStore.user.introduction = introduction.value
        if (result.code === 1) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            router.push('/UserCenter')
        } else {
            ElMessage({
                message: '修改失败',
                type: 'error',
            })
        }
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
// 获取头像
const getUserAvatar = async () => {
    try {
        let result = await getImgSevrvice(userStore.user.userId)
        img.value = window.URL.createObjectURL(result)
    } catch (err) {
        alert(err.message || "加载失败");
    }
}
if (userInfo.avatarUrl !== null) {
    getUserAvatar()
} else {
    img.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}

const change = () => {
    if (username.value.trim() === '' && introduction.value.trim() === '') {
        ElMessage.error('请先输入信息再提交')
        return false
    }
    if (username.value.trim() !== '') {
        changeName()
    }
    if (introduction.value.trim() !== '') {
        postIntr()
    }
}
</script>

<style scoped>
.common-layout {
    display: flex;
    align-items: center;


    .el-header {
        margin: 40px 40px 0 40px;
        display: flex;
        align-items: center;
        background-color: white;

        :deep(.el-page-header__title) {
            font-size: 20px
        }

        :deep(.el-page-header__content) {
            font-size: 20px
        }
    }



    .el-main {
        background-color: #f8f8f8;
        --el-main-padding: 0px 0px;
        margin: 40px;

        .el-tabs {
            height: 650px;
            font-size: 20px;
        }

        :deep(.el-tabs__nav-scroll) {
            background-color: #ffffff
        }

        :deep(.el-tabs__nav) {
            margin: 0 50px;
            margin-top: 20px;
        }

        :deep(.el-tabs__item) {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .el-form-item {
            margin: 80px 0;
        }

        .el-input {
            width: 700px;
            height: 40px;
        }

        :deep(.el-input__inner),
        :deep(.el-textarea__inner),
        :deep(.el-form-item__label) {
            font-size: 20px;
        }

        .Reset {
            width: 1000px;
            background-color: #fff;
            margin: 150px auto;
            font-size: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                margin-left: 10px;
            }

            .el-button {
                height: 60px;
                width: 120px;
                font-size: 24px;
            }
        }

        .user {
            display: flex;
            justify-content: space-around;


            .userImg {
                margin: 90px 60px 90px 0;
                text-align: center;

                .el-button {
                    font-size: 18px;
                }

            }
        }

    }

    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
}
</style>