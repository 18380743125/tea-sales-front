<script setup lang="ts"></script>
<template>
  <div class="function">
    <h4 class="title">常用功能</h4>
    <van-cell-group>
      <van-cell is-link title="充值" />
      <van-cell title="个人信息" is-link />
      <van-cell title="个人名片" is-link />
      <van-cell title="二维码" is-link />
    </van-cell-group>
  </div>
</template>

<style lang="less" scoped>
.function {
  background-color: #fff;
  border-radius: 14px;
  width: 98%;
  margin: -40px auto;
  .title {
    margin: 40px 0 20px 20px;
  }
}
</style>
