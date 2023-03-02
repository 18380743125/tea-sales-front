import bRequest from '../index'
import type { IPassword, IRegisterForm, IUpdateUser } from '@/types/user'

// 用户注册
export function registerReq(data: IRegisterForm) {
  return bRequest.post({
    url: '/api/v1/user',
    data
  })
}

// 获取用户信息
export function fetchUserReq(id: number) {
  return bRequest.get({
    url: `/api/v1/user/${id}`
  })
}

// 修改密码
export function updatePwdReq(params: IPassword) {
  return bRequest.post({
    url: '/api/v1/user/update_pwd',
    data: params
  })
}

// 更改用户信息
export function updateUserReq(id: number, params: IUpdateUser) {
  return bRequest.patch({
    url: `/api/v1/user/${id}`,
    data: params
  })
}

// 注销登录
export function logoutReq() {
  return bRequest.post({
    url: '/user/logout'
  })
}

// 更换头像
export function changeAvatarReq(file: File) {
  const fd = new FormData()
  fd.append('avatar', file)
  return bRequest.post({
    url: '/api/v1/user/avatar',
    data: fd
  })
}
