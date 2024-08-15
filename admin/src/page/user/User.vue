<script setup>
import {
   ElBreadcrumb, ElBreadcrumbItem, ElCard, ElTable, ElTableColumn, ElPagination
   , ElInput, ElButton, ElConfigProvider, ElTooltip, ElDialog,
   ElMessage,
} from 'element-plus';

import {
   Edit, Delete, Setting, Search
} from '@element-plus/icons-vue'

// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { onBeforeMount, reactive, ref, toRaw } from 'vue';

import { getUsersList } from './request'

import AddUserDialog from './addUserDialog/index.vue'
import EditUserDialog from './editUserDialog/index.vue'
import EditRoleDialog from './editRoleDialog/index.vue'
import { openDeleteUserDialog } from './deleteUserDialog/index'

const queryInfo = reactive({
   searchUsername: '',
   pageSize: 3,
   pageNum: 1
})

let usersListData = reactive({})

onBeforeMount(async () => {
   updateListData()
})


async function updateListData() {
   try {
      const data = await getUsersList(toRaw(queryInfo))
      console.log(data)
      usersListData.users = data
   } catch (error) {
      ElMessage({
         showClose: true,
         message: error.message,
         center: true,
         type: 'error',
      })
   }

}

function handlePaginationChange() {
   updateListData()
}

function handleSearchBtnClick() {
   console.log(queryInfo)
   updateListData()
}

// 用户状态改变
// function handleUserStateChange(scope_userInfo) {
//    changeUserState(toRaw(scope_userInfo))
//    updateListData()
// }

//#region 对话框的用户数据
const dialogUserInfo = reactive({
   id: '',
   username: '',
   email: '',
   mobile: '',
   role_name: ''
})

const updateDialogUserInfo = (scope_userInfo) => {
   dialogUserInfo.id = scope_userInfo.id
   dialogUserInfo.username = scope_userInfo.username
   dialogUserInfo.email = scope_userInfo.email
   dialogUserInfo.mobile = scope_userInfo.mobile
   dialogUserInfo.role_name = scope_userInfo.role_name
}
//#endregion


//#region 修改用户对话框
const editUserDialogVisible = ref(false)

const handleEditUserDialogOpen = (scope_userInfo) => {
   updateDialogUserInfo(scope_userInfo)
   queryInfo.searchUsername = ''
   editUserDialogVisible.value = true
}

const handleEditUserDialogClose = () => {
   editUserDialogVisible.value = false;
   updateListData()
   updateDialogUserInfo({})
}
//#endregion

//#region 删除用户对话框
const handleDeleteUserDialogOpen = async (scope_userInfo) => {
   updateDialogUserInfo(scope_userInfo)

   await openDeleteUserDialog(dialogUserInfo)

   updateDialogUserInfo({})
   updateListData()
}


//#endregion

//#region 添加用户对话框
const addUserDialogVisible = ref(false)

const handleAddUserDialogOpen = (scope_userInfo) => {
   addUserDialogVisible.value = true
   queryInfo.searchUsername = ''
}

const handleAddUserDialogClose = () => {
   addUserDialogVisible.value = false;
   updateListData()
}
//#endregion


//#region 更改用户角色对话框
const editRoleDialogVisible = ref(false)

const handleEditRoleDialogOpen = (scope_userInfo) => {
   updateDialogUserInfo(scope_userInfo)
   editRoleDialogVisible.value = true
   queryInfo.searchUsername = ''
}

const handleEditRoleDialogClose = () => {
   editRoleDialogVisible.value = false;
   updateListData()
}
//#endregion
</script>




<template>
   <el-breadcrumb separator=">"><!-- 面包屑 -->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>

   <el-Card>
      <div class="container">
         <div class="input-btn-container"><!-- 顶部按钮-->
            <el-input v-model="queryInfo.searchUsername" placeholder="请输入搜索内容" style="max-width: 600px" clearable>
               <template #append>
                  <el-button :icon="Search" @click="handleSearchBtnClick" />
               </template>
            </el-input>
            <el-button type="primary" @click="handleAddUserDialogOpen">添加用户</el-button>
         </div>
         <el-config-provider :locale='zhCn'>
            <el-table :data="usersListData.users" border style="width: 100%" stripe><!-- 列表 -->
               <el-table-column type="index" width="50" />
               <el-table-column prop="username" label="用户名" width="200" />
               <el-table-column prop="roles" label="权限" width="300" />
               <el-table-column label="操作">
                  <template #default="scope">
                     <el-button type="primary" :icon="Edit" @click="handleEditUserDialogOpen(scope.row)"></el-button>
                     <el-tooltip class="box-item" effect="dark" content="分配权限" placement="top">
                        <el-button type="warning" :icon="Setting"
                           @click="handleEditRoleDialogOpen(scope.row)"></el-button>
                     </el-tooltip>
                     <el-button type="danger" :icon="Delete" @click="handleDeleteUserDialogOpen(scope.row)"></el-button>
                  </template>

               </el-table-column>
            </el-table>

            <!--分页-->
            <el-pagination v-model:current-page="queryInfo.pagenum" v-model:page-size="queryInfo.pagesize"
               :page-sizes="[2, 3, 4, 5]" layout="total, sizes, prev, pager, next, jumper" :total="usersListData.total"
               @size-change="handlePaginationChange()" @current-change="handlePaginationChange()" />
         </el-config-provider>
      </div>
   </el-Card>

   <el-dialog v-model="editUserDialogVisible" title="修改用户数据" :close-on-click-modal="false" destroy-on-close><!-- edit -->
      <EditUserDialog :userInfo="dialogUserInfo" @close_edit_dialog_event="handleEditUserDialogClose"
         @update_user_list_event="updateListData" />
   </el-dialog>

   <el-dialog v-model="addUserDialogVisible" title="添加用户" :close-on-click-modal="false" destroy-on-close><!-- add -->
      <AddUserDialog @close_add_dialog_event="handleAddUserDialogClose" @update_user_list_event="updateListData" />
   </el-dialog>

   <el-dialog v-model="editRoleDialogVisible" title="编辑权限" :close-on-click-modal="false" destroy-on-close><!-- add -->
      <EditRoleDialog :userInfo="dialogUserInfo" @close_edit_role_dialog_event="handleEditRoleDialogClose"
         @update_user_list_event="updateListData" />
   </el-dialog>

</template>

<style>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

.el-card {
   min-width: 1000px;

   .container {

      .input-btn-container {
         width: 100%;

         margin: 5px 0 20px 0;

         .el-input {
            width: 250px;
            height: 35px;

            margin: 0 50px 0 0;
         }
      }

      .el-table {
         margin: 0 0 20px 0;
      }
   }

}

.el-dialog {
   max-width: 500px;
}
</style>
