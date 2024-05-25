import { service } from '@/utils/request'
// 定义类型
interface LogoutData {
  username: string
}
interface LogoutResponse {
  code: number,
  msg: string,
  data: null
}

export function Logout(data: LogoutData): Promise<LogoutResponse> {
  return service.request({
    method: 'post',
    url: '/logout',
    data
  })
}
