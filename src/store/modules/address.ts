import { defineStore } from 'pinia'
import { fetchAddressReq } from '@/service/modules/address'

interface IState {
  addresses: Record<string, any>[]
  editAddress: Record<string, any>
}

const useAddressStore = defineStore('address', {
  state: (): IState => ({
    addresses: [],
    editAddress: {}
  }),
  actions: {
    async fetchAddresses() {
      const result = await fetchAddressReq()
      if (result.message === 'ok') {
        this.addresses = result.data.map((item: Record<string, any>) => {
          item.isDefault = item.isDefault === '1'
          return item
        })
      }
    }
  }
})

export default useAddressStore
