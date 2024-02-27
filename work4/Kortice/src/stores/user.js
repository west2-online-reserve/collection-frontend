import { defineStore } from "pinia"
import { reactive } from "vue"
import { getUserInfo, updateUserData } from '@/api/user'
import { useStorage } from "@vueuse/core"
import { useAuthStore } from "./auth"

export const useUserStore = defineStore('user', ()=>{
  // 数据
  const user = reactive({})
  // 方法
  async function setUserInfo(pwd) {
    try{
      const res = await getUserInfo()
      if (res.code === 200) {
        // 更新user的数据
        Object.assign(user, res.data)
        user.password = pwd
        user.follow = '233',
        user.fans = '233'
      }
    } catch(err) {
      throw err
    }
  }
  function updateData(data) {
    updateUserData(data).then(
      res => {
        if (res.code === 200) {
          // 后端更新成功，这边也跟着更新
          user.username = data.username
          user.motto = data.motto
          user.password = data.password
          // 弹窗提示一下用户
          ElNotification({
            title: 'Success',
            message: '修改成功，用户数据发生改变，请重新登录！',
            type: 'success'
          })
          // 登出
          useStorage('isLogined').value = false
          clearUserInfo()
          useAuthStore().clearAuthToken()
        } else {
          ElNotification({
            title: 'Error',
            message: res.msg,
            type: 'error'
          })
        }
      },
      err => {
        ElNotification({
          title: 'Error',
          message: '修改失败，请重试！',
          type: 'error',
        })
      }
    )
  }
  function setUsername(newName) {
    const data = {
      username: newName,
      password: user.password,
      motto: user.motto
    }
    updateData(data)
  }
  function setMotto(newMotto) {
    const data = {
      username: user.username,
      password: user.password,
      motto: newMotto
    }
    updateData(data)
  }
  function setPassword(newPwd) {
    const data = {
      username: user.username,
      password: newPwd,
      motto: user.motto
    }
    updateData(data)
  }
  function updateAvatar(avatarUrl) {
    user.avatarUrl = avatarUrl
  }
  function addBlogCount() {
    let blogCount = parseInt(user.blogCount)
    blogCount++
    user.blogCount = blogCount + ''
  }
  // 退出清除数据
  function clearUserInfo() {
    Object.keys(user).forEach(key => {
      delete user[key]
    })
  }

  // 返回相关数据
  return {
    user,
    setUserInfo,
    setUsername,
    setMotto,
    setPassword,
    updateAvatar,
    addBlogCount,
    clearUserInfo
  }
}, {
  persist: true
}) 
