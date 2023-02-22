import { ref } from 'vue'
import type { Ref } from 'vue'
import { Toast } from 'vant'
import type { Router } from 'vue-router'

export default function useHandleLogin(router: Router, switchVcImg: Function, isCanClick: Ref) {
  // 用户名
  const uname = ref('')
  // 密码
  const pwd = ref('')
  // 验证码
  const verifyCode = ref('')

  // 登录成功之后获取用户信息
  const afterLogin = () => {}

  // 监听提交
  const onSubmit = (form: object) => {}

  return {
    uname,
    pwd,
    verifyCode,
    onSubmit
  }
}
