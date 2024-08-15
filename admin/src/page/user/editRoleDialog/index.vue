<script setup>
import { ref, reactive, onBeforeMount, } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElOption, ElSelect, ElMessage } from 'element-plus';
import { request } from '@@/utils/server'

const props = defineProps({
   userInfo: Object
})

const userInfo = reactive(
   props.userInfo
)

const role_form = ref('')

const rolesList = reactive([])

onBeforeMount(async () => {
   const data = await request({
      method: 'get',
      url: `roles`
   })
   rolesList.push(...data)
   console.log(rolesList)
})

const emit = defineEmits(['close_edit_role_dialog_event', 'update_user_list_event'])

const clickSubmit = async () => {
   if (role_form.value === '') {
      return ElMessage({
         showClose: true,
         message: '请选择新角色',
         center: true,
         type: 'error',
      })
   }
   console.log(role_form.value)
   await request({
      method: 'put',
      url: `users/${userInfo.id}/role`,
      data: {
         rid: role_form.value
      }
   })
   ElMessage({
      showClose: true,
      message: '修改角色成功',
      center: true,
      type: 'success',
   })
   emit('close_edit_role_dialog_event')
   emit('update_user_list_event')
}

</script>

<template>
   <el-form label-width="80px" label-position="right">
      <el-form-item label="帐号">
         <el-input v-model="userInfo.username" disabled />
      </el-form-item>
      <el-form-item label="当前角色">
         <el-input v-model="userInfo.role_name" disabled />
      </el-form-item>
      <el-form-item label="新角色">
         <el-select v-model="role_form" placeholder="请选择" size="large" style="width: 240px">
            <el-option v-for="role in rolesList" :key="role.id" :label="role.roleName + role.id" :value="role.id" />
         </el-select>
      </el-form-item>
      <div class="btn-div">
         <el-button @click="emit('close_edit_role_dialog_event')">取消</el-button>
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