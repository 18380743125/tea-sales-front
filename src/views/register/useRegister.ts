import { reactive } from 'vue'
import { Toast } from 'vant'
import type { IRegisterForm } from '@/types/user'

export default function useRegister(switchCaptcha: Function) {
  const regForm = reactive({
    name: '',
    password: '',
    okpassword: '',
    captcha: ''
  } as IRegisterForm)

  function handleRegister() {}
  return {
    regForm,
    handleRegister
  }
}
