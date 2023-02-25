import type { IRegisterForm } from '@/types/user'
import type { FieldRule } from 'vant'

export default function useRules(regForm: IRegisterForm) {
  // 验证规则
  const verifyCaptcha = (value: string) => (value.length === 4 ? true : false)
  const verifyOkPassword = (value: string) => regForm.password === value
  const rules = {
    name: [
      { required: true, message: '请输入用户名' },
      { pattern: /^\w{4,16}$/, message: '用户名长度在4~16位内, 由字母、数字、下划线组成' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      {
        pattern: /^\w{6,18}$/,
        message: '密码长度在6~18内, 由字母、数字和下划线组成'
      }
    ],
    okpassword: [
      { required: true, message: '请再次输入密码' },
      { validator: verifyOkPassword, message: '确认密码不一致' }
    ],
    captcha: [
      { required: true, message: '请输入验证码' },
      { validator: verifyCaptcha, message: '验证码为4位' }
    ]
  } as Record<string, FieldRule[]>
  return {
    rules
  }
}
