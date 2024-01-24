import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import useStore from './store'
import router from './router/router'


const app = createApp(App)
app.use(createPinia())
app.use(createPersistedState())
app.provide('pinia', useStore())
app.use(ElementPlus,{size:'small',zIndex:3000})
app.use(router)
app.use(store)

app.mount('#app')