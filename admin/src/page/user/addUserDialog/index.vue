<script setup>
import { ref, reactive, toRaw } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton,ElMessage } from 'element-plus';
import { addRules } from './form_rules'
import { request } from '@@/utils/server'
import { submitForm } from '@@/utils/submitForm'


const addUserFormRef = ref()

const addForm = reactive({
   username: '',
   password: '',
   email: '',
   mobile: '',
})

const emit = defineEmits(['close_add_dialog_event', 'update_role_list_event'])


const clickSubmit = async () => {
   try {
      await submitForm(addUserFormRef)
      await request({
         method: 'post',
         url: `/users/`,
         data: toRaw(addForm)
      })
      ElMessage({
         showClose: true,
         message: '添加用户成功',
         center: true,
         type: 'success',
      })
      emit('close_add_dialog_event')
      emit('update_role_list_event')
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
   <el-form ref="addUserFormRef" :model="addForm" :rules="addRules" label-width="60px" label-position="right">
      <el-form-item prop="username" label="帐号">
         <el-input v-model="addForm.username" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="password" label="密码" type="password">
         <el-input v-model="addForm.password" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="email" label="邮箱">
         <el-input v-model="addForm.email" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="mobile" label="电话">
         <el-input v-model="addForm.mobile" />
      </el-form-item>
      <div class="btn-div">
         <el-button @click="emit('close_add_dialog_event')">取消</el-button>
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