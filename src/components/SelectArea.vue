<script setup lang="ts">
import { ref } from 'vue'
import { areaList } from '@vant/area-data'

const props = defineProps<{
  showArea: boolean
}>()
const showArea = ref(props.showArea)

defineEmits(['update:showArea'])

const okSelect = () => {}
</script>
<template>
  <div class="area">
    <van-popup v-model:show="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="okSelect"
        @cancel="$emit('update:showArea', false)"
      />
    </van-popup>
  </div>
</template>

<style lang="less" scoped></style>
