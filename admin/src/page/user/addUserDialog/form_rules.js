import { reactive } from 'vue'


const checkEmail = (rule, value, callback) => {
   const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
   if (reg.test(value)) return callback()

   callback(new Error('请输入合法的邮箱'))
}

const checkMobile = (rule, value, callback) => {
   const reg = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
   if (reg.test(value)) return callback()

   callback(new Error('请输入正确的电话'))
}

export const addRules = reactive({
   username: [
      { required: true, message: '请输入用户名', trigger: 'change' }
   ],
   password: [
      { required: true, message: '请输入密码', trigger: 'change' }
   ],
   email: [
      {
         required: true,
         message: '请输入邮箱',
         trigger: 'blur',
      },
      { validator: checkEmail, trigger: 'blur' },
   ],
   mobile: [
      {
         required: true,
         message: '请输入电话',
         trigger: 'blur',
      },
      { validator: checkMobile, trigger: 'blur' },
   ],

})

