<script setup lang="ts">
import { defineProps, computed, toRefs, ref, watch } from 'vue'
import type { UploaderInstance, UploaderFileListItem } from 'vant/lib/uploader'

import { router } from '@/router'
import { userAvatarUrl } from '@/utils/image.util'
import { changeAvatarReq } from '@/service/modules/user'
// import VipBar from './VipBar.vue'

const props = defineProps<{
  user: Record<string, any>
}>()
const { user } = toRefs(props)

const file = ref()
const fileRef = ref<UploaderInstance>()

// computed
const name = computed(() => user.value?.name || '请先登录')
const avatarUrl = computed(() => userAvatarUrl(user.value?.avatar))
const assets = computed(() => (user.value?.account || 0).toFixed(2))

// 上传头像
watch(file, async (newValue: UploaderFileListItem[]) => {
  const avatar = newValue[0].file as File
  await changeAvatarReq(avatar)
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
      <van-col class="col" span="8">
        <span class="num">{{ assets }}</span>
        <span class="unit">元</span>
        <div class="text">资产</div>
      </van-col>

      <!-- 红包 -->
      <van-col class="col" span="8">
        <span class="num">0.00</span>
        <span class="unit">元</span>
        <div class="text">红包</div>
      </van-col>

      <!-- 优惠卷 -->
      <van-col class="col" span="8">
        <span class="num">0</span>
        <span class="unit">张</span>
        <div class="text">优惠卷</div>
      </van-col>
    </van-row>

    <!-- 省钱会员 -->
    <!-- <VipBar /> -->
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
    color: #fff;
    margin-top: 24px;
    padding-bottom: 30px;
    .col {
      padding-left: 40px;
    }

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
      width: 100%;
    }
  }
}
</style>
