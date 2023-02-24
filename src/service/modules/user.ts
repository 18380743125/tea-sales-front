import bRequest from '../index'
import type { IPassword, IUpdateUser } from '@/types/user'

// 修改密码
export function updatePwdReq(params: IPassword) {
  return bRequest.post({
    url: '/api/v1/user/update_pwd',
    data: params
  })
}

// 更改密码
export function updateUserReq(id: number, params: IUpdateUser) {
  return bRequest.patch({
    url: `/api/v1/user/${id}`,
    data: params
  })
}
