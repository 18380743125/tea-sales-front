export default function useLoginVerify() {
  // 表单字段验证
  const verifyUname = (value: String) => (value.length < 4 || value.length > 16 ? false : true)
  // 验证码规则
  const verifyCaptcha = (value: String) => (value.length === 4 ? true : false)
  const rules = {
    // 用户名字符限制在 4 ~ 16 个以内
    uname: [
      { required: true, message: '请输入用户名' },
      { validator: verifyUname, message: '用户名限制在4~16字符内' }
    ],
    // 限制密码, 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    pwd: [
      { required: true, message: '请输入密码' },
      {
        pattern: /^[a-zA-Z]\w{5,17}$/,
        message: '密码以字母开头, 长度在6~18之间, 只能包含字母、数字和下划线'
      }
    ],
    captcha: [
      { required: true, message: '请输入验证码' },
      { validator: verifyCaptcha, message: '验证码为4位' }
    ]
  }
  return {
    rules
  }
}
