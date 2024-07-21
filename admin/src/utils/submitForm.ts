import { ElMessage } from "element-plus"

/**
 * 验证表单
 * @param {*} ref 表单组件ref
 */
export async function submitForm(ref) {
   await ref.value.validate(async (valid, fields) => {
         if (!valid) throw new Error('表单填写错误')
         return
   })
}