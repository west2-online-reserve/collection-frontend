<script  lang='ts' setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { type FormInstance, ElMessage } from 'element-plus'
const router = useRouter()

//控制注册与登录表单的显示， 默认显示注册
const ruleFormRef = ref<FormInstance>()


// 定义表单校验规则
const rules = reactive({
    username: [
        { required: true, message: "必填" },
        { min: 6, message: '用户格式无效', trigger: 'blur' }
    ],
    password: [
        { required: true, message: "必填" },
        {
            pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@#!%^*?&+-]{8,}/,
            message: '密码格式无效', trigger: 'blur'
        }
    ]
})

//定义注册信息数据类型
const registerData = reactive({
    username: '',
    password: ''
})

// 用来跳转登录和注册
const isRegister = ref(true);

// 一些消息提示
const Registsuccess = () => {
    ElMessage({
        message: '注册成功',
        type: 'success',
    });
}
const Loginsuccess = () => {
    ElMessage({
        message: '登陆成功',
        type: 'success',
    })
}
const Loginerror = () => {
    ElMessage.error('用户用户名或密码错误')
}

// 用户注册，校验是否符合规则
import { userRegisterSevrvice, userLoginSevrvice } from '../apis/user.js'

const register = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (vaild) => {
        try {
            if (vaild) {
                let result = await userRegisterSevrvice(registerData)
                if (result.code === 1) {
                    Registsuccess();
                    activeIndex.value = '1';
                    isRegister.value = false;
                } else {
                    ElMessage.error('用户名已存在')
                }
            }
            else {
                Loginerror()
            }
        } catch (err) {
            Loginerror()
        }
    });
};
//导入token状态
import { useTokenStore } from '@/stores/token.js'

//调用useTokenStore得到状态
const tokenStore = useTokenStore();
// 用户登录，并校对登录信息是否正确，然后储存到pinia
const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (vaild) => {
        try {
            if (vaild) {
                let result = await userLoginSevrvice(registerData)
                tokenStore.setToken(result.data.token)
                if (result.code === 1) {
                    Loginsuccess();
                    router.push('/menu')
                } else {
                    Loginerror();
                    return false
                }
            } else {
                Loginerror();
                return false
            }
        } catch (err) {
            Loginerror()
        }
    });
};


// 清空注册数据
const clearRegisterData = () => {
    registerData.username = ''
    registerData.password = ''
}

const activeIndex = ref('2')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<template>
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="isRegister = false">登录</el-menu-item>
            <el-menu-item index="2" @click="isRegister = true; clearRegisterData()">注册</el-menu-item>
        </el-menu>
    </el-header>
    <el-container class="bg">
        <el-aside width="700px">
            <img src="../assets/image 2.png" alt="">
        </el-aside>
        <el-main>
            <!-- 注册表单 -->
            <el-form ref="ruleFormRef" autocomplete="off" v-if="isRegister" label-width="100px" :model="registerData"
                :rules="rules">
                <el-form-item prop="username"  label="用户名">
                   <el-input placeholder="用户名长度不小于6位" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" style="margin-top:80px;"  label="密码">
                   <el-input placeholder="密码长度不小于8位，同时包含大小写" v-model="registerData.password" type="password" show-password="true"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register(ruleFormRef)">
                        注册
                    </el-button>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="ruleFormRef" autocomplete="off" v-else label-width="100px" :model="registerData" :rules="rules">
                <el-form-item prop="username"  label="用户名">
                   <el-input placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" style="margin-top:80px;" label="密码">
                    <el-input name="password" type="password" placeholder="请输入密码" v-model="registerData.password"
                        style=" margin:auto;" show-password="true"></el-input>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<style lang="scss" scoped>
.bg {
    height: 91vh;
}

.el-header {
    height: 36px;
    padding: 0;
    --el-header-padding: 0;
    font-size: 20px;
}
.el-main{
    --el-main-padding: 0px;
}
.el-menu-item {
    margin-left: 50px;
    width: 80px;
    font-size: 18px;
    box-sizing: border-box;
    
}
.el-input {
    margin: 0 auto;
    font-size: 18px;
    height: 70px;
    width: 600px;
}

.el-button {
    margin: 80px auto;
    height: 50px;
    font-size: 24px;
}

.el-form {
    margin-top: 300px;
    :deep(.el-form-item) {
        --font-size: 24px;
        display: flex;
        align-items: center;
        .el-form-item__label{
            font-size: 24px;
        }
        .el-form-item__error{
            padding-left: 60px;
            padding-top: 10px;
            font-size: 16px;
        }
    }
}


img {
    position: relative;
    left: 128px;
    top: 320px;
}
</style>
