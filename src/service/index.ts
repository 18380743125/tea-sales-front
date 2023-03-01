import { showLoadingToast, showToast, closeToast } from 'vant'
import BRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { router } from '@/router'
import { localCache } from '@/utils/cache'
import { ConstEnum } from '@/enum/constant.enum'
import { ErrorEnum } from '@/enum/error.enum'
import { useMainStore } from '@/store/modules/main'
import { pinia } from '@/store'

// 错误信息对象
const errorInfoObj = {
  [ErrorEnum.SERVER]: '服务器异常！',
  [ErrorEnum.PARAMS]: '参数错误！',
  [ErrorEnum.UNAUTHORIZED]: '请先登录！',
  [ErrorEnum.LOGIN_EXPIRES]: '登录已过期！',
  [ErrorEnum.NO_ADMIN_AUTH]: '无管理员权限！',
  [ErrorEnum.FORBIDDEN]: '禁止访问！',
  [ErrorEnum.NO_EXISTS]: '操作不存在！',
  [ErrorEnum.CAPTCHA_ERROR]: '验证码错误！',
  [ErrorEnum.CAPTCHA_EXPIRES]: '验证码过期！',
  [ErrorEnum.LOGIN_ERROR]: '用户名或密码错误！'
}
// 需要重新登录
const relist = [ErrorEnum.UNAUTHORIZED, ErrorEnum.LOGIN_EXPIRES]
// main store
const mainStore = useMainStore(pinia)

const bRequest = new BRequest({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
  withCredentials: true,
  interceptors: {
    requestSuccessFn(config) {
      // loading 状态
      mainStore.loading = true
      showLoadingToast('加载中')

      // 携带令牌
      const accessToken = localCache.getCache(ConstEnum.ACCESS_TOKEN)
      const refreshToken = localCache.getCache(ConstEnum.REFRESH_TOKEN)
      if (accessToken && config.headers) config.headers['authorization'] = accessToken
      if (refreshToken && config.headers) config.headers['refreshtoken'] = refreshToken
      return config
    },
    responseSuccessFn(res: any) {
      // 统一响应错误处理
      const msg = res.message
      if (msg !== 'ok') {
        const errorInfo = errorInfoObj[msg] || '无知错误！'
        showToast(errorInfo)
        if (relist.includes(msg)) {
          localCache.clear()
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }
      }
      mainStore.loading = false // loading 关闭
      closeToast()
      return res
    },
    requestFailFn(err) {
      mainStore.loading = false
      closeToast()
      Promise.reject(err)
    }
  }
})

export default bRequest
