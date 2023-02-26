<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/store/modules/home'
import GoodsListV1 from '@/components/goods-list-v1/GoodsListV1.vue'
import HomeSwipe from './c-cpns/HomeSwipe.vue'

const homeStore = useHomeStore()
// 网络请求
homeStore.fetchHomeDataAction()

const { goods, swipes } = storeToRefs(homeStore)
</script>

<template>
  <div class="home">
    <!-- 轮播图 -->
    <HomeSwipe :swipes="swipes" />
    <GoodsListV1 :list="goods" />
  </div>
</template>

<style lang="less" scoped>
.home {
  background-color: #f5f5f5;
}
</style>
