import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', {
  state:() => {
  
  let length = ref(0);
  let users = ref(Array())
  let currentUser = ref(-1)

  function add(userName, userEmail, userPassword)
  {
    let t1 = ref("")
    let t2 = ref("")
    let t3 = ref("")
    let t4 = ref("")
    let t5 = ref("")
    let t6 = ref("")
    let t = [t1, t2, t3, t4, t5, t6]

    let newuser = {
      index:length.value-1,
      name : userName,
      password : userPassword,
      email : userEmail,
      works : ref(Array()),
      workNumber : ref(0),
      addWork : addWork,
      needtodo : t
    }
    users.value.push(newuser)
    length.value++
    console.log(length)
    console.log(users)
  }

  function addWork(work_Content) {
    if (currentUser.value === -1)
    {
      alert("无用户存在")
    }
    else{
      users.value[currentUser.value].workNumber++

      const now = new Date();
  
      const year = now.getFullYear();
      const month = ('0' + (now.getMonth() + 1)).slice(-2);
      const day = ('0' + now.getDate()).slice(-2);
      const hours = ('0' + now.getHours()).slice(-2);
      const minutes = ('0' + now.getMinutes()).slice(-2);
  
      const formattedTime = year + '-' + month + '-' + day  + ' ' + hours + ':' + minutes;
      const my_day = year + '-' + month + '-' + day
      let work = {
        index:users.value[currentUser.value].workNumber,
        content:work_Content,
        creatTime:formattedTime,
        day :my_day,
        finishTime:"未完成"
      }
      users.value[currentUser.value].works.push(work)
    }
  }

  function update(index)
  {
    currentUser.value = index
  }

  return { users, length, currentUser, update, add}
},
  persist:true,
})

export default useUserStore
