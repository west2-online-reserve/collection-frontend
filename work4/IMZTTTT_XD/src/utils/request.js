import axios from 'axios'
import { ElMessage } from 'element-plus'


export const service = axios.create({
  // 改为填入对应的后端地址
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
})

service.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin']='*';
    const token = window.localStorage.getItem('token');
    if(token){
      config.headers.Authorization = token;
    }
    return config
    },
  error =>Promise.reject(error)
);

service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);
export default service;
