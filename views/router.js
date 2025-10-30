import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Settings from '../views/Settings.vue'

console.log('Router module loaded');

// 添加调试信息，确认组件是否被正确导入
console.log('Home component:', Home);
console.log('About component:', About);
console.log('Settings component:', Settings);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

console.log('Routes defined:', routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('Routing from', from.path, 'to', to.path);
  console.log('Matched route:', to);
  next();
});

router.afterEach((to, from) => {
  console.log('Routed from', from.path, 'to', to.path);
});

// 添加全局后置钩子，检查当前路由
router.afterEach((to) => {
  console.log('Current route:', router.currentRoute.value);
  console.log('Route matched components:', to.matched);
});

console.log('Router created');

export default router