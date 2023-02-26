import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import type { ILoginForm } from '@/types/user'

export default function useHandleLogin(switchCaptcha: Function) {
  const loginForm = reactive({
    name: '',
    password: '',
    captcha: ''
  } as ILoginForm)
  const router = useRouter()

  // 监听提交
  const onSubmit = (form: ILoginForm) => {
    const userStore = useUserStore()
    userStore.loginAction(form, { router, switchCaptcha })
  }

  return {
    loginForm,
    onSubmit
  }
}
