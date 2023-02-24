import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { useUserStore } from '@/store/user'
import type { Ref } from 'vue'
import type { ILoginForm } from '@/types/user'

export default function useHandleLogin(switchCaptcha: Function, isCanClick: Ref<boolean>) {
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
