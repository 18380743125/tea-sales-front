<script setup lang="ts">
import { defineProps } from 'vue'
import type GoodsItemV2 from './GoodsItemV2.vue'

defineProps<{
  items: Record<string, any>[]
}>()
</script>
<template>
  <div class="list">
    <template v-for="item in items" :key="item.id">
      <GoodsItemV2 :item="item" />
    </template>
  </div>
</template>

<style lang="less" scoped></style>
