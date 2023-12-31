<!-- CustomLoginForm.vue -->
<!-- 实现登录表单的复用 -->
<template>
    <div class="login-form">

        <h1 class="title">Nice to  meet you</h1>
        <h2 class="tip">Please enter your details</h2>
        
        <el-form 
            :inline="false" label-position="top" label-width="120px" :size="formSize" 
            ref="ruleFormRef" :model="ruleForm" :rules="rules"
            class=""
        >
            <!-- Username -->
            <el-form-item label="User Name" prop="username" 
                class="form-labels"
            >
                <el-input v-model="ruleForm.username" placeholder="Please input your username" clearable />
            </el-form-item>

            <!-- Email -->
            <el-form-item label="Email" prop="email" 
                class="form-labels"
            >
                <el-input v-model="ruleForm.email" placeholder="Please input your email" clearable />
            </el-form-item>

            <!-- Password -->
            <el-form-item label="Password" prop="password"
                class="form-labels"
            >
                <el-input v-model="ruleForm.password" placeholder="Please input your password" clearable show-password/>
            </el-form-item>

            <!-- Register -->
            <el-form-item label="" prop=""
                class="form-labels"
            >
                <!-- TODO: 注册 -->
                <el-button type="primary" color="#456442" @click="onRegisterAccount(ruleFormRef)" class="button-register" >Register</el-button>
            </el-form-item>

            <!-- return -->
            <el-form-item label=" " prop=""
                class="form-labels"
            >
                <!-- TODO: 返回登录页 -->
                <el-button type="primary" color="transparent" @click="onReturnToLogin" class="button-return-to-login" >Return</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
    
<script setup lang="ts" name="CustomLoginForm"> 
    import { ref, reactive } from 'vue';
    //interface
    import {type RuleForm, type UserInfo, type UserInfoCollection} from '@/types/userInfo';
    // store
    import {useUserStore} from '@/stores/user';
    import {storeToRefs} from 'pinia' 
    // router
    import { useRouter } from 'vue-router';

    // import { Search } from '@element-plus/icons-vue';
    import type { FormInstance, FormRules } from 'element-plus';

    const userStore = useUserStore();

    let router = useRouter();

    const formSize = ref('default');
    const ruleFormRef = ref<FormInstance>();

    // the info of user
    const userInfoform = reactive<UserInfo>({
      username: '',
      password: '',
      email:'',
      noLoginAgain: false,
      checkedDate: '',
    })

    // the information in form to be validated
    const ruleForm = reactive<RuleForm>({
        username: '',
        password: '',
        confirmed: '',
        email:'',
    })

    // the rules of validation

    const regexpValidatePass = (rule: any, value: any, callback: any) => {
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$/;
        if (value === '') {
            callback(new Error('Please input the password'))
        } else {
            if( !regExp.test(ruleForm.password)){
                callback(new Error('Must have both upper and lower case letters!'));
            } else {
                callback();
            }
        }
    }

    const regexpValidateEmail = (rule: any, value: any, callback: any) => {
        const regExpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regExpEmail.test(ruleForm.email as string)) {
                callback(new Error('Formatting error!'));
            } else {
                callback();
            }
    }

    const rules = reactive<FormRules<RuleForm>>({
        // 用户名：
        // 1. 不能为空 0
        // 2. 用户名不小于6 0
        // 3. 不能和已有的重复
        username: [
            { required: true, message: 'Please input your Username', trigger: 'blur' },
            { min: 6, max: 20, message: 'Length should be greater than 6', trigger: 'blur' },
            
        ],
        // 密码：
        // 1. 不能为空 0
        // 2. 必须有大小写字母 0
        // 3. 长度不小于8 0
        password: [
            { required: true, message: 'Please input Your Password', trigger: 'blur'},
            { min: 8, max: 20, message: 'Length should be greater than 8', trigger: 'blur' },
            { validator: regexpValidatePass, trigger: 'blur'},
        ],
        // 邮箱：
        // 1.不能空 0
        // 2. 格式正确 0
        email:[
            { required: true, message: 'Please input Your Email', trigger: 'blur'},
            { validator: regexpValidateEmail, trigger: 'blur'},
        ]
    });

    // register
    const onRegisterAccount = async (formEl: FormInstance | undefined) => {
        if (!formEl) 
            return 
            {
                await formEl.validate((valid, fields) => {
                    if (valid) {
                        userStore.register(userInfoform);
                        console.log('submit!')
                    } else {
                        console.log('error submit!', fields)
                    }
                })
            }
    }

    // return to login page
    const onReturnToLogin = () =>{
        router.replace({
            name: 'login',
        })
    };

</script>

<style>
    .el-form--default.el-form--label-top .el-form-item .el-form-item__label{
        margin-bottom: 0px;
        margin-top: 12px;
    }
    .label-no-login .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #3D565A; 
    }
    .el-checkbox{
        --el-checkbox-input-border: var(--el-border-width) var(--el-border-style) #3D565A;
    }
    .el-input {
    --el-input-border-color: #426440;
    }
</style>
<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    button{
        padding-right: 2px;
        padding-left: 2px;
    }
    .expand{
        width: 100%;
    }

    .login-form{
        margin: 0 auto;
        padding: 6px;
        width: 300px;
        background-color: #FAFCF9;
    }
    .form-labels{
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        color: #3D565A;
    }

    .title{
        text-align: center;
    
        
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        color: #426440;
    }
    .tip{
        text-align: center;

        font-family: Inter;
        font-style: normal;
        font-size: 15px;
        font-weight: 700;
        line-height: normal;
        color: #3D565A;
    }

    .button-register{
        width: 100%;
        color: #FEFFFF;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        margin-top: 20px;
    }

    .button-return-to-login{
        color: #989898;
    }
</style>
    