<!-- TablePresentationView.vue -->
<template> 
    <div class="container-table">
        <el-row>
            <el-col :span="4">
                <el-text class="title-todoitems">TODO ITEMS</el-text>
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
                        <el-select v-model="select" placeholder="Select" style="width: 75px">
                        <el-option label="Title" value="1" />
                        <el-option label="Tags" value="2" />
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
                <el-table-column  prop="title" label="Title" width="280" />
                <el-table-column prop="createdDate" label="Created Date" width="110"/>
                <el-table-column prop="completedDate" label="Completed Date" width="130" />
                <el-table-column prop="label" label="Label" width="220" >
                  <template #default>
                    <el-tag
                      v-for="tag in tags"
                      :key="tag.name"
                      class="mx-1"
                      :type="tag.type"
                    >
                      {{ tag.name }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column  label="Operations" width="250">
                    <template #default>
                        <el-button size="small" type="success" @click="handleEdit()">Complete</el-button>
                        <EditItem :msg="binfo"/>                  
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
    import { ref, unref, reactive, nextTick } from 'vue';
    //interface
    import { type User } from '@/types/userManagement';
    // store
    // import { useUserStore } from '@/stores/userStore';
    import { useUserCollectionStore } from '@/stores/userCollectionStore';
    //utils
    // import {registerAccountToLocalStorage} from '@/utils/userManagement'
    //ui
    import {ElMessage} from 'element-plus'
    import { Search } from '@element-plus/icons-vue'
    import { ElInput } from 'element-plus'
    // components
    import EditItem from '@/components/EditItemComponent.vue'
  
    const binfo = {
        name: 'EditItem',
        type: 'primary',
        textbutton: false
    };

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
const select = ref('1')

// table
    const tableData = [
  {
    title: 'No. 189, Grove St, Los Angeles',
    createdDate: '2016-05-03',
    completedDate: '2016-05-03',
    label: 'Star',
  }
]

// tags in table
const tags = ref([
  { name: 'Tag 1', type: '' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  { name: 'Tag 5', type: 'danger' },
])

// button in table
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
    
<style>
    .input-with-select .el-input__wrapper{
        --el-input-border-color: #cfe2ce;
        box-shadow: 1px 0 0 0 #d6e5d6 inset,0 1px 0 0 #ebf6ea inset,0 -1px 0 0 #c0d9bf inset;
    }
</style>
<style scoped>
    .container-table{
        padding: 20px;
        height: 586px;
    }
  .title-todoitems{
        user-select:none;
        padding-left: 4px;
        font-size: 24px;
        font-weight: bold;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 
            'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;      
    }
    .input-with-select{
        --el-input-border-color: #cfe2ce;
    }
    .el-select{
        --el-input-border-color: #cfe2ce;
    }

</style>