import bRequest from '..'
import type { ILoginForm } from '@/types/user'

// 登录
export function loginReq(form: ILoginForm) {
  form.remember = false
  return bRequest.post({
    url: '/api/v1/auth/login',
    data: form
  })
}

// 注销登录
export function logoutReq() {
  return bRequest.post({
    url: '/api/v1/auth/logout'
  })
}
