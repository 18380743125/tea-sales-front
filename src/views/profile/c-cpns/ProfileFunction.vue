<script setup lang="ts">
import { ref } from 'vue'
import TopUp from './TopUp.vue'

defineEmits(['update:showInfo'])

const showTopUp = ref(false)
</script>

<template>
  <div class="function">
    <TopUp v-if="showTopUp" v-model:showTopUp="showTopUp" />

    <h4 class="title">常用功能</h4>
    <van-cell-group>
      <van-cell @click="showTopUp = true" is-link title="充值" />
      <van-cell @click="$emit('update:showInfo', true)" title="个人信息" is-link />
      <van-cell to="/address" title="收货地址" is-link />
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
