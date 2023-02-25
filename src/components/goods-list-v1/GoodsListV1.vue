<script setup lang="ts">
import GoodsItemV1 from './GoodsItemV1.vue'

defineProps<{
  list: Record<string, any>[]
}>()
</script>
<template>
  <div class="list">
    <template v-for="item in list" :key="item.id">
      <GoodsItemV1 :item="item" />
    </template>
  </div>
</template>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 14px;
}
</style>
