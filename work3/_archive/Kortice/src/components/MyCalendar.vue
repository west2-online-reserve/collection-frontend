<template>
  <!-- 日历 -->
  <el-calendar class="calendar" v-model="taskDate">
    <!-- 日历头 -->
    <template #header="{ date }">
      <span class="calendar-header">{{ date.split(' ')[2] }},{{ date.split(' ')[0] }}</span>
      <el-button-group></el-button-group>
    </template>
    <!-- 日历内容 -->
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''" class="p">
        {{ data.day.split('-')[2] }}
      </p>
    </template>
  </el-calendar>
</template>

<script>
  import { ref, watch } from "vue"
  export default {
    name:'MyCalendar',
    props:['dateSelect'],
    setup(props) {


      let taskDate = ref(new Date())
      watch(taskDate, () => {
        props.dateSelect(taskDate.value)
      })

      return {
        taskDate
      }
    }
  }

</script>

<style scoped>
  .calendar {
    background-color: #FAFCF9;
    --el-calendar-border:0 ;
    --el-calendar-selected-bg-color:none;
    --el-text-color-regular: #11240E;
  }
  .calendar :deep(.el-calendar__body) {
    padding: 0;
  }
  .calendar :deep(.el-calendar-day) {
    text-align: center;
    padding: 0;
  }
  .calendar-header {
    color: #11240E;
  }
  .calendar :deep(.current) {
    color: #426440;
  }
  .is-selected {
    width: 100%;
    height: 100%;
    background-color: #456442;
    border-radius: 50%;
    color: #FEFFFF !important;
  }
</style>
