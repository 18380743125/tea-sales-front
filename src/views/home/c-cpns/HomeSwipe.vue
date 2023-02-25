<script setup lang="ts">
import { goodsImgUrl } from '@/utils/goods.util'

defineProps<{
  swipes: Record<string, any>[]
}>()
</script>

<template>
  <div class="swipe">
    <van-swipe class="images" autoplay="3000">
      <template v-for="item in swipes" :key="item.id">
        <van-swipe-item>
          <van-image height="200" width="420" fit="cover" :src="goodsImgUrl(item.img)" />
        </van-swipe-item>
      </template>
      <!-- 指示点 -->
      <template #indicator="{ active, total }">
        <div class="indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
  </div>
</template>

<style lang="less" scoped>
.indicator {
  position: absolute;
  right: 10px;
  bottom: 23px;
  padding: 4px 10px;
  font-size: 26px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
