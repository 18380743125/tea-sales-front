import { defineStore } from 'pinia'
import { getDiscountReq } from '@/service/modules/goods'

interface IHomeState {
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
    isMore: true,
    goods: [],
    swipes: []
  }),
  actions: {
    // 获取首页数据
    async fetchHomeDataAction(page = 1) {
      if (!this.isMore) return
      getDiscountReq({ page }).then((res) => {
        const data = res.data
        if (res.message === 'ok') {
          if (data[0].length === 0) this.isMore = false
          if (page === 1) {
            this.goods = data[0]
          } else this.goods.push(...data[0])
        }
        if (this.swipes.length < 6) {
          this.swipes.push(..._getSwipes(this.goods))
        }
      })
    }
  }
})
