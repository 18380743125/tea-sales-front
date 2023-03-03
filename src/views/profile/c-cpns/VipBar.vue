<script setup lang="ts"></script>
<template>
  <van-row class="vip">
    <van-col span="16" offset="1" class="left">
      <div class="top">
        <van-icon size="26" color="#652c0c" name="vip-card" />
        <span class="text">省钱会员</span>
      </div>
      <div class="bottom">每月最高可省<span style="color: #e5854f"> 90 </span>元</div>
    </van-col>
    <van-col span="7" class="right">
      <van-button class="btn" color="linear-gradient(to right, #fe8b3a, #fd6d3b)"
        >立即开通</van-button
      >
    </van-col>
  </van-row>
</template>

<style lang="less" scoped>
// vip
.vip {
  height: 146px;
  background: linear-gradient(to bottom right, #ffe4c7, #fbd9b4, #fdd0a7, #ffbd8a, #fdc18d);
  width: 96%;
  margin: 36px auto;
  border-radius: 10px;
  border-top: 2px solid #fff;
  position: relative;
  top: 10px;
  .left {
    .top {
      padding-top: 12px;
      position: relative;
      .text {
        color: #652c0c;
        font-size: 28px;
        position: absolute;
        top: 24px;
        left: 60px;
      }
    }
    .bottom {
      color: #855634;
      margin-top: 12px;
      font-size: 32px;
    }
  }

  .right {
    margin-top: 36px;
    .btn {
      height: 60px;
      border-radius: 40px;
      font-size: 26px;
      overflow: hidden;
    }
  }
}
</style>
