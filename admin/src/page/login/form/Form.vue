<template>
   <div class="form_div">
      <el-form style='width: 60%;' ref="login_form_ref" :model="login_form" :rules="login_rules">
         <el-form-item prop="username">
            <el-input v-model="login_form.username" />
         </el-form-item>
         <el-form-item style="margin:30px 0px 3dvh 0px" prop="password">
            <el-input v-model="login_form.password" />
         </el-form-item>
         <el-form-item style="float: left;">
            <el-button @click="clickSbumit('visitor')">游客访问</el-button>
         </el-form-item>
         <el-form-item style="float: right;">
            <el-button type="primary" @click="clickSbumit('')">登录</el-button>
            <el-button>重置</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, FormInstance } from 'element-plus'
import { submitForm } from '@@/utils/submitForm'
import { request } from '@@/utils/server'
import { login_rules } from './form_rules'
import router from '@@/router'


const login_form_ref = ref<FormInstance>()

const login_form = reactive({
   username: 'admin',
   password: '123456',
})


const clickSbumit = async (option:string) => {
   try {
      let res:any
      if (option === "visitor") {
         res = await request({
            method: 'post',
            url: `/auth/login`,
            data: {
               username: 'visitor',
               password: 'visitor',
            }
         })
      } else {
         await submitForm(login_form_ref)
         res = await request({
            method: 'post',
            url: `/auth/login`,
            data: toRaw(login_form)
         })
      }
      ElMessage({
         showClose: true,
         message: '登陆成功',
         center: true,
         type: 'success',
      })

      window.sessionStorage.setItem('token', `Bearer ${res.data.token}`)

      router.push('/home')

   } catch (error: any) {
      ElMessage({
         showClose: true,
         message: error.message,
         center: true,
         type: 'error',
      })
   }
}



</script>

<style scoped>
@import './index.less';
</style>