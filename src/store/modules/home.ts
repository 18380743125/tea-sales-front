import { defineStore } from 'pinia'
import { getDiscountReq } from '@/service/modules/goods'

interface IHomeState {
  page: number
  isMore: boolean
  goods: Array<Record<string, any>>
  swipes: Array<Record<string, any>>
}

// 前 6 条数据作为轮播图
function _getSwipes(goods: Array<Record<string, any>>) {
  return goods
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      img: item.goods.imgs[0]
    }))
    .reverse()
}

export const useHomeStore = defineStore('home', {
  state: (): IHomeState => ({
    page: 1,
    isMore: true,
    goods: [],
    swipes: []
  }),
  actions: {
    fetchHomeDataAction() {
      if (!this.isMore) return
      getDiscountReq({ page: this.page }).then((res) => {
        const data = res.data
        if (res.message === 'ok') {
          if (data[0].length === 0) this.isMore = false
          this.goods.push(...data[0])
        }
        if (this.swipes.length < 6) {
          this.swipes.push(..._getSwipes(this.goods))
        }
      })
    }
  }
})
