import { reactive} from 'vue'

export const login_rules = reactive({
   username: [
      { required: true, message: '请输入用户名', trigger: 'change' }
   ],
   password: [
      { required: true, message: '请输入密码', trigger: 'change' }
   ]
})