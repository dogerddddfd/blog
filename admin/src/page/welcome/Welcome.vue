<script setup>
</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎页</el-breadcrumb-item>
   </el-breadcrumb>
   <el-Card>
      <div class="container">
         <p style="text-align: center;font-size: 30px;">【占位】欢迎！</p>
         <p>下面哥们不会写了</p><br>
         <p>github : <a href="https://github.com/dogerddddfd/vue3_shop">github.com/dogerddddfd/vue3_shop</a></p><br>
      </div>
   </el-Card>
</template>

<style scoped>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

.container {
   width: 100%;
   height: 300px;
}
</style>
