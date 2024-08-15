import { request } from '@@/utils/server'
import { toRaw } from 'vue'

export async function getUsersList(queryInfo) {
   const data = await request({
      method: 'get',
      url: './user',
      params: queryInfo
   })
   return data
}

export async function changeUserState(userInfo) {
   await request({
      method: 'put',
      url: `users/${toRaw(userInfo.id)}/state/${toRaw(userInfo.mg_state)}`,
   })
}


export async function deleteUser(userInfo) {
   await request({
      method: 'delete',
      url: `users/${userInfo.id}}`,
   })
}