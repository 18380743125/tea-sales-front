import { defineStore } from 'pinia'
import { queryCategoriesReq, fetchGoodsReq } from '@/service/modules/goods'

interface IState {
  page: number
  category: number
  isMore: boolean
  goods: Record<string, any>[]
  categories: Record<string, any>[]
}

export const useCategoryStore = defineStore('category', {
  state: (): IState => ({
    page: 1,
    category: 0,
    isMore: true,
    goods: [],
    categories: []
  }),
  actions: {
    // 获取类别数据
    async fetchCategoriesAction() {
      const result = await queryCategoriesReq()
      if (result.message === 'ok') this.categories = Object.freeze(result.data)
    },
    // 获取类别对应的商品数据
    async fetchGoodsAction() {
      const { page, category } = this
      const result = await fetchGoodsReq({ page, category })
      if (page === 1) this.goods = result.data[0]
      else this.goods.push(...result.data[0])
      if (result.data[0].length === 0) this.isMore = false
    }
  }
})
