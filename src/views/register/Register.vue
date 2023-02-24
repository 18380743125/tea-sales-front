<script setup lang="ts">
import useCaptcha from '@/hooks/useCaptcha'
import useRegister from './useRegister'
import useRules from './useRules'

const onClickLeft = () => history.back() // 返回

let { captchaUrl, switchCaptcha } = useCaptcha()
switchCaptcha() // 验证码

// 使用注册的钩子函数
const { regForm, handleRegister } = useRegister(switchCaptcha)
// 表单校验规则
const { rules } = useRules(regForm)
</script>

<template>
  <!-- 导航条 -->
  <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />

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
          <van-button round block type="primary" native-type="submit"> 注册 </van-button>
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
