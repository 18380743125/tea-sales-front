<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useOrderStore from '@/store/modules/order'
import { goodsImgUrl } from '@/utils/image.util'
import { createEvaluateReq } from '@/service/modules/evaluate'
import { showToast } from 'vant'
import { router } from '@/router'

const star = ref(0)
const content = ref('')
const fileList = ref([])

const orderStore = useOrderStore()
const { operationOrder } = storeToRefs(orderStore)

const onSubmit = async () => {
  if (star.value === 0 || content.value.trim() === '' || fileList.value.length === 0) {
    showToast('请填写完整评论内容~')
    return
  }
  const data: any = { orderId: operationOrder.value.id, star: star.value, content: content.value }
  const imgs = fileList.value.map((item: any) => item.file)
  const result = await createEvaluateReq(imgs, data)
  if (result.message === 'ok') {
    showToast('评价成功')
    setTimeout(async () => {
      await orderStore.fetchOrdersAction()
      router.back()
    }, 1000)
  }
}
</script>
<template>
  <div class="evaluate">
    <!-- 导航条 -->
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title><span style="letter-spacing: 1px">评价晒单</span></template>
    </van-nav-bar>

    <!-- 商品基本信息 -->
    <div class="info" v-if="operationOrder">
      <div class="left">
        <img class="img" lazy-load v-lazy="goodsImgUrl(operationOrder.goods.imgs[0])" />
      </div>
      <div class="right">
        <div class="params">
          <span class="name">{{ operationOrder.goods.name }}</span>
          <span>{{ operationOrder.goods.weight }}</span>
        </div>
        <div class="rate">
          <van-rate allow-half v-model="star" />
        </div>
      </div>
    </div>

    <div class="content">
      <van-field
        v-model="content"
        rows="3"
        autosize
        type="textarea"
        placeholder="客观真实的评价能帮助用户做决策"
        show-word-limit
        maxlength="300"
      />

      <div class="imgs">
        <van-uploader max-count="10" v-model="fileList" />
      </div>
    </div>
    <div class="btn">
      <van-button @click="onSubmit" style="border-radius: 20px; height: 38px" type="primary" block
        >提交评价</van-button
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.evaluate {
  height: 100%;
  background-color: #f5f5f5;
}
.info {
  height: 160px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 20px;
  .left img {
    width: 130px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .params .name {
    margin-right: 20px;
  }
  .right {
    margin-left: 20px;
    .rate {
      padding-top: 10px;
    }
  }
}

.content {
  border-top: 8px solid #f5f5f5;

  .imgs {
    background-color: #fff;
    padding: 20px 10px;
  }
}

.btn {
  width: 96%;
  padding-left: 2%;
  position: fixed;
  bottom: 0;
}
</style>
