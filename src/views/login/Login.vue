<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'vant'
import useCaptcha from '@/hooks/useCaptcha'
import useFormDisable from '@/hooks/useFormDisable'
import useRules from './useRules'
import useLogin from './useLogin'
const formRef = ref<FormInstance>() // 登录表单实例
const onClickLeft = () => history.back() // 返回点击

// hooks
// 验证码
let { captchaUrl, switchCaptcha } = useCaptcha()
switchCaptcha()

// 表单规则
const { rules } = useRules()
const { isCanClick, handleBlur } = useFormDisable(formRef, 3)

// 登录
const { loginForm, onSubmit } = useLogin(switchCaptcha)
</script>

<template>
  <div class="wrapper">
    <!-- 导航条 -->
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #title><span style="letter-spacing: 1px">登录</span></template>
    </van-nav-bar>

    <!-- 欢迎 -->
    <div class="welcome">
      <van-row>
        <van-col>
          <div class="text">欢迎回来!</div>
          <div class="bg-welcome">LOGIN</div>
        </van-col>
      </van-row>
    </div>

    <!-- 登录表单 -->
    <van-form class="login" colon submit-on-enter ref="formRef" @submit="onSubmit">
      <van-cell-group inset>
        <!-- 用户名 -->
        <van-field
          class="bottom-line"
          :border="false"
          v-model="loginForm.name"
          name="name"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          required
          :rules="rules.name"
          @blur="handleBlur"
        />
        <!-- 密码 -->
        <van-field
          class="bottom-line"
          :border="false"
          v-model="loginForm.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          clearable
          required
          :rules="rules.password"
          @blur="handleBlur"
        />
        <!-- 验证码 -->
        <div :class="['captcha', 'bottom-line']">
          <van-field
            :border="false"
            class="input"
            v-model="loginForm.captcha"
            name="captcha"
            label="验证码"
            placeholder="请输入验证码"
            required
            clearable
            :rules="rules.captcha"
            @blur="handleBlur"
          >
          </van-field>
          <van-image
            class="captcha-img"
            radius="10"
            fit="fill"
            :src="captchaUrl"
            @click="switchCaptcha"
          />
        </div>
      </van-cell-group>

      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button
          style="letter-spacing: 2px"
          :disabled="!isCanClick"
          round
          block
          type="primary"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>

    <!-- 去注册 -->
    <van-row justify="center">
      <van-col>
        <div class="register">
          <span>还没有账号? </span>
          <router-link to="/register">马上注册</router-link>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  // 欢迎词
  .welcome {
    position: relative;
    .text {
      color: #a0a0a0;
      margin-left: 60px;
      height: 240px;
      line-height: 240px;
      font-size: 50px;
      position: relative;
      z-index: 1;
      letter-spacing: 6px;
    }
    .bg-welcome {
      color: #f8f8f8;
      font-size: 120px;
      position: absolute;
      top: 50px;
      left: 0;
    }
  }
  // 登录模块
  .login {
    .captcha {
      position: relative;
      .input {
        width: 67%;
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
  }

  // 去注册
  .register {
    font-size: 32px;
    text-align: center;
    margin-top: 230px;
    &.span {
      color: #686d76;
    }
    a {
      color: #48a4fd;
      margin-left: 26px;
    }
  }

  .bottom-line {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20px;
  }
}
</style>
