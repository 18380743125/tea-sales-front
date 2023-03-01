import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'
import throttle from '@/utils/throttle'

export default function useScroll(elRef: Ref<HTMLElement | null>) {
  let el: Window | HTMLElement | null = window

  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(
    () => {
      if (el === window) {
        // window
        clientHeight.value = document.documentElement.clientHeight
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
      } else if (el instanceof HTMLElement) {
        // 元素的滚动
        clientHeight.value = el.clientHeight
        scrollTop.value = el.scrollTop
        scrollHeight.value = el.scrollHeight
      }
      // 是否滚动到底部
      if (clientHeight.value + scrollTop.value >= scrollHeight.value - 50) {
        isReachBottom.value = true
      } else {
        isReachBottom.value = false
      }
    },
    100,
    {}
  )

  onMounted(() => {
    if (elRef) el = elRef.value
    el?.addEventListener('scroll', scrollListenerHandler)
    console.log((el as HTMLElement).clientHeight)
    console.log((el as HTMLElement).scrollHeight)
    console.log((el as HTMLElement).scrollTop)
  })

  onUnmounted(() => {
    el?.removeEventListener('scroll', scrollListenerHandler)
  })

  return {
    clientHeight,
    scrollTop,
    scrollHeight,
    isReachBottom
  }
}
