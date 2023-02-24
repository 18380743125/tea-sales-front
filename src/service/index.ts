import { BASE_URL } from './config/index'
import BRequest from './request'
import { TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import { ConstEnum } from '@/enum/constant.enum'
import { ErrorEnum } from '@/enum/error.enum'
import { showToast } from 'vant'

const bRequest = new BRequest({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
  withCredentials: true,
  interceptors: {
    requestSuccessFn(config) {
      // 携带令牌
      const accessToken = localCache.getCache(ConstEnum.ACCESS_TOKEN)
      const refreshToken = localCache.getCache(ConstEnum.REFRESH_TOKEN)
      if (accessToken && config.headers) config.headers['authorization'] = accessToken
      if (refreshToken && config.headers) config.headers['refreshtoken'] = refreshToken
      return config
    },
    responseSuccessFn(res: any) {
      // 通用错误处理
      const msg = res.message
      switch (msg) {
        case ErrorEnum.SERVER:
          showToast('服务器异常！')
          break
        case ErrorEnum.PARAMS:
          showToast('参数错误！')
          break
        case ErrorEnum.UNAUTHORIZED:
          localCache.clear()
          showToast('请先登录！')
          break
        case ErrorEnum.NO_ADMIN_AUTH:
          localCache.clear()
          showToast('无管理员权限！')
          break
        case ErrorEnum.PASSWORD_ERROR:
          showToast('密码错误！')
          break
        case ErrorEnum.FORBIDDEN:
          showToast('禁止访问！')
          break
        case ErrorEnum.NO_EXISTS:
          showToast('操作不存在！')
          break
        case ErrorEnum.CAPTCHA_ERROR:
          showToast('验证码错误')
          break
        case ErrorEnum.LOGIN_ERROR:
          showToast('用户名或密码错误')
          break
      }
      return res
    }
  }
})

export default bRequest
