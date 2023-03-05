import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import { fetchOrdersReq } from '@/service/modules/order'
import type { IQueryOrder } from '@/types/order'

interface IState {
  order: Record<string, any>[]
  operationOrder: Record<string, any>
  state: string | number
}
const useOrderStore = defineStore('order', {
  state: (): IState => ({
    order: [],
    operationOrder: {},
    state: 0
  }),
  actions: {
    async fetchOrdersAction() {
      const params = {
        page: 1,
        uname: localCache.getCache('user').name as string
      } as IQueryOrder
      if (this.state !== 0) params.state = this.state
      const result = await fetchOrdersReq(params)
      if (result.message === 'ok') this.order = result.data[0]
    }
  },
  persist: true
})

export default useOrderStore
