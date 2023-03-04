<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  showPay: boolean
}>()
const emit = defineEmits(['update:showPay', 'okHandle'])

const password = '123456'
const value = ref('')
const errorInfo = ref('')
const show = ref()

watch(
  () => props.showPay,
  (value) => (show.value = value)
)

watch(value, (newValue) => {
  if (newValue.length === 6 && newValue !== password) {
    // 用户输入密码结束
    errorInfo.value = '密码错误 !'
    value.value = ''
  } else if (newValue.length === 6 && newValue === password) {
    errorInfo.value = ''
    emit('okHandle')
    emit('update:showPay', false)
  }
})

// 监听删除
const onDelete = () => {
  const va = value.value
  value.value = va.slice(0, va.length - 1)
}

const onClose = () => {
  value.value = ''
  emit('update:showPay', false)
}
</script>

<template>
  <!-- 输入密码的弹出层 -->
  <van-popup
    style="border-radius: 6px"
    v-model:show="show"
    @close="onClose"
    :style="{ height: '70vh', width: '96vw' }"
  >
    <van-password-input :value="value" :error-info="errorInfo" focused />

    <van-number-keyboard v-model="value" show @delete="onDelete" maxlength="6" />
  </van-popup>
</template>
