<script setup lang="ts">
import { ref } from 'vue'

const active = ref<number>(0)
</script>

<template>
  <van-tabbar v-model="active" route :border="false">
    <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/profile" icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
