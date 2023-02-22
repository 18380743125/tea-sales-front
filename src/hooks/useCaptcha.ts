import { ref } from 'vue'

export default function switchCaptcha() {
  // 验证码图片链接
  const vcImg = ref('')
  // 切换验证码
  function switchVcImg() {}
  return {
    vcImg,
    switchVcImg
  }
}
