import './assets/main.scss'
import { createApp } from 'vue'//导入vue
import ElementPlus from 'element-plus'//导入element-plus
import 'element-plus/dist/index.css'//导入element-plus的样式
import router from './router'
import App from './App.vue'//导入app.vue
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import  Avatar  from '@/components/Avatar.vue'
import { createPinia } from 'pinia'
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

import Avatar from '@/components/Avatar.vue';
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
const pinia = createPinia()
const app = createApp(App)//创建应用实例

pinia.use(piniaPluginPersistedstate)
app.use(VMdPreview);
app.component('Avatar',Avatar)
app.use(router)
app.use(pinia)
app.use(ElementPlus)//使用element-plus
app.mount('#app')//控制html元素
app.use(VueMarkdownEditor);
