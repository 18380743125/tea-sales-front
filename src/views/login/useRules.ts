import { ref } from 'vue'
import type { FormInstance } from 'vant'

export default function useRules() {
  const formRef = ref<FormInstance>() // 登录表单实例
  const isCanClick = ref(false) // 登录按钮是否可点击
  const passFields = {} // 记录验证字段

  const handleBlur = (e: FocusEvent) => {
    const name = e.target?.['name']

    formRef.value?.validate(name).then(
      () => {
        let isPass = true
        passFields[name] = true
        let count = 0
        for (const key in passFields) {
          if (!passFields[key]) {
            isPass = false
            break
          }
          count++
        }
        isCanClick.value = isPass && count === 3
      },
      () => {
        passFields[name] = false
        isCanClick.value = false
      }
    )
  }

  // 验证规则
  const verifyName = (value: string) => (value.length < 4 || value.length > 16 ? false : true)
  const verifyCaptcha = (value: string) => (value.length === 4 ? true : false)
  const rules = {
    name: [
      { required: true, message: '请输入用户名' },
      { validator: verifyName, message: '用户名长度在4~16字符内' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      {
        pattern: /^\w{5,17}$/,
        message: '密码长度在 6~18内, 由字母、数字和下划线组成'
      }
    ],
    captcha: [
      { required: true, message: '请输入验证码' },
      { validator: verifyCaptcha, message: '验证码为4位' }
    ]
  }

  return {
    rules,
    formRef,
    isCanClick,
    handleBlur
  }
}
