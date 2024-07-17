<script setup>
import { ref } from 'vue'
const menuList = [
   {
      id: '1',
      page: 'user',
      pageName: '用户',
      icon: 'User',
   }
]

let activePath
function saveNavState(getactivePath) {
   window.sessionStorage.setItem('activePath', getactivePath)
   activePath = getactivePath
}

let haveCollapse =false
let isCollapse = ref(false)
function switchCollapse() {
   isCollapse.value = !isCollapse.value
}

</script>

<template>
   <el-menu background-color="#333744" text-color="#fff"  router :default-active="activePath" :collapse="isCollapse" :class="{isCollapse}">
      <el-menu-item v-if="haveCollapse" class="collapse-btn">
         <div @click="switchCollapse">
            <span v-if="!isCollapse">
               < < < </span>
                  <span v-else>
                     >>>
                  </span>
         </div>
      </el-menu-item>
      <el-menu-item v-for="item in menuList" :index="item.page + ''" :id="item.id">
         <el-icon :size="20">
            <component :is="item.icon" />
         </el-icon>
         <template #title>
            <span>{{ item.pageName }}</span>
         </template>
      </el-menu-item>
   </el-menu>
</template>

<style lang="less">
@import './index.less';
</style>