import axios from 'axios'


export const api = axios.create(
   {
      baseURL: 'api',
      timeout: 50000
   }
)

api.interceptors.request.use((config) => {
   config.headers.Authorization = window.sessionStorage.getItem('token')
   return config
})


/**
 * 
 * @param {*} form 请求表单
 * @returns 
 */
export async function request(form) {
   try{
      const { data: res } = await api(form)
      return res.data
   }catch(error){
      throw new Error(error.response.data.message)
   }
}

