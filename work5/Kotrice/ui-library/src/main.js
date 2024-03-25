
import { createApp } from 'vue'
import App from './App.vue'

// // 导入UI组件库
// import XUi from '@xui/components'
// import '@xui/theme'

// // 
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import XUi from '../dist/es'
import '../dist/theme/index.css'

const app = createApp(App)

// 应用组件库
app.use(XUi)
// app.use(ElementPlus)

app.mount('#app')
