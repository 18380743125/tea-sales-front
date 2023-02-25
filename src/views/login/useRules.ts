import type { FieldRule } from 'vant'

export default function useRules() {
  // 验证规则
  const verifyCaptcha = (value: string) => (value.length === 4 ? true : false)
  const rules = {
    name: [
      { required: true, message: '请输入用户名' },
      { pattern: /^\w{4,16}$/, message: '用户名长度在4~16位内, 由字母、数字、下划线组成' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      {
        pattern: /^\w{5,17}$/,
        message: '密码长度在 6~18内, 由字母、数字、下划线组成'
      }
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
