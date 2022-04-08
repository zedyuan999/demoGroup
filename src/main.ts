<<<<<<< Updated upstream
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/main.css'
const app = createApp(App)
app.use(router).use(ElementPlus).mount('#app')
=======
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
const app = createApp(App)
console.log('mian');

app.use(router).use(createPinia()).use(ElementPlus).mount('#app')
>>>>>>> Stashed changes
