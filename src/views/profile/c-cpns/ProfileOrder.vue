<script setup lang="ts">
import useOrderStore from '@/store/modules/order'
import { router } from '@/router'

const orderStore = useOrderStore()

const goOrder = (state = 0) => {
  orderStore.state = state
  router.push('/order')
}
</script>
<template>
  <div class="order">
    <!-- title -->
    <van-row class="title">
      <van-col span="6">我的订单</van-col>
      <van-col span="8" offset="10" class="all">
        <span @click="goOrder(0)">查看全部</span>
        <van-icon class="icon" name="arrow" size="13" />
      </van-col>
    </van-row>

    <!-- order status -->
    <van-grid :border="false" :column-num="4">
      <van-grid-item text="待发货">
        <template #icon>
          <van-icon @click="goOrder(1)" name="send-gift-o" color="#00df71" size="30" />
        </template>
      </van-grid-item>
      <van-grid-item text="待收货">
        <template #icon>
          <van-icon @click="goOrder(2)" name="logistics" color="#00df71" size="30" />
        </template>
      </van-grid-item>
      <van-grid-item text="已完成">
        <template #icon>
          <van-icon @click="goOrder(3)" name="chat-o" color="#00df71" size="30" />
        </template>
      </van-grid-item>
      <van-grid-item text="已取消">
        <template #icon>
          <van-icon @click="goOrder(4)" name="pause-circle-o" color="#00df71" size="30" />
        </template>
      </van-grid-item>
      <!-- <van-grid-item text="退货服务">
        <template #icon>
          <van-icon name="tosend" color="#00df71" size="30" />
        </template>
      </van-grid-item> -->
    </van-grid>
  </div>
</template>

<style lang="less" scoped>
.order {
  background-color: #fff;
  width: 98%;
  border-radius: 16px;
  height: 252px;
  margin: 0 auto;
  margin-top: 8px;

  .title {
    padding: 30px 32px 24px;
    border-bottom: 1px solid #f5f5f5;
    .all {
      text-align: right;
      color: #a0a0a0;
      font-size: 27px;
    }
  }
}
</style>
