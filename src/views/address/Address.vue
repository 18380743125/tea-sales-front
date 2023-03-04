<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { router } from '@/router'
import useAddressStore from '@/store/modules/address'
import type { AddressListAddress } from 'vant'

const addressStore = useAddressStore()
addressStore.fetchAddresses()

const { addresses } = storeToRefs(addressStore)

const onAdd = () => {
  addressStore.editAddress = undefined
  router.push('/address/edit')
}
const onEdit = (item: AddressListAddress) => {
  addressStore.editAddress = item
  router.push('/address/edit')
}
</script>
<template>
  <div :class="['address', 'top-page']">
    <!-- 返回图标 -->
    <div class="back" @click="router.back()">
      <van-icon name="arrow-left" />
    </div>

    <van-empty v-if="!addresses.length" description="快去新增一个吧" />

    <van-address-list
      :list="addresses"
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
