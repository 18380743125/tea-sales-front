<script setup lang="ts">
import { defineProps, computed, toRefs, ref, watch, toRaw } from 'vue'
import type { UploaderInstance, UploaderFileListItem } from 'vant/lib/uploader'

import { router } from '@/router'
import { userAvatarUrl } from '@/utils/image.util'
import { changeAvatarReq } from '@/service/modules/user'

const props = defineProps<{
  user: Record<string, any>
  fetchUser: Function
}>()
const { user } = toRefs(props)
const { fetchUser } = toRaw(props)

const file = ref()
const fileRef = ref<UploaderInstance>()

// computed
const name = computed(() => user.value.name || '请先登录')
const avatarUrl = computed(() => userAvatarUrl(user.value.avatar))

// 上传头像
watch(file, async (newValue: UploaderFileListItem[]) => {
  const avatar = newValue[0].file as File
  await changeAvatarReq(avatar)
  fetchUser()
})

// 更换头像
const changeAvatar = () => {
  fileRef.value?.chooseFile()
}

// 去登录
const goLogin = () => {
  if (user.value) return
  else router.push('/login')
}
</script>
<template>
  <div class="info">
    <!-- 头像、用户名 -->
    <van-row class="avatar" @click="goLogin">
      <van-col span="4" offset="1">
        <van-image @click.stop="changeAvatar" :src="avatarUrl" class="img" radius="6" />
        <van-uploader ref="fileRef" v-show="false" v-model="file" />
      </van-col>
      <van-col class="text">{{ name }}</van-col>
    </van-row>

    <!-- 金额相关 -->
    <van-row class="assets">
      <!-- 资产 -->
      <van-col span="6">
        <span class="num">120</span>
        <span class="unit">元</span>
        <div class="text">资产</div>
      </van-col>

      <!-- 红包 -->
      <van-col span="6" offset="2">
        <span class="num">0.00</span>
        <span class="unit">元</span>
        <div class="text">红包</div>
      </van-col>

      <!-- 优惠卷 -->
      <van-col span="6" offset="2">
        <span class="num">0</span>
        <span class="unit">张</span>
        <div class="text">优惠卷</div>
      </van-col>
    </van-row>

    <!-- 省钱会员 -->
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
  </div>
</template>

<style lang="less" scoped>
.info {
  background: linear-gradient(to bottom right, #8adf71, #7adf71, #5adf71, #4adf71, #3adf71);

  // 头像
  .avatar {
    padding-top: 40px;
    .img {
      width: 120px;
      object-fit: cover;
    }
    .text {
      color: #fff;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  // 资产
  .assets {
    text-align: center;
    color: #fff;
    margin-top: 24px;
    .num {
      font-size: 34px;
    }
    .unit {
      font-size: 22px;
      margin-left: 6px;
    }
    .text {
      font-size: 32px;
      margin-top: 6px;
    }
  }

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
}
</style>
