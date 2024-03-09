<template>
    <el-avatar :src="img" :size="size"/>
</template>

<script setup lang="ts">
import { ref  } from 'vue'

const props = defineProps({
    size:{
        type:Number,
        default:50
    },
    userId:{
        type:String
    }
})
const img = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
import { getImgSevrvice } from '@/apis/user.js'
const getAvatar = async () => {
    try {
        let result = await getImgSevrvice(props.userId)
        img.value = window.URL.createObjectURL(result)
    } catch (err) {
        return false
    }
}
getAvatar()
</script>

<style scoped>

</style>