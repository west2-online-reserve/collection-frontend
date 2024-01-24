<template>
  <div class="todo-list">
    <h2>待办事项</h2>

    <div class="add-todo">
      <input type="text" v-model="content" placeholder="请输入待办事项">
      <button @click="addTodo">添加</button>
    </div>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo.content }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from 'pinia'
import { ref } from 'vue'

const store = useStore()
const content = ref('')
const todos = store.todos

const addTodo = () => {
  if (content.value) {
    store.add({ content: content.value, createdAt: new Date().toISOString(), completed: false })
    content.value = ''
  }
}
</script>

<style scoped>
.todo-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>