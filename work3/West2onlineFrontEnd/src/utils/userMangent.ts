import { ref, reactive } from 'vue';
//interface
import { type RuleForm, type UserInfo, type LoginStatus} from '@/types/userInfo';
// store
// import { useUserStore } from '@/stores/userStore';
import { useUserCollectionStore } from '@/stores/userCollectionStore';
import { v4 as uuidv4 } from 'uuid';

import {ElMessage} from 'element-plus'

const { registerAccount, addAccountToCollection, } = useUserCollectionStore();

// update the userInfo
export function updateUserInfo (ruleForm: RuleForm, userInfo: UserInfo, idOption=false)
{
    if(idOption) userInfo.id = uuidv4();
    userInfo.username = ruleForm.username;
    userInfo.password = ruleForm.password;
    userInfo.email = ruleForm.email;
}

// 注册用户, 并将用户信息存入localStorage
export function registerAccountToLocalStorage (userInfo: UserInfo)
{
    addAccountToCollection(registerAccount(userInfo));
}


