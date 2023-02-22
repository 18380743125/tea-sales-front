<script setup lang="ts">
import { useRouter } from 'vue-router'
import useCaptcha from '@/hooks/useCaptcha'
import useRegister from './useRegister'
import useRegisterVerify from './useRegisterVerify'

const router = useRouter()

// 点击导航栏的返回图标
const onClickLeft = () => history.back()

// 验证码的一系列操作
let { vcImg, switchVcImg } = useCaptcha()
// 初始化验证码
switchVcImg()

// 使用注册的钩子函数
const { rForm, handleRegister } = useRegister(router, switchVcImg)
// 表单校验规则
const { rules } = useRegisterVerify(rForm)
</script>

<template>
  <!-- 注册导航条 -->
  <NavBarTheme>
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
  </NavBarTheme>

  <div class="register">
    <van-form colon @submit="handleRegister" ref="registerRef">
      <van-cell-group inset>
        <van-field
          v-model="rForm.uname"
          name="uname"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          required
          :rules="rules.uname"
        />
        <van-field
          v-model="rForm.pwd"
          type="password"
          name="pwd"
          label="密码"
          placeholder="请输入密码"
          clearable
          required
          :rules="rules.pwd"
        />
        <van-field
          v-model="rForm.confirmPwd"
          type="password"
          name="confirmPwd"
          label="确认密码"
          placeholder="请再次输入密码"
          clearable
          required
          :rules="rules.confirmPwd"
        />
        <van-field
          v-model="rForm.captcha"
          name="vc"
          label="验证码"
          placeholder="请输入验证码"
          clearable
          required
          :rules="rules.captcha"
        >
          <template #button>
            <van-image
              radius="10"
              round
              width="106"
              height="40"
              fit="fill"
              :src="vcImg"
              @click="switchVcImg"
            />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-config-provider>
          <van-button round block type="primary" native-type="submit"> 注册 </van-button>
        </van-config-provider>
      </div>
    </van-form>
  </div>
</template>

<style lang="less">
.register {
  margin-top: 80px;
}
</style>
