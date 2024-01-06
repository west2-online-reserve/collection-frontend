// todolistStore.ts

import { reactive } from 'vue';
//interface
import { type TodoItem, type TodoList } from '@/types/todoList';
// store
import { defineStore } from 'pinia'

// test mode
const TESTMODE = true;

export const useTodoListStore =  defineStore('todolist', () =>{
    
    const todoList = reactive<TodoList>([]);

    
    

    return {

    };
    }
);