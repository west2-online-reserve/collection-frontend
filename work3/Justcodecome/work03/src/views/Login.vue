<template>
  <div class="login">
    <h2>Welcome</h2>
    <form>
      <label for="username">用户名</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">密码</label>
      <input type="password" id="password" v-model="password" required>
      <router-link to="/todo" tag="button">登录</router-link>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p>还没有账号?|<router-link to="/register">注册</router-link></p>
  </div>
</template>

<script>
import { useStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const register = () => {
      router.push('/register')
    }

    return {
      username,
      password,
      errorMessage,
      login,
      register
    }
  }
}
</script>

<style scoped>
.login {
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