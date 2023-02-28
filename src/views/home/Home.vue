<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/store/modules/home'
import useScroll from '@/hooks/useScroll'
import GoodsListV1 from '@/components/goods-list-v1/GoodsListV1.vue'
import HomeSwipe from './c-cpns/HomeSwipe.vue'

let page = 1
let refresh = ref(true)
const homeRef = ref()

// store
const homeStore = useHomeStore()
const { isMore } = storeToRefs(homeStore)

// 网络请求
homeStore.fetchHomeDataAction(page)

// 滚动的位置
const { isReachBottom } = useScroll(homeRef)

// 监听滚动到底部, 加载更多
watch(isReachBottom, (newValue) => {
  if (!newValue || !isMore) return
  page++
  homeStore.fetchHomeDataAction(page)
})

// 下拉刷新
const onRefresh = async () => {
  refresh.value = true
  page = 1
  await homeStore.fetchHomeDataAction(page)
  refresh.value = false
}

const { goods, swipes } = storeToRefs(homeStore)
</script>

<template>
  <div class="home" ref="homeRef">
    <van-pull-refresh v-model="refresh" success-text="刷新成功" @refresh="onRefresh">
      <!-- 轮播图 -->
      <HomeSwipe :swipes="swipes" />
      <!-- 商品折扣列表 -->
      <GoodsListV1 :list="goods" />
    </van-pull-refresh>
  </div>
</template>

<style lang="less" scoped>
.home {
  background-color: #f5f5f5;
  height: 100%;
  overflow: auto;
}
</style>
