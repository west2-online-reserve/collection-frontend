import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入App组件
import App from './App.vue'

// 引入Element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia() // 创建pinia
pinia.use(piniaPluginPersistedstate)

// 注册Element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 引入路由器
import router from './router'

// 配置svg插件
import 'virtual:svg-icons-register'



// 使用插件
app.use(router)
app.use(pinia)

// 挂载app
app.mount('#app')
