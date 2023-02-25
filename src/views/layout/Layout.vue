<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Tabbar from '@/components/Tabbar.vue'
import CartBar from '@/components/CartBar.vue'
import { useMainStore } from '@/store/main'

const mainStore = useMainStore()
const { title } = storeToRefs(mainStore)
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
    <div class="content">
      <RouterView />
    </div>

    <!-- 购物车底部栏 -->
    <CartBar />

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
    margin-bottom: 76px;
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
