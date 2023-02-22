import { BASE_URL } from './config/index'
import BRequest from './request'
import { TIME_OUT } from './config'

const bRequest = new BRequest({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
  withCredentials: true,
  interceptors: {
    requestSuccessFn(config: any) {
      return config
    },
    responseSuccessFn(res: any) {
      return res
    }
  }
})

export default bRequest
