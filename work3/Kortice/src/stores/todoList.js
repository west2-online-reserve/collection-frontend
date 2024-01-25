import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTodoListStore = defineStore('todoList', ()=>{
  // 数据
  const todoList = reactive([])

  // 方法

  // 增加todo
  const addNewTodo = (todoObj) => {
    todoList.push(todoObj)
  }

  // 完成todo
  const handleCompelete = id => {
    todoList.forEach(todo => {
      if (todo.id === id) {
        todo.isDone = true
        let time = new Date()
        time = time.toLocaleDateString('zh-CN') + ' ' + time.getHours() + ':' + (time.getMinutes() >= 10 ? '' : '0') + time.getMinutes()
        todo.completionTime = time
      }
    })
  }

  // 修改todo
  const handleEdit = (id, value) => {
    todoList.forEach(todo => {
      if (todo.id === id) {
        todo.todoThing = value
      }
    })
  }

  // 删除todo
  const handleDelete = id => {
    todoList.forEach((todo, index) => {
      if (todo.id === id) {
        todoList.splice(index, 1)
        ElNotification({
          title: 'Success',
          message: '删除成功！',
          type: 'success',
        })
      }
    })
  }

  // 返回相关的数据
  return {
    todoList,
    addNewTodo,
    handleCompelete,
    handleEdit,
    handleDelete
  }

}, {
  persist:true
})
