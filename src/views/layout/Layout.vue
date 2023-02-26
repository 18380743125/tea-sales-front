<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { storeToRefs } from 'pinia'
import Tabbar from '@/components/Tabbar.vue'
import CartBar from '@/components/CartBar.vue'
import { useMainStore } from '@/store/modules/main'
import { useCartStore } from '@/store/modules/cart'

const cartBarRef = ref()
provide('cartBarRef', cartBarRef)

// store
const mainStore = useMainStore()
const cartStore = useCartStore()
const { title, cartBar } = storeToRefs(mainStore)
const { count, totalRealMoney } = storeToRefs(cartStore)

// computed
const showCartBar = computed(
  () =>
    (cartBar.value === 2 && count.value !== 0 && parseInt(totalRealMoney.value) !== 0) ||
    cartBar.value === 1
)
</script>

<template>
  <div class="layout">
    <!-- 导航条 -->
    <van-nav-bar>
      <template #title
        ><span style="letter-spacing: 1px">{{ title }}</span></template
      >
    </van-nav-bar>

    <!-- 内容区 -->
    <div class="content" :style="{ marginBottom: showCartBar ? '38px' : '' }">
      <RouterView />
    </div>

    <!-- 购物车底部栏 -->
    <div v-show="showCartBar">
      <CartBar ref="cartBarRef" />
    </div>

    <!-- 底部导航栏 -->
    <div class="tabbar">
      <Tabbar />
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    background-color: #f5f5f5;
    flex: 1;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .tabbar {
    height: 104px;
  }
}
</style>
