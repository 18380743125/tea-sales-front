<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import { areaList } from '@vant/area-data'
const searchResult = ref([])

const onSave = () => showToast('save')
const onDelete = () => showToast('delete')
const onChangeDetail = (val) => {
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区'
      }
    ]
  } else {
    searchResult.value = []
  }
}
</script>
<template>
  <div class="edit">
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<style lang="less" scoped></style>
