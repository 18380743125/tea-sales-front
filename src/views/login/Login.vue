<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCaptcha from '@/hooks/useCaptcha'
import useLoginVerify from './useLoginVerify'
import useHandleLogin from './useHandleLogin'

const router = useRouter()

// 登录按钮是否激活
let isCanClick = ref(false)
// 表单的实例对象
let loginRef = ref(null)

// 点击导航栏的返回图标
const onClickLeft = () => history.back()

// 当每个字段失去焦点时触发, 控制登录按钮是否激活
const handleBlur = () => {
  const loginRefVal: any = loginRef.value
  loginRefVal.validate(['uname', 'pwd', 'vc']).then(
    () => {
      isCanClick.value = true
    },
    () => {
      isCanClick.value = false
    }
  )
}
// 验证码的一系列操作
let { vcImg, switchVcImg } = useCaptcha()
// 初始化验证码
switchVcImg()
// 验证规则
const { rules } = useLoginVerify()
// 去登陆
const { uname, pwd, verifyCode, onSubmit } = useHandleLogin(router, switchVcImg, isCanClick)
</script>

<template>
  <div class="wrapper">
    <!-- 自定义导航栏主题 -->
    <NavBarTheme>
      <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    </NavBarTheme>

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
    <div class="login">
      <van-form colon @submit="onSubmit" ref="loginRef" validate-first submit-on-enter>
        <van-cell-group inset>
          <van-field
            v-model="uname"
            name="uname"
            label="用户名"
            placeholder="请输入用户名"
            clearable
            required
            :rules="rules.uname"
            @blur="handleBlur"
          />
          <van-field
            v-model="pwd"
            type="password"
            name="pwd"
            label="密码"
            placeholder="请输入密码"
            clearable
            required
            :rules="rules.pwd"
            @blur="handleBlur"
          />
          <van-field
            v-model="verifyCode"
            name="vc"
            label="验证码"
            placeholder="请输入验证码"
            clearable
            required
            :rules="rules.captcha"
            @blur="handleBlur"
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
            <van-button :disabled="!isCanClick" round block type="primary" native-type="submit">
              登录
            </van-button>
          </van-config-provider>
        </div>
      </van-form>

      <!-- 去注册 -->
      <van-row justify="center">
        <van-col>
          <div class="register">
            <span>还没有账号? </span>
            <router-link to="/register" style="color: #fe8e50">马上注册</router-link>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  position: relative;
  // 欢迎词
  .welcome {
    position: relative;
    .text {
      color: #504f52;
      margin-left: 60px;
      height: 240px;
      line-height: 240px;
      font-size: 50px;
      position: relative;
      z-index: 2;
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
  // .login {
  // }
  // 忘记密码
  .forget {
    position: relative;
    margin-left: 20px;
    color: #4aa1fc;
    text-align: center;
    font-size: 30px;
    margin-top: 46px;
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
}
</style>
