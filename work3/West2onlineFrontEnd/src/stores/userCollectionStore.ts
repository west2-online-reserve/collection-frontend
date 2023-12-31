// userCollectionStore.ts
// interface 
import { type UserInfo, type UserInfoCollection} from '@/types/userInfo';
// Store
import { useUserStore } from './userStore';
import { defineStore } from 'pinia';

import { v4 as uuidv4 } from 'uuid';
import { ref, reactive } from 'vue';

export const useUserModule = defineStore('userCollection', ()=>{
    const userCollection = reactive<UserInfoCollection>([]);
    
    const { setUser, clearUser } = useUserStore();

    const getters = {
        getUserById: (id:string) => {
            return userCollection.users.find((user) => user.id === id);
        },
    };

    const addUser = (user:UserInfo) => {
        const newUser = { ...user, id: uuidv4() };
        userCollection.users.push(newUser);
    };
    
    const removeUser = (id:string) => {
        userCollection.users = userCollection.users.filter((userCollection) => user.id !== id);
    };
    
    return {
        userCollection,
        getters,
        addUser,
        removeUser,
        setUser,
        clearUser,
    };
});
