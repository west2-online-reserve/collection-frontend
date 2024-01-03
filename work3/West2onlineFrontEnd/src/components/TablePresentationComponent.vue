<!-- TablePresentationView.vue -->
<template> 
    <div class="container-table">
        <el-row>
            <el-col :span="3">
                TODO ITEMS
            </el-col>
            <el-col :span="2">
                <el-button>Show All</el-button>
            </el-col>
            <el-col :span="6">
                <div class="block">
                    <el-date-picker
                        v-model="value2"
                        type="date"
                        placeholder="Pick a day"
                        :disabled-date="disabledDate"
                        :shortcuts="shortcuts"
                    />
                </div>
            
            </el-col>
            <el-col :span="9">
                <el-input
                    v-model="input3"
                    placeholder="Please input"
                    class="input-with-select"
                >
                    <template #prepend>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                        <el-option label="Restaurant" value="1" />
                        <el-option label="Order No." value="2" />
                        <el-option label="Tel" value="3" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="tableData" style="width: 100%"  height="480">
                <el-table-column  type="index" label="S.N." width="50" />
                <el-table-column  prop="content" label="Content" width="280" />
                <el-table-column prop="createdDate" label="Created Date" width="110" />
                <el-table-column prop="completedDate" label="Completed Date" width="130" />
                <el-table-column prop="label" label="Label" width="180" />
                <el-table-column  label="Operations" width="230">
                    <template #default>
                        <el-button size="small" type="success" @click="handleEdit()">Complete</el-button>
                        <el-button size="small" type="primary" @click="handleEdit()">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleDelete()">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination
                v-model:current-page="currentPage3"
                v-model:page-size="pageSize3"
                layout="prev, pager, next, jumper"
                :total="1000"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-row>
    </div>

</template>
    
<script setup lang="ts" name="TablePresentation"> 
    import { ref, reactive } from 'vue';
    //interface
    import { type UserInfo, type LoginStatus} from '@/types/userInfo';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    import {registerAccountToLocalStorage} from '@/utils/userMangent'
    //ui
    import {ElMessage} from 'element-plus'
    import { Search } from '@element-plus/icons-vue'
    
    const { testInfo, registerAccount, addAccountToCollection, resetPasswordByName, isAccountCorrect, updateLoginStatus, isAutoLogin} = useUserCollectionStore();

    // search
    const value2 = ref('')
    const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
    }
    const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

// class
const input3 = ref('')
const select = ref('')

    // table
    const tableData = [
  {
    content: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  },
  {
    content: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  },
  {
    content: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  },
  {
    content: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  },
  {
    content: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  },
  {
    content: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  },
  {
    content: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  },
]

const handleEdit = () => {
  console.log('handleEdit')
}
const handleDelete = () => {
  console.log('handleDelete')
}
// footer
const currentPage3 = ref(5)
const pageSize3 = ref(100)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
  
</script>
    
<style scoped>
    .container-table{
        padding: 20px;
        height: 586px;
    }
</style>
    