import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/main.css'
import { createPinia } from 'pinia'
const app = createApp(App)

app.use(router).use(createPinia()).use(ElementPlus).mount('#app')
