<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'vant'
import useCaptcha from '@/hooks/useCaptcha'
import useFormDisable from '@/hooks/useFormDisable'
import useRegister from './useRegister'
import useRules from './useRules'

const registerRef = ref<FormInstance>()

// hooks
const { isCanClick, handleBlur } = useFormDisable(registerRef, 4)
const { captchaUrl, switchCaptcha } = useCaptcha()

const onClickLeft = () => history.back()

switchCaptcha()

// hooks
const { regForm, handleRegister } = useRegister(switchCaptcha)
const { rules } = useRules(regForm)
</script>

<template>
  <!-- 导航条 -->
  <van-nav-bar left-arrow @click-left="onClickLeft">
    <template #title><span style="letter-spacing: 1px">注册</span></template>
  </van-nav-bar>

  <div class="register">
    <van-form colon @submit="handleRegister" ref="registerRef">
      <van-cell-group inset>
        <van-field
          :border="false"
          class="bottom-line"
          v-model="regForm.name"
          name="name"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          required
          :rules="rules.name"
          @blur="handleBlur"
        />
        <van-field
          :border="false"
          class="bottom-line"
          v-model="regForm.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          clearable
          required
          :rules="rules.password"
          @blur="handleBlur"
        />
        <van-field
          :border="false"
          class="bottom-line"
          v-model="regForm.okpassword"
          type="password"
          name="okpassword"
          label="确认密码"
          placeholder="请再次输入密码"
          clearable
          required
          :rules="rules.okpassword"
          @blur="handleBlur"
        />
        <div :class="['captcha', 'bottom-line']">
          <van-field
            class="input"
            v-model="regForm.captcha"
            name="captcha"
            label="验证码"
            placeholder="请输入验证码"
            clearable
            required
            :rules="rules.captcha"
            @blur="handleBlur"
          />
          <van-image
            class="captcha-img"
            radius="10"
            round
            fit="fill"
            :src="captchaUrl"
            @click="switchCaptcha"
          />
        </div>
      </van-cell-group>

      <!-- 注册按钮 -->
      <div style="margin: 16px">
        <van-config-provider>
          <van-button :disabled="!isCanClick" round block type="primary" native-type="submit">
            <span style="letter-spacing: 2px">注册</span>
          </van-button>
        </van-config-provider>
      </div>
    </van-form>
  </div>
</template>

<style lang="less" scoped>
.register {
  margin-top: 60px;

  // 验证码
  .captcha {
    position: relative;
    .input {
      width: 66%;
      z-index: 2;
    }
    .captcha-img {
      position: absolute;
      z-index: 1;
      height: 90px;
      top: -14px;
      right: -16px;
    }
  }

  .bottom-line {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 26px;
  }
}
</style>
