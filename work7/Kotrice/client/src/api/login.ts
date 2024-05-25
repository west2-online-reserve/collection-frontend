import { service } from '@/utils/request'
// 定义类型 
interface LoginData {
  username: string
}
interface LoginResponse {
  code: number,
  msg: string,
  data: {
    token: string
  } | null
}

export function Login(data: LoginData): Promise<LoginResponse> {
  return service.request({
    method: 'post',
    url: '/login',
    data
  })
}
  
