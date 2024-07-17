import { createApp } from 'vue'
import App from './App.vue'
import router from '@@/router/index.js'

import '@@/assets/css/global.css'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
   app.component(key, component)
 }
