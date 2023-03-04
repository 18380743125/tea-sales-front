import { defineStore } from 'pinia'

interface IMainState {
  title: string
  cartBar: number
  loading: boolean
  showTabbar: boolean
}

export const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    title: '', // 导航条标题
    cartBar: 0, // 是否显示购物车底部条
    loading: false,
    showTabbar: true
  }),
  actions: {
    changeTitle(title: string) {
      this.title = title
    }
  },
  getters: {
    hideTabbar(state) {
      return typeof state.showTabbar !== 'undefined' && !state.showTabbar
    }
  }
})
