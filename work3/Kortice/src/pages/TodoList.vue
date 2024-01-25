<template>
  <div class="container">
    <!-- 上层导航栏 -->
    <div class="header">
      <div class="nav">
        <RouterLink to="/todolist" active-class="active" >TodoList</RouterLink>
        <RouterLink to="/todoform" active-class="active" >表格展示</RouterLink>
      </div>
      <div class="account">
        <span>{{ accountUsername }}</span>
        <RouterLink to="/home/login" @click="exit">退出</RouterLink>
      </div>
    </div>
    <div class="outer">
      <!-- 页面左侧 -->
      <div class="left">
        <!-- 日历 -->
        <MyCalendar :dateSelect="dateSelect"/>
        <!-- 添加待办 -->
        <div class="add-task">
          <span class="title">Task</span>
          <div class="add-area">
            <textarea placeholder="请输入今日任务..." class="input-textarea" v-model="taskDetail"></textarea>
            <button class="add-task-btn" @click="addTodo"><div class="btn-text">添 加 至 待 办</div></button>
          </div>
        </div>
      </div>
      <!-- 页面右侧 -->
      <div class="right">
        <el-container class="container">
          <el-header class="header">
            <span class="title">待办</span>
            <div>
              <Search class="svg"/>
              <Star class="svg"/>
            </div>
          </el-header>
          <el-main class="main">
            <el-scrollbar max-height="600px" >
              <el-empty description="暂无待办" v-show="!todoList[0]" />
              <el-row v-for="todo in todoList" :key="todo.id" >
                <el-col :span="24">
                  <el-card shadow="hover">
                    <div class="Ellipse"></div>
                    <span>{{ todo.todoThing }}</span>
                  </el-card>
                </el-col>
              </el-row>
            </el-scrollbar>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script setup>
  name:'TodoList'
  components:{MyCalendar}

  import { RouterLink, useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { useAccountsStore } from '../stores/accounts.js'
  import { useTodoListStore } from '../stores/todoList.js'
  import { storeToRefs } from 'pinia'
  import { nanoid } from 'nanoid'
  import MyCalendar from '../components/MyCalendar.vue'
    
  // 数据
  const router = useRouter()
  let taskDate = ref(new Date())
  let taskDetail = ref('')
  let accountUsername = JSON.parse(localStorage.getItem('loginAccount')).username

  // pinia里面的数据
  const accountsStore = useAccountsStore()
  const {accounts} = storeToRefs(accountsStore)
  const todoListStore = useTodoListStore()
  const { todoList } = todoListStore

  //方法
  function dateSelect(selectDate) {
    taskDate.value = selectDate
  }

  // 添加todo

  function addTodo() {
    // 打包新的todoObj
    const todoObj = {
      id:nanoid(),
      todoThing:taskDetail.value,
      creationTime:taskDate.value.toLocaleDateString('zh-CN') + ' ' +  taskDate.value.getHours() + ':' + (taskDate.value.getMinutes() >= 10 ? '' : '0') + taskDate.value.getMinutes(),
      completionTime:'暂未完成',
      isDone:false
    }
    todoListStore.addNewTodo(todoObj)
    taskDetail.value = ''
  }

  // 退出弹窗提示
  function exit() {
    ElMessage({
      message: '退出成功！',
      type: 'success',
    })
    router.replace({
      path:'/'
    })
  }

</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .active {
    font-size: 20px;
    font-weight: 800;
    line-height: 24px;
    color: #11240E;
  }
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    height: 10vh;
    background-color: #DDEBDB;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
  .nav a,
  .account a {
    color: #11240E;
  }
  .account a {
    color: #263924;
  }
  .header .nav a:first-child,
  .header .account a {
    margin: 0 60px;
  }
  .outer {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: space-between;
    background-color: #FAFCF9;
  }
  .left {
    width: 50%;
    background-color: #FAFCF9;
    display: flex;
    flex-direction: column;
  }
  .left :deep(*) {
    --el-calendar-border:0 ;
    --el-calendar-cell-width:31px;
    --el-calendar-selected-bg-color:none;
    --el-text-color-regular: #11240E;
  }
  .calendar,
  .add-task {
    margin-left: 60px;
    margin-top: 60px;
  }
  .calendar {
    width: 409.73px;
    height: 343.84px;
  }
  .calendar :deep(.el-calendar-day) {
    height: 31px;
  }
  .calendar :deep(.calendar-header) {
    font-size: 32px;
    font-weight: 800;
    line-height: 39px;
  }
  .calendar :deep(.p) {
    width: 31px;
    margin-left: 11px;
    margin-top: 1px;
    line-height: 29px;
  }
  .add-area {
    display: flex;
    align-items: center;
  }
  .add-task {
    display: flex;
    flex-direction: column;
  }
  .add-task .title {
    font-size: 32px;
    font-weight: 800;
    line-height: 39px;
    color: #11240E;
  }
  .add-task .input-textarea {
    width: 420px;
    height: 215px;
    border-radius: 10px;
    background-color: #DDEBDB;
    border: none;
    padding: 20px;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    resize: none;
    color: #B4AEAE;
  }
  .add-task-btn {
    width: 78px;
    height: 215px;
    border-radius: 10px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    background-color: #DDEBDB;
    border: none;
    cursor: pointer;
  }
  .btn-text {
    margin: 0 auto;
    writing-mode: vertical-lr;
  }
  .right {
    width: 50%;
    background-color: #FAFCF9;
  }
  .right .container {
    width: 90%;
    margin: 0 auto;
    margin-top: 60px;
  }
  .right .header {
    background-color: #FAFCF9;
  }
  .right .header .title {
    font-size: 32px;
    font-weight: 800;
    line-height: 39px;
    color: #11240E;
  }
  .right .header .svg {
    width: 26px;
    height: 26px;
  }
  .right .header .svg:first-child {
    margin-right: 20px;
  }
  .right .main .el-row {
    margin-bottom: 20px;
  }
  .right .main :deep(.el-card__body) {
    padding: 0;
    height: 74px;
    line-height: 74px;
    display: flex;
    align-items: center;
  }
  .right .main .el-card {
    border-radius: 10px;
  }
  .right .main .el-row:first-child .el-card {
    background-color: #DDEBDB;
  }
  .right .main .el-row:nth-child(2) .el-card {
    background-color: #F1FDC0;
  }
  .right .main .el-row:nth-child(3) .el-card {
    background-color: #DBEAEB;
  }
  .right .main .el-row:nth-child(4) .el-card {
    background-color: #D7EED3;
  }
  .right .main .el-row:nth-child(5) .el-card {
    background-color: #D4F2F4;
  }
  .right .main .el-row:last-child .el-card {
    background-color: #DDEBDB;
  }
  .right .main .Ellipse {
    width: 15px;
    height: 15px;
    border: 4px solid #456442;
    border-radius: 50%;
    margin: 0 20px;
    background-color: #FAFCF9;
  }
</style>
