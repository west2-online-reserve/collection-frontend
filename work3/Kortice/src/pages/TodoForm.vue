<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <!-- 左侧导航栏 -->
      <div class="nav">
        <RouterLink to="/todolist" active-class="active" >TodoList</RouterLink>
        <RouterLink to="/todoform" active-class="active" >表格展示</RouterLink>
      </div>
      <!-- 右侧 -->
      <div class="account">
        <span>{{ accountEmail }}</span>
        <RouterLink to="/home/login" @click="exit">退出</RouterLink>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="outer">
      <el-container class="form-container">
        <!-- 头部 -->
        <el-header class="form-header">
          <span>待办事项</span>
          <!-- 日期选择器 -->
          <el-popover trigger="click" width="374px" popper-style="height: 357px; border-radius: 20px; padding: 20px;">
            <template #reference>
              <Calendar class="svg" />
            </template>
            <template #default>
              <MyCalendar class="calendar" :dateSelect="dateSelect" />
              <el-button round class="dateConfirm" @click="dateConfirm">确认</el-button>
            </template>
          </el-popover>
          <!-- 搜索框 -->
          <el-popover trigger="click" width="491px" placement="right" popper-style="height: 43px; border-radius: 10px; padding: 5px 11px;">
            <template #reference>
              <Search class="svg"/>
            </template>
            <template #default>
              <div class="searchFilter">
                <el-input placeholder="请输入关键字" v-model="search"></el-input>
              </div>
            </template>
          </el-popover>
        </el-header>
        <!-- 表格主体 -->
        <el-scrollbar max-height="710px" >
          <el-main>
            <el-table :data="filterTodoList" border empty-text="暂无内容">
              <el-table-column type="index" label="序号" width="100" />
              <el-table-column prop="todoThing" label="内容" />
              <el-table-column prop="creationTime" label="创建时间" width="400" />
              <el-table-column prop="completionTime" label="完成时间" width="400" />
              <el-table-column label="操作" width="300">
                <template v-slot="scope">
                  <div v-show="!scope.row.isDone">
                    <el-button round @click="todoComplete(scope.row)">完成</el-button>
                    <el-button round @click="todoChange(scope.row)">修改</el-button>
                    <el-button round @click="todoDelete(scope.row.id)">删除</el-button>
                  </div>
                  <div v-show="scope.row.isDone">
                    <el-tag class="doneTag" type="success">已完成</el-tag>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-scrollbar>
      </el-container>
    </div>
  </div>
</template>

<script>
  import { ref, computed } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { useAccountsStore } from '../stores/accounts.js'
  import { useTodoListStore } from '../stores/todoList.js'
  import { storeToRefs } from 'pinia'
  import MyCalendar from '../components/MyCalendar.vue'
  export default {
    name:'TodoForm',
    components:{MyCalendar},
    setup() {
      // 数据
      const router = useRouter()
      let accountEmail = JSON.parse(localStorage.getItem('loginAccount')).email
      const accountsStore = useAccountsStore()
      const { accounts } = storeToRefs(accountsStore)
      const todoListStore = useTodoListStore()
      const { todoList } = storeToRefs(todoListStore)
      let date = ref('')
      let search = ref('')

      const filterTodoList = computed(() =>
        todoList.value.filter( (data) =>
            (!date.value || data.creationTime.split(' ')[0] === date.value)
            &&
            (!search.value || data.todoThing.includes(search.value))
        )
      )

      // 方法

      // 完成todo
      function todoComplete(rowData) {
        rowData.isDone = true
        let time = new Date()
        time = time.toLocaleDateString('zh-CN') + ' ' + time.getHours() + ':' + (time.getMinutes() >= 10 ? '' : '0') + time.getMinutes()
        rowData.completionTime = time
      }

      // 修改todo
      function todoChange(rowData) {
        ElMessageBox.prompt('请输入修改的内容', '⭐Tip', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          ElNotification({
              title: 'Success',
              message: '修改成功！',
              type: 'success',
          })
          rowData.todoThing = value
        })
        .catch(() => {
          ElNotification({
            title: 'Info',
            message: '您已取消修改！',
            type: 'info',
          })
        })
      }

      // 删除todo
      function todoDelete(todoId) {
        todoList.value.forEach( (todo,index) => {
          if (todo.id === todoId) {
            todoList.value.shift(index)
            ElNotification({
              title: 'Success',
              message: '删除成功！',
              type: 'success',
            })
          }
        });
      }


      // 选择时间
      function dateSelect(selectDate) {
        date.value = selectDate
        date.value = date.value.toLocaleDateString('zh-CN')
      }

      function dateConfirm() {
        ElNotification({
          title: 'Success',
          message: '已为您筛选出对应待办！',
          type: 'success',
      })
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


      return {
        accountEmail,
        todoList,
        filterTodoList,
        search,
        todoComplete,
        todoChange,
        todoDelete,
        dateSelect,
        dateConfirm,
        exit
      }
    }
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
    background-color: #FAFCF9;
  }
  .outer :deep(*) {
    padding: 0;
    margin: 0;
  }
  .form-container {
    width: 1600px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .form-container .form-header {
    display: flex;
    align-items: center;
  }
  .form-header span {
    font-size: 32px;
    font-weight: 800;
    line-height: 39px;
    letter-spacing: 0em;
    margin-right: 30px;
  }
  .form-container .svg {
    width: 32px;
    height: 32px;
    margin-left: 20px;
  }
  .calendar {
    width: 310px;
    height: 260px;
    margin: 0 auto;
    background-color:#FEFFFF;
  }
  .calendar :deep(.calendar-header) {
    font-size: 20px;
    font-weight: 800;
    line-height: 10px;
  }
  .calendar :deep(.el-calendar__header) {
    padding: 12px 0px;
  }
  .calendar :deep(.el-calendar-day) {
    width: 30px;
    height: 30px;
  }
  .calendar :deep(.p) {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .dateConfirm {
    position: absolute;
    bottom: 35px;
    right: 40px;
    background-color: #3D4344;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
    color: #FEFFFF;
  }
  .searchFilter {
    display: flex;
    align-items: center;
  }
  .searchFilter :deep(.el-input) {
    border: none;
  }
  .form-container :deep(.el-table) {
    --el-table-border-color: #DDEBDB;
  }
  .form-container :deep(.el-table .cell) {
    text-align: center;
    color: #11240E;
    padding: 20px;
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
  }
  .form-container :deep(.el-table th .cell) {
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    color: #11240E;
  }
  .form-container :deep(.el-button) {
    width: 70px;
    height: 36px;
    border-radius: 18px;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #FEFFFF;
  }
  .form-container :deep(.el-button:first-child) {
    margin-right: 15px;
    background-color: #426440;
  }
  .form-container :deep(.el-button:nth-child(2)) {
    margin-right: 15px;
    background-color: #419ADA;
  }
  .form-container :deep(.el-button:last-child) {
    background-color: #F81D1D;
  }
  .form-container :deep(.doneTag) {
    width: 121px;
    height: 36px;
    border-radius: 18px;
    background-color: #FFB800;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #FEFFFF;
  }
  .form-container :deep(.done-row .cell) {
    color: #D3D3D3;
  }
  
</style>
