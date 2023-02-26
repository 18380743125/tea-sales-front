import { defineStore } from 'pinia'

interface IMainState {
  title: string
  cartBar: number
}

export const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    title: '', // 导航条标题
    cartBar: 0 // 是否显示购物车底部条
  }),
  actions: {
    changeTitle(title: string) {
      this.title = title
    }
  }
})
