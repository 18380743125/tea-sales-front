<script setup lang="ts"></script>
<template>
  <div class="cart-bar">
    <div class="left">
      <van-badge :content="5">
        <van-icon name="cart" />
      </van-badge>
    </div>
    <div class="right">
      <div class="money"><span style="font-size: 15px">￥</span>33.9</div>
      <div class="btn">去支付</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cart-bar {
  position: fixed;
  bottom: 88px;
  width: 100%;
  height: 96px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .left {
    width: 280px;
    color: var(--van-primary-color);
    font-size: 50px;
  }

  .right {
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    padding-right: 50px;
    justify-content: flex-end;

    .money {
      color: red;
      font-size: 35px;
    }

    .btn {
      margin-left: 20px;
      padding: 0 44px;
      width: 100px;
      height: 75%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 50px;
      background-color: var(--van-primary-color);
    }
  }
}
</style>
