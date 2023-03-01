<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import GoodsListV2 from '@/components/goods-list-v2/GoodsListV2.vue'
import { useCategoryStore } from '@/store/modules/category'
import useScroll from '@/hooks/useScroll'

const active = ref(0)
const categoryRef = ref<HTMLElement | null>(null)

// store
const categoryStore = useCategoryStore()
const { categories, goods, isMore } = storeToRefs(categoryStore)

// hooks
const { isReachBottom } = useScroll(categoryRef)

// 网络请求
categoryStore.fetchCategoriesAction()
categoryStore.fetchGoodsAction()

watch(active, (newValue) => {
  categoryStore.page = 1
  categoryStore.category = newValue
  categoryStore.fetchGoodsAction()
})

// 监听滚动到底部, 加载更多
watch(isReachBottom, (newValue) => {
  if (newValue && isMore.value) {
    categoryStore.page++
    categoryStore.fetchGoodsAction()
  }
})
</script>

<template>
  <van-row class="category">
    <van-col span="5" class="sidebar">
      <van-sidebar v-model="active">
        <van-sidebar-item title="推荐" badge="热" />
        <template v-for="item in categories" :key="item.id">
          <van-sidebar-item :title="item.name" />
        </template>
      </van-sidebar>
    </van-col>
    <van-col span="19" class="content">
      <div ref="categoryRef" class="content">
        <!-- 商品列表 -->
        <GoodsListV2 :items="goods" />

        <!-- no more -->
        <NoMore v-show="!isMore" />
      </div>
    </van-col>
  </van-row>
</template>

<style lang="less" scoped>
.category {
  background-color: #f5f3f6;
  height: 100%;

  // 侧边栏
  .sidebar {
    height: 100%;
    .hide-scroll;
  }

  // 内容区
  .content {
    height: 100%;
    .hide-scroll;
  }
}
</style>
