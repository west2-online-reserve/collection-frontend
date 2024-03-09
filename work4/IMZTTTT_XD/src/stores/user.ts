import { defineStore } from 'pinia';
import {ref} from 'vue'
interface user {
    userId: string,
    userName: string
    userPassword: string,
    avatarUrl: string,
    introduction: string
}
export const useUserStore = defineStore('user',()=>{
    const user = ref({} as user)
    const setUser = (currentUser)=>{
        user.value = currentUser
    }
    const removeUser = ()=>{
        user.value={} as user
    }
    return {
       user,setUser,removeUser
    }
}
,
//参数持久化
{
    persist:true
}
)