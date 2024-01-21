import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const userStore = defineStore('localStorage', () => {
  // const userName = ref("")
  // const userPassword = ref("")
  // const userEmail = ref("")
  let length = ref(0);
  let users = Array()

  function add(userName, userEmail, userPassword)
  {
    let newuser = {
      name : userName,
      password : userPassword,
      email : userEmail
    }
    users.push(newuser)
    length++
    console.log(length)
  }

  return { users, length, add}
})

export default userStore
