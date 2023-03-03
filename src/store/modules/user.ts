import { defineStore } from 'pinia'
import { showSuccessToast } from 'vant'

import { ConstEnum } from '@/enum/constant.enum'
import { localCache } from '@/utils/cache'
import { loginReq } from '@/service/modules/login'
import type { Router } from 'vue-router'
import type { ILoginForm } from '@/types/user'
import { fetchUserReq } from '@/service/modules/user'

interface IUserState {
  user: Record<string, any>
  roles: Record<string, any>
}

interface LoginActionOptions {
  router: Router
  switchCaptcha: Function
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    user: {},
    roles: {}
  }),
  actions: {
    // 登录 action
    async loginAction(params: ILoginForm, { router, switchCaptcha }: LoginActionOptions) {
      const result = await loginReq(params)
      if (result.message === 'ok') {
        showSuccessToast('登录成功')
        const data = result.data
        const roles = data.user.roles
        delete data.user.roles
        this.roles = roles
        this.user = data.user
        localCache.setCache(ConstEnum.ACCESS_TOKEN, data.accessToken)
        localCache.setCache(ConstEnum.REFRESH_TOKEN, data.refreshToken)
        delete data.accessToken
        delete data.refreshToken
        setTimeout(() => {
          router.push('/user')
        }, 2000)
      } else {
        switchCaptcha()
      }
    },
    async fetchUserAction() {
      const result = await fetchUserReq(this.user.id)
      if (result.message !== 'ok') return
      const roles = result.data.roles
      delete result.data.roles
      this.roles = roles
      this.user = result.data
      localCache.setCache(ConstEnum.ROLES, roles)
      localCache.setCache(ConstEnum.USER, result.data)
    }
  },
  persist: true
})
