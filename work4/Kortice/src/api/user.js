// 引入 axios 实例
import { service } from "@/utils/request";

// 注册接口
export const userReg = data => service.request({
  method: 'post',
  url: '/user/register',
  data
})

// 登录接口
export const userLogin = data => service.request({
  method: 'post',
  url: '/user/login',
  data
})

// 获取用户信息
export const getUserInfo = () => service.request({
  method: 'get',
  url: '/user/me'
})

// 更新用户信息
export const updateUserData = data => service.request({
  method: 'put',
  url: '/user',
  data
})
