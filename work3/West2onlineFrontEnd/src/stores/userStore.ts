// userStore.ts
//interface
import { type UserInfo, type LoginStatus} from '@/types/userInfo';

import { reactive } from 'vue';
import { defineStore } from 'pinia'

export const useUserStore =  defineStore('user-of-schedule', () =>{
    // 用户数据
    const userInfo = reactive<UserInfo>({
        id: undefined,
        username: '',
        password: '',
        email: '',
    });
    
    // 登录状态
    const loginStatus = reactive<LoginStatus>({
        isLoggedIn: undefined,
        noLoginAgain: undefined,
        checkedDate: undefined,
    })

    // 注册
    // 设置用户数据
    // 并后续导入用户数据组
    const registerAccount = (user: UserInfo):void => {
        userInfo.id = user.id;
        userInfo.username = user.username;
        userInfo.password = user.password;
        userInfo.email = user.email;

        // localStorage.setItem('user-of-schedule', JSON.stringify(userInfo));
    };

    // 清除用户数据
    // 并后续删除用户组中数据
    const clearAccount = () :void=> {
        userInfo.id = undefined;
        userInfo.username = undefined;
        userInfo.password = '';
        userInfo.email = '';

        localStorage.removeItem('user-of-schedule');
    };

    // 退出登录
    const logoutAccount = () => {
        loginStatus.isLoggedIn = false;
        loginStatus.noLoginAgain = false;
        loginStatus.checkedDate = undefined;
    };

    // 时间检测
    const checkDate = (Date:any) => {
        console.log(Date, "上次免登录时间");
        return false;
    }

    // 自动登录
    // 综合考虑 1.是否免登录 2.免登录是否超时 3用户数据是否正确
    const autoLogin = () => {
        // 页面加载时检查localStorage是否有保存的用户数据
        const savedUser = localStorage.getItem('user');
        if (savedUser) return;
        
        const savedUserInfo = JSON.parse(savedUser as string);
        const {isLoggedIn, noLoginAgain, checkedDate } =  savedUserInfo.loginStatus

        if (!isLoggedIn) {
            return;
        } else if (!noLoginAgain){
            loginStatus.isLoggedIn = false;
            return;
        } else if (!checkDate(checkedDate)) {
            loginStatus.isLoggedIn = false;
            loginStatus.noLoginAgain = false;
            loginStatus.checkedDate = undefined;
            return;
        } else {
            // 跳转主页面
            console.log('to homepage!');
        }
    }

    // 更新信息
    const updateInfo = (user: UserInfo) => {

    }

    return {
        userInfo,
        loginStatus,
        registerAccount,
        clearAccount,
        logoutAccount,
        autoLogin,
    };
})
