import { defineStore } from 'pinia'

interface IState {}

const useEvaluateStore = defineStore('evaluate', {
  state: (): IState => ({})
})

export default useEvaluateStore
