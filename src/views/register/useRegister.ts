import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'
import { registerReq } from '@/service/modules/user'
import type { IRegisterForm } from '@/types/user'

export default function useRegister(switchCaptcha: Function) {
  const router = useRouter()
  const regForm = reactive({
    name: '',
    password: '',
    okpassword: '',
    captcha: ''
  } as IRegisterForm)

  function handleRegister(values: IRegisterForm) {
    registerReq(values).then((res) => {
      if (res.message === 'ok') {
        showSuccessToast('注册成功')
        setTimeout(() => router.push('/login'), 2000)
        return
      }
      switchCaptcha()
    })
  }

  return {
    regForm,
    handleRegister
  }
}
