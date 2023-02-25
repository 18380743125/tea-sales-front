import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    title: '' // 导航条标题
  }),
  actions: {
    changeTitle(title: string) {
      this.title = title
    }
  }
})
