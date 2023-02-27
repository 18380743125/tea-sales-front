import { onMounted, onUnmounted, onUpdated, ref } from 'vue'

interface Pos {
  x: number
  y: number
}

/**
 * 添加购物车动画效果
 */
export default function useAddCartAnimation() {
  const addCartRef = ref<HTMLElement>() // 跳的外层元素
  const addCartInnerRef = ref<HTMLElement>() // 跳的内层元素
  const cartRef = ref<HTMLElement>() // 跳的目的地元素
  const cartPos: Pos = { x: 0, y: 0 } // 跳的目的地位置
  const raf = ref<number>(0)

  // 动画结束处理事件
  const handleAnimationEnd = () => {
    cartRef.value?.classList.remove('cart-animation')
    if (addCartRef.value) {
      // 重置位置
      addCartRef.value.style.display = 'none'
    }
  }
  // 监听动画结束
  onMounted(() => {
    cartRef.value?.addEventListener('animationend', handleAnimationEnd)
  })
  // 跳的位置
  onUpdated(() => {
    if (cartPos.x !== 0) return
    const rect = cartRef.value?.getBoundingClientRect()
    cartPos.x = (rect?.left as number) + (rect?.width as number) / 5
    cartPos.y = (rect?.top as number) - (rect?.height as number) / 3
  })
  // 收尾操作
  onUnmounted(() => {
    cartRef.value?.removeEventListener('animationend', handleAnimationEnd)
    cancelAnimationFrame(raf.value)
  })

  // 开始动画
  const start = (item: HTMLElement) => {
    cartRef.value?.classList.add('cart-animation')
    const itemRect = item.getBoundingClientRect()
    const start = {
      x: itemRect.left - itemRect.width / 5,
      y: itemRect.top - itemRect.height / 5
    }

    if (addCartRef.value && addCartInnerRef.value) {
      addCartRef.value.style.display = 'block'
      addCartRef.value.style.transform = `translateX(${start.x}px`
      addCartInnerRef.value.style.transform = `translateY(${start.y}px)`
    }
    raf.value = requestAnimationFrame(() => {
      if (addCartRef.value && addCartInnerRef.value) {
        addCartRef.value.style.transform = `translateX(${cartPos.x}px)`
        addCartInnerRef.value.style.transform = `translateY(${cartPos.y}px)`
      }
    })
  }

  return {
    addCartRef,
    addCartInnerRef,
    cartRef,
    start
  }
}
