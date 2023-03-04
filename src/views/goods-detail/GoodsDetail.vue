<script setup lang="ts">
import GoodsItemV2 from '@/components/goods-list-v2/GoodsItemV2.vue'
import { getGoodsByIdReq } from '@/service/modules/goods'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const details = ref()
const route = useRoute()

onMounted(async () => {
  const id = route.params.id as any as number
  const result = await getGoodsByIdReq(id)
  if (result.message === 'ok') {
    console.log(result)
    details.value = result.data
  }
})
</script>

<template>
  <div :class="['details']" v-if="details">
    <!-- 返回图标 -->
    <div class="back" @click="$router.back()">
      <van-icon name="arrow-left" />
    </div>

    <GoodsItemV2 :item="details" />
  </div>
</template>

<style lang="less" scoped>
.detail {
  position: relative;
}

.back {
  position: fixed;
  top: 28px;
  left: 28px;
  color: #fff;
  font-size: 36px;
  z-index: 9;
}
</style>
