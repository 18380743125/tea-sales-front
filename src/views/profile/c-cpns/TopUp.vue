<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { showToast, closeToast } from 'vant'
import { updateUserReq } from '@/service/modules/user'
import { useUserStore } from '@/store/modules/user'

const props = defineProps<{
  showTopUp: boolean
}>()
const emit = defineEmits(['update:showTopUp'])

const showTopUp = ref(props.showTopUp)
const user = inject<Ref<Record<string, any>>>('user')
const userStore = useUserStore()

// 输入的金额
const money = ref('')

const addBalance = async () => {
  const value = money.value
  if ((value ?? '') === '') return showToast({ message: '请输入充值金额' })
  if (parseFloat(value) > 5000 || parseFloat(value) < 0) {
    money.value = ''
    return showToast({ message: '请按规则充值 !' })
  }

  const result = await updateUserReq(user?.value.id, { account: value })
  if (result.message === 'ok') {
    closeToast()
    await userStore.fetchUserAction()
    showToast({ message: '充值成功' })
    setTimeout(() => {
      emit('update:showTopUp', false)
    }, 300)
  }
}
</script>

<template>
  <van-popup class="popup" @close="$emit('update:showTopUp', false)" v-model:show="showTopUp">
    <div class="title">充值</div>

    <van-form @submit="addBalance">
      <!-- 用户名 -->
      <div class="name">用户名：{{ user?.name }}</div>

      <!-- 表单 -->
      <van-cell-group inset>
        <van-field
          v-model.number="money"
          type="number"
          name="money"
          label="充值金额(元)"
          placeholder="请输入金额"
        />
      </van-cell-group>

      <!-- 规则 -->
      <div class="remark">*充值规则: 每次最多充值5000。</div>

      <!-- 按钮 -->
      <div class="btn">
        <van-button style="height: 32px" size="normal" type="primary" native-type="submit"
          >充值</van-button
        >
      </div>
    </van-form>
  </van-popup>
</template>

<style lang="less" scoped>
.popup {
  height: 50vh;
  width: 96vw;
}
// 弹出层标题
.title {
  padding: 20px 0;
  text-align: center;
  font-size: 34px;
  color: #888;
}
// 用户名
.name {
  padding: 10px 0 30px 66px;
  font-size: 28px;
  color: #666;
}

// 充值说明
.remark {
  font-size: 28px;
  margin: 30px 0 30px 60px;
  color: #fe5753;
  letter-spacing: 2px;
}

// 按钮
.btn {
  display: flex;
  justify-content: flex-end;
  padding-right: 26px;
  margin: 26px 0;
}
</style>
