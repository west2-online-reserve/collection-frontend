import axios from "axios"

// 创建 axios 实例
export const service = axios.create({
  baseURL: 'http://47.113.145.156:8081'
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).token : null
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => Promise.reject(err)
)

// 添加响应拦截器
service.interceptors.response.use(
  response => response.data ,
  err => Promise.reject(err)
)

