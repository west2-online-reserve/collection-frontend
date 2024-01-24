<template>
  <div class="register">
    <h2>Nice to meet you</h2>
    <form @submit.prevent="register">
      <label for="username">用户名</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">密码</label>
      <input type="password" id="password" v-model="password" required>
      <label for="email">邮箱</label>
      <input type="email" id="email" v-model="email" required>
      <button type="submit">注册</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useStore } from 'pinia'
import { ref } from 'vue'

export default {
  setup() {
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const email = ref('')
    const errorMessage = ref('')

    const register = () => {
      const usernamePattern = /^[a-zA-Z0-9_-]{6,}$/
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

      if (!usernamePattern.test(username.value)) {
        errorMessage.value = '用户名不规范。'
        return
      }

      if (!passwordPattern.test(password.value)) {
        errorMessage.value = '密码强度不行。'
        return
      }

      if (!emailPattern.test(email.value)) {
        errorMessage.value = '邮箱格式不正确。'
        return
      }

      const user = {
        username: username.value,
        email: email.value
      }
      store.commit('register', user)

      
      router.push('/todo')
    }

    return {
      username,
      password,
      email,
      errorMessage,
      register
    }
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  background-image: url('/assets/IMG_6075.JPG');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input {
  padding: 5px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>