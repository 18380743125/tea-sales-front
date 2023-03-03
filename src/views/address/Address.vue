<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import type { AddressListAddress } from 'vant'
import { router } from '@/router'
import useAddressStore from '@/store/modules/address'
import type EditAddressVue from './EditAddress.vue'

const showEdit = ref(false)
const addressStore = useAddressStore()
addressStore.fetchAddresses()

const { addresses } = storeToRefs(addressStore)

const onAdd = () => showToast('新增地址')
const onEdit = (item, index) => showToast('编辑地址:' + index)
</script>
<template>
  <div :class="['address', 'top-page']">
    <!-- 返回图标 -->
    <div class="back" @click="router.back()">
      <van-icon name="arrow-left" />
    </div>

    <EditAddressVue v-if="showEdit" v-model:showEdit="showEdit" />

    <van-address-list
      :list="addresses as AddressListAddress[]"
      default-tag-text="默认地址"
      :switchable="false"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<style lang="less" scoped>
.back {
  position: fixed;
  top: 28px;
  left: 30px;
  color: #fff;
  font-size: 36px;
}
</style>
