import { ref } from 'vue'
import type { Ref } from 'vue'
import type { FormInstance } from 'vant'

export default function useFormDisable(formRef: Ref<FormInstance | undefined>, fieldCount: number) {
  const isCanClick = ref(false)
  const passFields = {} // 记录验证字段
  const handleBlur = async (e: FocusEvent) => {
    const name = e.target?.['name']
    formRef?.value?.validate(name).then(
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
        isCanClick.value = isPass && count === fieldCount
      },
      () => {
        passFields[name] = false
        isCanClick.value = false
      }
    )
  }

  return {
    isCanClick,
    handleBlur
  }
}
