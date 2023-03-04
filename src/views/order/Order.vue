<script setup lang="ts">
import { ref } from 'vue'
import useOrderStore from '@/store/modules/order'
import { storeToRefs } from 'pinia'
import { goodsImgUrl } from '@/utils/image.util'
import { getOrderStateText } from '@/utils/order.util'
import { showConfirmDialog, showToast } from 'vant'
import { updateOrderReq } from '@/service/modules/order'

// store
const orderStore = useOrderStore()
orderStore.fetchOrdersAction()
const { order, state } = storeToRefs(orderStore)
const avtive = ref(state)

const tabs = ['全部', '待发货', '待收货', '已完成', '已取消']

const handleSwitch = () => {
  orderStore.fetchOrdersAction()
}

// 取消订单
const cancelClick = (o: any) => {
  showConfirmDialog({ title: '你确认要取消吗？' })
    .then(() => {
      updateOrderReq(o.id, 4).then((res) => {
        if (res.message === 'ok') {
          showToast('取消成功！')
        }
        setTimeout(() => {
          orderStore.fetchOrdersAction()
        }, 1000)
      })
    })
    .catch(() => {})
}

// 确认收货
const okClick = (o: any) => {
  showConfirmDialog({ title: '你确认要收货吗？' })
    .then(() => {
      updateOrderReq(o.id, 3).then((res) => {
        if (res.message === 'ok') {
          showToast('收货成功！')
        }
        setTimeout(() => {
          orderStore.fetchOrdersAction()
        }, 1000)
      })
    })
    .catch(() => {})
}
</script>

<template>
  <div :class="['order', 'top-page']">
    <!-- 导航条 -->
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title><span style="letter-spacing: 1px">我的订单</span></template>
    </van-nav-bar>

    <van-tabs class="content" v-model:active="avtive" @change="handleSwitch">
      <van-tab v-for="(item, index) in tabs" :title="item" :key="index">
        <template v-for="(o, index) in order" :key="o.orderId">
          <van-row
            class="item"
            :style="{ marginBottom: index === order.length - 1 ? '46px' : '0' }"
          >
            <van-col class="img" span="6">
              <van-image :src="goodsImgUrl(o.goods.imgs[0])" width="80" radius="8px" />
            </van-col>

            <van-col span="16">
              <div class="name">{{ o.goods.name }}</div>
              <div class="price"><span style="font-size: 13px">￥</span>{{ o.money }}</div>
              <div class="count">x{{ o.count }}</div>
              <div class="state">
                {{ getOrderStateText(o.state) }}
              </div>
            </van-col>
          </van-row>

          <van-row align="center" class="btns">
            <van-col
              :style="{ top: index === order.length - 1 && order.length > 5 ? '-100px' : '-90px' }"
              class="cancel"
              v-show="o.state === '1'"
              span="7"
              offset="10"
            >
              <van-button @click="cancelClick(o)" size="small" style="height: 30px" type="warning"
                >取消订单</van-button
              >
            </van-col>
            <van-col
              :style="{ top: index === order.length - 1 ? '-100px' : '-50px' }"
              class="ok"
              :span="8"
              v-show="o.state === '2'"
            >
              <van-button @click="okClick(o)" size="small" type="success">确认收货</van-button>
            </van-col>
            <van-col
              :style="{ top: index === order.length - 1 ? '-100px' : '-50px' }"
              class="ok"
              :span="8"
              v-show="o.state === '3'"
            >
              <van-button size="small" type="success">去评价</van-button>
            </van-col>
          </van-row>
        </template>
        <van-empty v-show="!order.length" description="暂无记录"></van-empty>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="less" scoped>
.order {
  height: 100%;
  .content {
    height: 100%;
    .hide-scroll;
    position: relative;

    .item {
      position: relative;
      height: 220px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      .img {
        margin: 0 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .name {
        margin-top: -50px;
      }
      .price {
        color: red;
        padding: 10px 0;
      }
      .count {
        position: absolute;
        right: 30px;
        top: 40px;
        color: #999;
      }
      .state {
        position: absolute;
        top: 40px;
        right: 240px;
        color: #00df71;
      }
    }

    .btns {
      position: relative;
      .cancel {
        position: absolute;
        right: 30px;
        top: -100px;
      }

      .ok {
        position: absolute;
        top: -100px;
        right: 30px;
      }
    }
  }
}
</style>
