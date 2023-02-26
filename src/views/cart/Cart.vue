<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/modules/cart'
import CartItem from './CartItem.vue'
import type { IUpdateCart } from '@/types/cart'

const cartStore = useCartStore()
const { carts } = storeToRefs(cartStore)

// 选择框的变化
const checkClick = (id: number, { checked, goodsId }: IUpdateCart) => {
  cartStore.updateCart(id, { checked, goodsId })
}

// 数量变化
const countChange = (id: number, data: IUpdateCart) => {
  cartStore.updateCart(id, data)
}
</script>

<template>
  <div class="wrapper">
    <van-empty v-show="carts.length === 0" description="还没有购物车，快去逛逛吧~" />
    <!-- 购物车列表 -->
    <div class="list">
      <template v-for="item in carts" :key="item.id">
        <van-swipe-cell>
          <CartItem :item="item" @check-change="checkClick" @count-change="countChange" />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  // 购物车列表
  .list {
    padding-top: 10px;

    // 删除按钮
    .delete-button {
      height: 220px;
    }
  }
}
</style>
