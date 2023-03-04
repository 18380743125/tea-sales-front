<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useAddressStore from '@/store/modules/address'
import { useCartStore } from '@/store/modules/cart'
import { goodsImgUrl } from '@/utils/image.util'
import Payment from './Payment.vue'
import { createOrdersReq } from '@/service/modules/order'
import { showToast } from 'vant'
import { router } from '@/router'
import { useUserStore } from '@/store/modules/user'
import { updateUserReq } from '@/service/modules/user'

const showPay = ref(false)

// store
const addressStore = useAddressStore()
const cartStore = useCartStore()
const userStore = useUserStore()
const { defaultAddress } = storeToRefs(addressStore)
const { totalRealMoney, checkGoods } = storeToRefs(cartStore)
const { user } = storeToRefs(userStore)

if (!defaultAddress.value) addressStore.fetchAddresses()

const title = computed(() => {
  return `收货人：${defaultAddress.value?.name} ${defaultAddress.value?.tel}`
})

const price = (item: any) => {
  return (item.count * item.goods.price * (item.goods?.discount?.rate || 1)).toFixed(2)
}

// 处理支付
const handlePay = async () => {
  const orders = [] as any[]
  for (const item of checkGoods.value) {
    orders.push({ goodsId: item.goods.id, count: item.count, money: Number(price(item)) })
  }

  if (user.value.account < totalRealMoney.value) {
    showToast({ message: '余额不足, 请充值' })
    return
  }
  const result = await createOrdersReq(defaultAddress.value.id, orders)
  if (result.message === 'ok') {
    showToast({ message: '下单成功' })
    setTimeout(async () => {
      cartStore.queryCartAction()
      await updateUserReq(user.value.id, { account: -+totalRealMoney.value })
      userStore.fetchUserAction()
      router.replace('/order')
    }, 1000)
  }
}
</script>
<template>
  <div :class="['order', 'top-page']">
    <!-- 返回图标 -->
    <div class="back" @click="$router.back()">
      <van-icon name="arrow-left" />
    </div>

    <div class="content">
      <van-cell class="address" :title="title" />

      <Payment v-model:show-pay="showPay" @ok-handle="handlePay" />

      <template v-for="item in checkGoods" :key="item.id">
        <van-card
          :num="item.count"
          :desc="item.goods.weight"
          :title="item.goods.name"
          :thumb="goodsImgUrl(item.goods.imgs[0])"
        >
          <template #price>
            <div class="price">
              <span class="symbol">￥</span>
              <span class="num">{{ price(item) }}</span>
            </div>
          </template>
        </van-card>
      </template>
    </div>

    <div class="pay">
      <div class="left">
        <span class="text">待支付：</span>
        <span style="font-size: 12px; color: red">￥</span>
        <span class="money">{{ totalRealMoney }}</span>
      </div>
      <van-button
        @click="showPay = true"
        class="btn"
        style="height: 34px; border-radius: 30px"
        type="primary"
        >立即支付</van-button
      >
    </div>
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

.content {
  height: 84%;
  .address {
    border-bottom: 1px solid #f5f5f5;
  }

  .price {
    color: red;
    position: relative;
    top: -4px;
  }
  .price .symbol {
  }
  .price .num {
    font-size: 28px;
  }
  .hide-scroll;
}

.pay {
  position: fixed;
  z-index: 1;
  background-color: #fff;
  border-top: 1px solid #f5f5f5;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;

  .left {
    text-align: right;
    flex: 1;
    .text {
      font-size: 28px;
    }
    .money {
      color: red;
    }
  }

  .btn {
    margin: 0 20px;
  }
}
</style>
