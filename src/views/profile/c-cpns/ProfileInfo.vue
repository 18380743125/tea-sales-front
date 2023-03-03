<script setup lang="ts">
import { onUnmounted, reactive, toRaw, inject } from 'vue'
import { useMainStore } from '@/store/modules/main'
import { phoneReg } from '@/utils/regex'
import type { IUpdateUser } from '@/types/user'
import { updateUserReq } from '@/service/modules/user'
import { showToast } from 'vant'

const rules = {
  phone: [
    { required: true, message: '请输入手机号' },
    {
      pattern: phoneReg,
      message: '手机号格式错误'
    }
  ],
  age: [
    { required: true, message: '请输入年龄' },
    {
      validator: (value: number) => (value >= 0 && value <= 199 ? true : false),
      message: '年龄限制到1~199'
    }
  ]
}

const props = defineProps<{
  show: boolean
  user: Record<string, any>
}>()
const emit = defineEmits(['update:show'])
const user = toRaw(props.user)
const fetchUser = inject('fetchUser') as Function

const info = reactive({
  name: user.name,
  gender: user.gender,
  age: user.age,
  phone: user.phone
})

const mainStore = useMainStore()
mainStore.title = '个人信息'

onUnmounted(() => {
  mainStore.title = '我的'
})

// 保存
const saveClick = async (values: IUpdateUser) => {
  values.age = parseInt(values.age as string)
  const result = await updateUserReq(user.id, values)
  if (result.message === 'ok') {
    showToast('保存成功')
    setTimeout(() => {
      fetchUser?.()
      emit('update:show', false)
    }, 2000)
  }
}
</script>
<template>
  <div :class="['info', 'top-page']">
    <!-- 返回图标 -->
    <div class="back" @click="emit('update:show', false)">
      <van-icon name="arrow-left" />
    </div>

    <!-- 表单 -->
    <van-form @submit="saveClick">
      <van-cell-group inset>
        <van-field v-model="info.name" name="name" label="用户名" disabled />
        <van-field
          v-model="info.phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="rules.phone"
          style="margin-top: 10px"
        />

        <van-field
          style="margin-top: 10px"
          v-model="info.age"
          name="age"
          label="年龄"
          placeholder="请输入年龄"
          :rules="rules.age"
        />

        <van-field name="gender" label="单选框" style="margin-top: 10px">
          <template #input>
            <van-radio-group v-model="info.gender" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>

      <!-- 按钮 -->
      <div class="save">
        <van-button
          class="btn"
          style="height: 40px; border-radius: 4px"
          type="primary"
          native-type="submit"
          block
          >保存</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<style lang="less" scoped>
.info {
  padding-top: 30px;
  .back {
    position: fixed;
    top: 28px;
    left: 30px;
    color: #fff;
    font-size: 36px;
  }

  .save {
    width: 96%;
    margin: 0 auto;
    margin-top: 60px;
  }
}
</style>
