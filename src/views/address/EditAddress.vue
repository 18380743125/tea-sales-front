<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { showConfirmDialog, showToast } from 'vant'
import { areaList } from '@vant/area-data'
import useAddressStore from '@/store/modules/address'
import { createAddressReq, removeAddressReq, updateAddressReq } from '@/service/modules/address'
import { router } from '@/router'

// store
const addressStore = useAddressStore()
const { editAddress } = storeToRefs(addressStore)
const initialAddress = computed(() => {
  if (!editAddress.value) return {}
  const res = {} as Record<string, any>
  const area = editAddress.value.address.split(' ')
  res.addressDetail = area[1]
  res.province = area[0].split('/')[0]
  res.city = area[0].split('/')[1]
  res.county = area[0].split('/')[2]
  return { ...editAddress.value, ...res }
})

// 删除地址
const onDelete = () => {
  if (!editAddress.value) return
  showConfirmDialog({ title: '你确认删除该地址吗？' })
    .then(async () => {
      const result = await removeAddressReq(editAddress.value.id)
      if (result.message === 'ok') showToast('删除成功')
      setTimeout(async () => {
        await addressStore.fetchAddresses()
        router.back()
      }, 1000)
    })
    .catch(() => {})
}

// 保存地址
const onSave = async (values: Record<string, any>) => {
  const { province, city, county, addressDetail, ...r } = values
  let address = province + '/' + city + '/' + county + ' ' + addressDetail
  const data = {
    address,
    name: r.name,
    isDefault: (r.isDefault + 0).toString(),
    tel: r.tel
  }

  if (editAddress.value) {
    // 修改地址
    const res = await updateAddressReq(editAddress.value.id, data)
    if (res.message === 'ok') {
      showToast('保存成功')
      setTimeout(async () => {
        await addressStore.fetchAddresses()
        router.back()
      }, 1000)
    }
    return
  }

  // 新增
  createAddressReq(data).then((res) => {
    if (res.message !== 'ok') return
    showToast({ message: '新增成功' })
    setTimeout(async () => {
      await addressStore.fetchAddresses()
      router.back()
    }, 1000)
  })
}
</script>
<template>
  <div :class="['edit', 'top-page']">
    <!-- 返回图标 -->
    <div class="back" @click="$router.back()">
      <van-icon name="arrow-left" />
    </div>

    <van-address-edit
      :address-info="initialAddress"
      :area-list="areaList"
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :show-delete="!initialAddress.isDefault"
    />
  </div>
</template>

<style lang="less" scoped>
.edit {
  .back {
    position: fixed;
    top: 28px;
    left: 30px;
    color: #fff;
    font-size: 36px;
  }
}
</style>
