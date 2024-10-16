import { defineStore } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { ref,reactive } from 'vue';
export const useUserStore = defineStore('user', () => {
    const registerDataList= ref([])
    const loginData= ref()
    // 存储注册用户数据
    function addRegisterData(data) {
        this.registerDataList.push({ ...data });
    }
    // 登录信息与存储数据对比校验
    function logincheck(username, password) {
        return this.registerDataList.find(
            (user) => user.username === username && user.password === password
        );
    }
    // 获取登录信息
    function setLoginData(data) {
        this.loginData = { ...data };
    }
    // 获取登录用户名
    function getusername() {
        return this.loginData.username
    }
    // 退出时清空登录信息
    function clearlogin() {
        this.loginData.username = ''
        this.loginData.email = ''
        this.loginData.password = ''
    }
    return {registerDataList,loginData,addRegisterData,logincheck,setLoginData,getusername,clearlogin}
},
{
    persist: true,
  }
  );