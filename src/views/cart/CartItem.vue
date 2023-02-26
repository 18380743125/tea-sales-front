<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { goodsImgUrl } from '@/utils/goods.util'

const emits = defineEmits(['checkChange', 'countChange'])

const props = defineProps<{
  item: Record<string, any>
}>()

const checked = ref(props.item.checked)
const count = ref(props.item.count)

// checked 变化
const onCheckChange = (checked: number) => {
  emits('checkChange', props.item.id, { goodsId: props.item.goods.id, checked })
}

// 数量增减
const onCountChange = (count: number) => {
  emits('countChange', props.item.id, { goodsId: props.item.goods.id, count })
}
</script>
<template>
  <van-row class="item">
    <!-- 选择框 -->
    <van-col span="2" class="check">
      <van-checkbox v-model="checked" @change="onCheckChange" icon-size="20px" />
    </van-col>

    <!-- 图片 -->
    <van-col span="5" class="img">
      <van-image :src="goodsImgUrl(item.goods.imgs[0])" width="80" radius="8px" />
    </van-col>

    <!-- 信息 -->
    <van-col span="14" class="info">
      <!-- 商品名称 -->
      <div class="name">{{ item.goods.name }}</div>

      <!-- 价格 -->
      <div class="price">
        <div class="real">
          <span class="symbol">￥</span
          >{{ (item.goods.price * item.goods.discount.rate).toFixed(2) }}
        </div>
        <div class="origin"><span class="symbol">￥</span>{{ item.goods.price }}</div>
      </div>

      <!-- 规格 -->
      <div class="weight">
        <span>规格: {{ item.goods.weight }}</span>
      </div>

      <!-- 数量 -->
      <div class="count">x{{ item.count }}</div>

      <!-- 步进器 -->
      <div class="stepper">
        <van-stepper
          disable-input
          max="99"
          integer
          v-model="count"
          @minus="onCountChange(-1)"
          @plus="onCountChange(1)"
          input-width="22px"
          button-size="22px"
        />
      </div>
    </van-col>
  </van-row>
</template>

<style lang="less" scoped>
.item {
  height: 220px;
  width: 99%;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  border-bottom: 6px solid #f5f5f5;
}
// check
.item .check {
  padding-left: 10px;
}
.item .img {
  position: relative;
  top: -6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
}
.item .info {
  margin-left: 22px;
  margin-top: -46px;
  .name {
    font-size: 28px;
    padding-top: 4px;
  }

  // 价格
  .price {
    padding: 10px 0;
    display: flex;
    color: red;
    font-size: 30px;

    .origin {
      position: relative;
      top: 2px;
      padding-left: 10px;
      font-size: 26px;
      color: #aaa;
      text-decoration: line-through;
    }

    .symbol {
      font-size: 22px;
    }
  }

  // 规格
  .weight {
    padding-bottom: 10px;
    font-size: 26px;
  }

  // count
  .count {
    position: absolute;
    top: 30px;
    right: 20px;
    color: #aaa;
    font-size: 26px;
  }
  .stepper {
    position: absolute;
    right: 20px;
    bottom: 28px;
  }
}
</style>
