<script setup>
import { ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';

import { edit_rules } from './form_rules'
import { request } from '@@/utils/server'
import { submitForm } from '@@/utils/submitForm'

const edit_user_form_ref = ref()

const props = defineProps({
   userInfo: Object
})

const edit_form = reactive(
   props.userInfo
)

const emit = defineEmits(['close_edit_dialog_event', 'update_user_list_event'])


const clickSubmit = async () => {
   try {
      await submitForm(edit_user_form_ref)
      await request({
         method: 'put',
         url: `/users/${edit_form.id}`,
         data: {
            email: edit_form.email,
            mobile: edit_form.mobile
         }
      })
      ElMessage({
         showClose: true,
         message: '用户信息修改成功',
         center: true,
         type: 'success',
      })
      emit('close_edit_dialog_event')
      emit('update_user_list_event')
   } catch (error) {
      ElMessage({
         showClose: true,
         message: error.message,
         center: true,
         type: 'error',
      })
   }

}

</script>

<template>
   <el-form ref="edit_user_form_ref" :model="edit_form" :rules="edit_rules" label-width="60px" label-position="right">
      <el-form-item prop="username" label="帐号">
         <el-input v-model="edit_form.username" disabled />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="email" label="邮箱">
         <el-input v-model="edit_form.email" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="mobile" label="电话">
         <el-input v-model="edit_form.mobile" />
      </el-form-item>
      <div class="btn-div">
         <el-button @click="emit('close_dialog_event')">取消</el-button>
         <el-button type="primary" @click="clickSubmit">确定</el-button>
      </div>


   </el-form>
</template>

<style lang="less" scoped>
.el-form {

   margin: 10px 0 10px 0;
   padding: 0 30px 0 10px;

   .btn-div {
      width: 100%;

      display: flex;
      justify-content: right;
   }
}
</style>