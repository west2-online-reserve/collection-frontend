import { createApp } from 'vue'
import { createPinia } from 'pinia'
// pinia-plugin-persistedstate 相关配置
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 引入v-md-editor相关配置
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueMarkdownEditor)

app.mount('#app')
