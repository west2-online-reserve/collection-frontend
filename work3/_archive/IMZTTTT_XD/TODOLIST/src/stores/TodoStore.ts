import { defineStore } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
interface todo{
    id:number,
    content: string,
    time: string[],
    completed:boolean
}
export const useTodoStore = defineStore('todo', {
    state: () => ({
        todolistStore: [] as todo[],
        completeStore:[] as todo[]
    }),

    actions: {
        // 添加待办
        addtodolist(data) {
            this.todolistStore.push({ ...data });
        },
        // 修改待办
        EditTodoById(id,content) {
            this.todolistStore[id].content = content;
        },
        // 完成待办
        completelist(data){
            this.completeStore.push({ ...data });
        }

    },
    persist: true,
});