<template>
  <div class="table">
    <h2>Table</h2>

    <div class="filters">
      <input type="text" v-model="searchText" placeholder="搜索待办事项">
      <input type="date" v-model="selectedDate">
    </div>

    <table>
      <thead>
        <tr>
          <th>内容</th>
          <th>创建时间</th>
          <th>完成时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in filteredTodos" :key="index">
          <td>{{ todo.content }}</td>
          <td>{{ formatDate(todo.createdAt) }}</td>
          <td>{{ todo.completedAt ? formatDate(todo.completedAt) : '-' }}</td>
          <td>
            <button @click="toggleCompleted(todo)">{{ todo.completed ? '取消' : '完成' }}</button>
            <button @click="edit(todo)">修改</button>
            <button @click="remove(todo)">删除</button>
          </td>
        </tr>
      </tbody>
      <EditDialog v-if="showEditDialog" v-model:editedTodoContent="editedTodoContent" />
    </table>
  </div>

  <div class="edit-dialog">
    <div class="edit-dialog-content">
      <input type="text" v-model="editedTodoContent">
      <button @click="saveEditedTodo">确认</button>
      <button @click="cancelEditTodo">取消</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'pinia'
import { ref, computed } from 'vue'

const store = useStore()
const searchText = ref('')
const selectedDate = ref('')
const showEditDialog = ref(false)
const editedTodoContent = ref('')
const editedTodo = ref(null)

const filteredTodos = computed(() => {
  let todos = store.todos

  if (searchText.value) {
    todos = todos.filter(todo => todo.content.includes(searchText.value))
  }

  if (selectedDate.value) {
    todos = todos.filter(todo => {
      const createdAt = new Date(todo.createdAt)
      const selected = new Date(selectedDate.value)
      return createdAt.toDateString() === selected.toDateString()
    })
  }

  return todos
})

const toggleCompleted = (todo) => {
  todo.completed = !todo.completed
  if (todo.completed) {
    todo.completedAt = new Date().toISOString()
  } else {
    todo.completedAt = null
  }
}

const edit = (todo) => {
  editedTodoContent.value = todo.content
  editedTodo.value = todo
  showEditDialog.value = true
}

const saveEditedTodo = () => {
  if (editedTodo.value) {
    editedTodo.value.content = editedTodoContent.value
  }
  showEditDialog.value = false
}

const cancelEditTodo = () => {
  showEditDialog.value = false
}

const remove = (todo) => {
  store.todos = store.todos.filter(item => item !== todo)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}

</script>

<style scoped>
.table {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.edit-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 9999;
}

.edit-dialog-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  padding: 5px 10px;
}

dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 9999;
}

dialog::backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
</style>