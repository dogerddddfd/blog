<script setup>
import { defineAsyncComponent } from 'vue';
import router from '@@/router'
import Menu from './menu/Menu.vue'

function logout() {
   window.sessionStorage.clear()
   router.push('/login')
}

</script>

<template>
   <div class="common-layout">
      <el-container>
         <el-header>
            <div class="title">
               <div class="img_div" @click="router.push('/welcome')">
                  <img src="@@/assets/img/banana.gif" alt="">
               </div>
               <span>【占位】博客后台</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
         </el-header>
         <el-container class="main-container">
            <Menu />
            <el-main>
               <router-view></router-view>
            </el-main>
         </el-container>
      </el-container>
   </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>