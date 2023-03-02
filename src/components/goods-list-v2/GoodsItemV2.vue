<script setup lang="ts">
import { defineProps, inject } from 'vue'
import type { Ref } from 'vue'
import { useCartStore } from '@/store/modules/cart'
import { goodsImgUrl } from '@/utils/image.util'
import type CartBar from '@/components/CartBar.vue'

defineProps<{
  item: Record<string, any>
}>()

// inject
const cartBarRef = inject<Ref<InstanceType<typeof CartBar>>>('cartBarRef')
// store
const cartStore = useCartStore()

// 加入购物车
const addCart = (e: Event, item: Record<string, any>) => {
  const carts = item.carts
  if (carts.length === 0) carts.push({ count: 1 })
  else carts[0].count++
  cartStore.addCartAction({ goodsId: item.id, count: 1 })
  // 动画效果
  cartBarRef?.value.addCart(e.currentTarget as HTMLElement)
}

const realPrice = (item: Record<string, any>) =>
  ((item.discount?.rate || 1) * item.price).toFixed(2)
</script>
<template>
  <div class="item">
    <!-- 图片 -->
    <img class="img" lazy-load v-lazy="goodsImgUrl(item.imgs[0])" />

    <div class="content">
      <!-- 商品名称、规格 -->
      <div class="brief">
        <div class="name">{{ item.name }}</div>
        <div class="weight">{{ item.weight }}</div>
      </div>

      <!-- 评价 -->
      <div class="evaluate">还没有评论</div>

      <!-- 价格 -->
      <div class="price">
        <div class="real"><span class="symbol">￥</span>{{ item && realPrice(item) }}</div>
        <div v-if="!item.discount" class="origin">
          <span class="symbol">￥</span>{{ (item.price * 1).toFixed(2) }}
        </div>
      </div>

      <!-- 销量、库存 -->
      <div class="remark">
        <div class="sales">{{ item.saleNums }}人付款</div>
        <div class="stock">
          库存 <span class="num">{{ item.stock }}</span>
        </div>
      </div>

      <!-- 额外信息 -->
      <div class="extra">
        <div class="desc">{{ item.description }}</div>
        <div class="cart" @click="addCart($event, item)">
          <van-badge :show-zero="false" :content="item?.carts[0]?.count ?? 0" :max="99">
            <van-icon name="shopping-cart-o" />
          </van-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.item {
  width: 100%;
  background-color: #fff;
  margin-bottom: 6px;
  display: flex;

  .img {
    width: 39%;
    object-fit: cover;
  }

  .content {
    padding: 8px 10px;
    flex: 1;
  }

  .brief {
    padding-bottom: 14px;
    display: flex;
    font-size: 27px;
    .weight {
      margin-left: 10px;
    }
  }

  // 评价
  .evaluate {
    color: #999;
    font-size: 18px;
  }
  // 价格
  .price {
    padding: 14px 0;
    margin-left: -6px;
    display: flex;
    align-items: center;
    font-size: 30px;
    color: red;
    .origin {
      padding-left: 16px;
      font-size: 26px;
      color: #999;
      text-decoration: line-through;
    }
    .symbol {
      font-size: 26px;
    }
  }

  // 销量、库存
  .remark {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    color: #999;
    .stock {
      padding-right: 10px;
    }
    .stock .num {
      position: relative;
      top: 2px;
    }
  }

  // 等级、购物车按钮
  .extra {
    padding: 28px 0 6px;
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    .cart {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin-right: 12px;
      padding: 9px;
      border-radius: 50%;
      color: #eee;
      position: relative;
      top: -8px;
      background-color: var(--van-primary-color);
    }
  }
}
</style>
