import { defineStore } from 'pinia'
import { addCartReq, checkAllReq, queryCartReq, updateCartReq } from '@/service/modules/cart'
import type { IAddCart, IUpdateCart } from '@/types/cart'

interface ICartState {
  carts: Record<string, any>[]
}

export const useCartStore = defineStore('cart', {
  state: (): ICartState => ({
    carts: []
  }),
  actions: {
    // 添加购物车
    async addCartAction(params: IAddCart) {
      params.checked = true
      await addCartReq(params)
      this.queryCartAction()
    },
    // 查询购物车
    queryCartAction() {
      queryCartReq({ page: 1, size: 10000 }).then((res) => {
        if (res.message === 'ok') {
          this.carts = res.data[0]
        }
      })
    },
    // 更新购物车
    async updateCart(id: number, data: IUpdateCart) {
      console.log(typeof data.goodsId, data.goodsId)

      await updateCartReq(id, data)
      this.queryCartAction()
    },
    // 全选与全不选
    async checkAllAction() {
      const isCheckedAll = this.isCheckAll
      await checkAllReq(isCheckedAll ? 0 : 1)
      this.queryCartAction()
    }
  },
  getters: {
    // 购物车总数量
    count(state) {
      return state.carts.reduce((pre, item) => pre + item.count, 0)
    },
    // 选中的金额
    totalRealMoney(state) {
      return state.carts
        .reduce((pre, item) => {
          const discount = item.goods.discount
          if (item.checked) {
            if (discount) return pre + discount.rate * item.goods.price * item.count
            else return pre + item.goods.price * item.count
          }
          return pre
        }, 0)
        .toFixed(2)
    },
    // 选中的原金额
    totalMoney(state) {
      return state.carts
        .reduce((pre, item) => {
          if (item.checked) return pre + item.goods.price * item.count
          return pre
        }, 0)
        .toFixed(2)
    },
    // 选中的数量
    checkedNums(state) {
      return state.carts.reduce((pre, item) => {
        if (item.checked) return pre + item.count
        return pre
      }, 0)
    },
    // 是否全选
    isCheckAll(state) {
      const checkedNums = this.checkedNums as number
      return state.carts.reduce((pre, item) => item.count + pre, 0) === checkedNums
    }
  },
  persist: true
})
