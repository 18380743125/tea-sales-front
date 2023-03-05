import { defineStore } from 'pinia'
import type { AddressListAddress } from 'vant'
import { fetchAddressReq } from '@/service/modules/address'

interface IState {
  addresses: AddressListAddress[]
  editAddress: AddressListAddress | any
}

const useAddressStore = defineStore('address', {
  state: (): IState => ({
    addresses: [],
    editAddress: undefined
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
  },
  getters: {
    defaultAddress(state) {
      const address = state.addresses.find((item) => {
        if (typeof item.isDefault === 'boolean' && item.isDefault) return item
      })
      if (!address) return this.addresses[0]
      else return address
    }
  },
  persist: true
})

export default useAddressStore
