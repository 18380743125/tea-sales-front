<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/modules/cart'
import { useMainStore } from '@/store/modules/main'
import useAddCartAnimation from '../hooks/useAddCartAnimation'

// store
const cartStore = useCartStore()
const mainStore = useMainStore()
// 网络请求
cartStore.queryCartAction()
const { totalRealMoney, checkedNums, isCheckAll } = storeToRefs(cartStore)
const { cartBar } = storeToRefs(mainStore)

// hooks
const { addCartRef, addCartInnerRef, cartRef, start } = useAddCartAnimation()

// 动画
const addCart = (item: HTMLElement) => {
  start(item)
}

// 处理全?不选
const checkAllClick = () => {
  cartStore.checkAllAction()
}

defineExpose({
  addCart
})
</script>
<template>
  <div class="add-cart" ref="addCartRef">
    <div ref="addCartInnerRef">+</div>
  </div>

  <div class="cart-bar">
    <div class="left">
      <div v-show="cartBar === 2" class="cart" ref="cartRef">
        <van-badge :content="checkedNums">
          <van-icon name="cart" />
        </van-badge>
      </div>
      <div v-if="cartBar === 1" class="all-check">
        <van-checkbox @click="checkAllClick" :model-value="isCheckAll" icon-size="20px" />
        <span class="text" @click="checkAllClick">全选</span>
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
