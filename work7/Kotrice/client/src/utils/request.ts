import axios from 'axios'
import config from '@/config/config'

const { HOST, PORT } = config

// 创建 axios 实例
export const service = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('auth')|| '{}').token
    if (token)  config.headers['Authorization'] = token
    return config
  },
  err => Promise.reject(err)
)

// 添加响应拦截器
service.interceptors.response.use(
  response => response.data,
  err => Promise.reject(err)
)
