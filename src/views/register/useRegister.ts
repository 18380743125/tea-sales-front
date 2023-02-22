import { reactive } from 'vue'
import { Toast } from 'vant'
import type { Router } from 'vue-router'

export default function useRegister(router: Router, switchVcImg: Function) {
  const rForm = reactive({
    uname: '',
    pwd: '',
    confirmPwd: '',
    captcha: ''
  })

  function handleRegister() {}
  return {
    rForm,
    handleRegister
  }
}
