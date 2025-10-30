import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './views/router.js'
import App from './App.vue'

console.log('Creating Vue app');

// 创建Vue应用实例
const app = createApp(App)
console.log('Adding Element Plus to app');
app.use(ElementPlus)
console.log('Adding router to app');
app.use(router)

console.log('Mounting app to #app');
app.mount('#app')
console.log('App mounted');