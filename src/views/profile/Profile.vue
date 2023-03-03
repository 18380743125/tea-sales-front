<script setup lang="ts">
import { ref, provide } from 'vue'
import { storeToRefs } from 'pinia'
import { showConfirmDialog, showToast } from 'vant'

import ProfileTop from './c-cpns/ProfileTop.vue'
import ProfileOrder from './c-cpns/ProfileOrder.vue'
import ProfileFunction from './c-cpns/ProfileFunction.vue'
import ProfileInfo from './c-cpns/ProfileInfo.vue'

import { logoutReq } from '@/service/modules/login'
import { localCache } from '@/utils/cache'
import { useUserStore } from '@/store/modules/user'
import { router } from '@/router'

const showInfo = ref(false)
const showTopUp = ref(false)

// store
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

// 获取用户信息
const fetchUser = () => userStore.fetchUserAction()

provide('fetchUser', fetchUser)
provide('user', user)

// 处理注销登录
const handleLogout = () => {
  showConfirmDialog({ title: '你确认要注销登录吗？' })
    .then(async () => {
      await logoutReq()
      localCache.clear()
      showToast('注销成功！')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    })
    .catch(() => {})
}
</script>

<template>
  <div class="profile">
    <!-- 个人信息 -->
    <ProfileInfo v-if="showInfo" v-model:show="showInfo" :user="user" />

    <!-- profile top -->
    <ProfileTop :user="user" />

    <!-- 我的订单 -->
    <ProfileOrder />

    <!-- 常用功能 -->
    <ProfileFunction v-model:showInfo="showInfo" />

    <div class="logout" @click="handleLogout">
      <van-button round block type="primary">退出登录</van-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.profile {
  position: relative;
  background-color: #f7f7f7;
  height: 100%;
  // 隐藏滚动条
  .hide-scroll;

  .logout {
    height: 50px;
    border-radius: 14px;
    margin: 90px auto 80px;
    width: 93%;
  }
}
</style>
