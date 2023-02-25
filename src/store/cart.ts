import { defineStore } from 'pinia'
import { showToast } from 'vant'
import { addCartReq } from '@/service/modules/cart'
import type { IAddCart } from '@/types/cart'

interface ICartState {}

export const useCartStore = defineStore('cart', {
  state: () => ({} as ICartState),
  actions: {
    async addCartAction(params: IAddCart) {
      const result = await addCartReq(params)
      if (result.message === 'ok') showToast('添加成功')
    }
  }
})
