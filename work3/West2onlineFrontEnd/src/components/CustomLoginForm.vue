<!-- CustomLoginForm.vue -->
<!-- 实现登录表单的复用 -->
<template>
    <div class="login-form">

        <h1 class="title">Welcome back</h1>
        <h2 class="tip">Please enter your details</h2>
        
        <el-form 
            :inline="false" label-position="top" label-width="120px" :size="formSize" 
            ref="ruleFormRef" :model="userInfoform" :rules="rules"
            class=""
        >
            <!-- Username -->
            <el-form-item label="User Name" prop="username" 
                class="form-labels"
            >
                <el-input v-model="userInfoform.username" maxlength="10" placeholder="Please input your username" clearable />
            </el-form-item>

            <!-- Password -->
            <el-form-item label="Password" prop="password"
                class="form-labels"
            >
                <el-input v-model="userInfoform.password" placeholder="Please input your password" clearable show-password/>
            </el-form-item>

            <!-- Login options -->
            <el-form-item label="Login Options"  prop=""
                class="form-labels"
            >
                <el-row justify="space-between" class="expand">
                    <!-- :span="12" :offset="0" -->
                    <el-col :span="12">
                        <el-checkbox v-model="userInfoform.noLoginAgain" label="No login for 30 days" class="label-no-login"/>
                    </el-col>
                    <el-col :span="8.5">
                        <!-- TODO: 重设密码 -->
                        <el-button type="primary" text @click="onResetPassword" class="button-reset-password">Reset Password</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

            <!-- Log in -->
            <el-form-item label="" prop=""
                class="form-labels"
            >
                <!-- TODO: 登录 -->
                <el-button type="primary" color="#456442" @click="onAccountLogin(ruleFormRef)" class="button-login" >Log in</el-button>
            </el-form-item>

            <!-- Create account -->
            <el-form-item label="" prop=""
                class="form-labels"
                >
                <el-row justify="center" class="expand">
                    <!-- TODO: 创建账户 -->
                    <span class="label-no-account">No account?</span><el-button type="primary" @click="onCreateAccount" text class="button-create-one">Create one?</el-button>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>
    
<script setup lang="ts" name="CustomLoginForm"> 
    //interface
    import {type RuleForm, type UserInfo, type UserInfoCollection} from '@/types/userInfo';
    // store
    import {useUserStore} from '@/stores/user';
    import {storeToRefs} from 'pinia' 

    import { ref, reactive } from 'vue';
    // import { Search } from '@element-plus/icons-vue';
    import type { FormInstance, FormRules } from 'element-plus';

    import { useRouter } from 'vue-router';



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
        email: '',
    })

    const rules = reactive<FormRules<RuleForm>>({
        username: [
            { required: true, message: 'Please input your Username', trigger: 'submit' },
            // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        password: [
            {required: true, message: 'Please input Your Password', trigger: 'submit'},
        ],
    });

    const onCreateAccount = () =>{
        console.log('CreateAccount!');
        router.replace({
            name: 'register',
        });
    };

    const onResetPassword = () =>{
        console.log('ResetPassword!');
        router.replace({
            name: 'reset-password',
        });
    };

    const onAccountLogin = async (formEl: FormInstance | undefined) => {
        if (!formEl) 
            return 
            {
                await formEl.validate((valid, fields) => {
                    if (valid) {
                        console.log('submit!')
                    } else {
                        console.log('error submit!', fields)
                    }
                })
            }
    }

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

    .label-no-login{
        font-family: Inter;
        font-style: normal;
        font-weight: 700;
        color: #3D565A;
        line-height: 1;
        font-size: var(--el-checkbox-font-size);
    }
    

    .button-reset-password, .button-create-one{
        text-align: right;
        color: #3D565A;
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    .button-login{
        width: 100%;
        color: #FEFFFF;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
    }
    .label-no-account{
        font-family: Inter;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;

        color: #3D565A;
    }
</style>
    