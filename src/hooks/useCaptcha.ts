import { ref } from 'vue'
import { BASE_URL } from '@/service/config'
import throttle from '@/utils/throttle'

export default function switchCaptcha() {
  const captchaUrl = ref(`${BASE_URL}/api/v1/auth/captcha?t=${Math.random()}`)

  // 切换验证码
  function switchCaptcha() {
    captchaUrl.value = `${BASE_URL}/api/v1/auth/captcha?t=${Math.random()}`
  }
  return {
    captchaUrl,
    switchCaptcha: throttle(switchCaptcha, 300, {})
  }
}
