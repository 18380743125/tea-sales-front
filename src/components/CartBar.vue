<script setup lang="ts">
import { ref, onUnmounted, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/modules/cart'
import { useMainStore } from '@/store/modules/main'

interface Pos {
  x: number
  y: number
}

const addCartRef = ref<HTMLElement>()
const addCartInnerRef = ref<HTMLElement>()
const cartRef = ref<HTMLElement>()
const cartPos: Pos = { x: 0, y: 0 }
const raf = ref<number>(0)

// store
const cartStore = useCartStore()
const mainStore = useMainStore()

// 网络请求
cartStore.queryCartAction()
const { totalRealMoney, checkedNums, isCheckAll } = storeToRefs(cartStore)
const { cartBar } = storeToRefs(mainStore)

onUpdated(() => {
  // 购物车的位置
  if (cartPos.x !== 0) return
  const rect = cartRef.value?.getBoundingClientRect()
  cartPos.x = (rect?.left as number) + (rect?.width as number) / 5
  cartPos.y = (rect?.top as number) - (rect?.height as number) / 3
  // 监听事件
  cartRef.value?.addEventListener('animationend', handleAnimationEnd)
})

onUnmounted(() => {
  cartRef.value?.removeEventListener('animationend', handleAnimationEnd)
  cancelAnimationFrame(raf.value)
})
// 处理动画结束
const handleAnimationEnd = () => {
  cartRef.value?.classList.remove('cart-animation')
  if (addCartRef.value) {
    // 重置位置
    addCartRef.value.style.display = 'none'
  }
}

// 处理动画位置
const addCart = (item: HTMLElement) => {
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

const checkAllClick = () => {
  cartStore.checkAllAction()
}

defineExpose({
  addCart
})
</script>
<template>
  <div v-show="cartBar === 2" class="add-cart" ref="addCartRef">
    <div ref="addCartInnerRef">+</div>
  </div>

  <div class="cart-bar">
    <div class="left">
      <div v-if="cartBar === 2" class="cart" ref="cartRef">
        <van-badge :content="checkedNums">
          <van-icon name="cart" />
        </van-badge>
      </div>
      <div v-else class="all-check" ref="cartRef">
        <van-checkbox @click="checkAllClick" v-model="isCheckAll" icon-size="20px" />
        <span class="text">全选</span>
      </div>
    </div>
    <div class="right">
      <div class="money"><span style="font-size: 15px">￥</span>{{ totalRealMoney }}</div>
      <div class="btn" :style="{ backgroundColor: checkedNums ? '#00df71' : '#80efb8' }">
        <span class="pay">去支付</span>
        <span class="count" v-show="checkedNums !== 0">({{ checkedNums }})</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.add-cart {
  background-color: var(--van-primary-color);
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  display: none;
  transition: 0.3s linear;

  div {
    background-color: var(--van-primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #fff;
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s cubic-bezier(0.3, -0.3, 1, 1);
  }
}

.cart-bar {
  position: fixed;
  bottom: 88px;
  width: 100%;
  height: 96px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-top: 1px solid #f5f5f5;

  .left {
    width: 280px;
    color: var(--van-primary-color);
    font-size: 50px;
    .cart {
      width: 60px;
    }

    .all-check {
      display: flex;
      align-items: center;
      margin-top: -12px;
      .text {
        font-size: 28px;
        color: #333;
        padding-left: 16px;
        position: relative;
        top: 2px;
      }
    }
  }

  .right {
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    padding-right: 50px;
    justify-content: flex-end;

    .money {
      color: red;
      font-size: 35px;
      position: relative;
      top: -6px;
    }

    .btn {
      margin: 0 0 12px 20px;
      padding: 0 26px;
      height: 65%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 50px;
      background-color: var(--van-primary-color);
      letter-spacing: 1px;
      font-size: 28px;
      .pay {
        font-size: 26px;
        width: 90px;
        height: 100%;
        display: flex;
        align-items: center;
      }
      .count {
        font-size: 24px;
      }
    }
  }
}

.cart-animation {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.3);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
