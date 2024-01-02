<!-- To doListView.vue -->
<template> 
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="12" style="background-color:#c9c9c9;" >
                    <el-calendar ref="calendar">
                        <template #header="{ date }">     
                            <span class="label-month-year">{{ dateUtils.getMonthName(date) }}, {{ dateUtils.getYear(date) }}</span>
                            <el-button-group style="width: 400px; margin:auto 0;">
                                <el-row :gutter="10" justify="center"> 
                                    <el-col :span="2">
                                        <el-button size="small" @click="selectDate('prev-year')" style="width: 100%;">
                                            <el-icon><ArrowUpBold/></el-icon>
                                        </el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-button size="small" @click="selectDate('next-year')" style="width: 100%;">
                                            <el-icon><ArrowDownBold/></el-icon>
                                        </el-button>
                                    </el-col>
                                    <el-col :span="10"></el-col>
                                    <el-col :span="4">
                                        <el-button size="small" @click="selectDate('today')" style="width: 100%;">Today</el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-button size="small" @click="selectDate('prev-month')" style="width: 100%;">
                                            <el-icon><ArrowLeftBold/></el-icon>
                                        </el-button>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-button size="small" @click="selectDate('next-month')" style="width: 100%;">
                                            <el-icon><ArrowRightBold/></el-icon>
                                        </el-button>
                                    </el-col>
                                </el-row>
              
                            </el-button-group>
                        </template>
                    </el-calendar>
                </el-col>
                <el-col :span="12" style="background-color:#f08f8f;">2</el-col>
            </el-row>
        </el-main>

    </el-container>
</template>
    
<script setup lang="ts" name="TodoListView"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // router
    import { useRouter } from 'vue-router';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    import {registerAccountToLocalStorage} from '@/utils/userMangent'
    import * as dateUtils from '@/utils/dateUtils'
    
    import {ElMessage} from 'element-plus'
    import type { CalendarDateType, CalendarInstance } from 'element-plus'
    
    let router = useRouter();

    // canlendar
    const calendar = ref<CalendarInstance>()
    const selectDate = (val: CalendarDateType) => {
        if (!calendar.value) return
            calendar.value.selectDate(val)
    }


</script>

<style>
.el-calendar-table{
    border:1px solid #e4e4e4;
}
.el-calendar__header{
    padding-left:0;
    padding-right:0;
}
.el-calendar__body{
    padding:0 0 30px 0;
}

.el-calendar-table thead th{
    font-weight: bold;
    padding: 4px 0;

}
.el-calendar-table .el-calendar-day{
    text-align: center;
    height: 40px;
}

.el-calendar-table td {
    border-style:none ;
}
.el-calendar-table tbody tr:nth-child(6){
    display: none;
    /* visibility: hidden; */
}

</style>
<style scoped>
    .label-month-year{
        width: 210px;
        font-size: 24px;
        font-weight: bold;
        /* line-height: 50px; */
    }
</style>
    