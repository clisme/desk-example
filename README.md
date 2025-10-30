# Electron + Vue 3 桌面应用

这是一个使用 Electron 和 Vue 3 构建的桌面应用程序，具有路由功能和热重载开发环境。

## 项目结构

```
.
├── index.html          # 主页面入口
├── main.js             # Electron 主进程文件
├── main-vue.js         # Vue 应用入口
├── preload.js          # 预加载脚本
├── renderer.js         # 渲染进程脚本（保留用于兼容性）
├── package.json        # 项目配置文件
├── vite.config.js      # Vite 配置文件
├── App.vue             # 根Vue组件
├── views/              # Vue 组件目录
│   ├── Home.vue        # 主页组件
│   ├── About.vue       # 关于页面组件
│   ├── Settings.vue    # 设置页面组件
│   └── router.js       # 路由配置文件
└── dist/               # 构建输出目录
```

## 技术栈

- Electron: 桌面应用框架
- Vue 3: 前端框架
- Vue Router: 路由管理
- Vite: 构建工具

## 开发环境搭建步骤

### 1. 安装依赖

```bash
# 使用 cnpm 加速安装（解决网络问题）
npm install -g cnpm --registry=https://registry.npmmirror.com

# 安装 Vue 和 Vue Router
cnpm install vue@latest vue-router@latest

# 安装开发工具
cnpm install -D vite @vitejs/plugin-vue

# 重新安装 Electron（解决之前的安装问题）
cnpm install electron@latest
```

### 2. 配置 Vite

创建 [vite.config.js](file:///d:/aproject/desk%20-%20副本/vite.config.js) 文件，配置 Vue 插件支持和相对路径：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // 使用相对路径而不是绝对路径
  // 其他配置...
})
```

### 3. 创建 Vue 组件

在 [views](file:///d:/aproject/desk%20-%20副本/src/renderer/views) 目录下创建 Vue 组件：
- [Home.vue](file:///d:/aproject/desk%20-%20副本/views/Home.vue): 主页组件
- [About.vue](file:///d:/aproject/desk%20-%20副本/views/About.vue): 关于页面组件
- [Settings.vue](file:///d:/aproject/desk%20-%20副本/views/Settings.vue): 设置页面组件

创建 [App.vue](file:///d:/aproject/desk%20-%20副本/App.vue) 作为根组件，包含路由视图：
```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

### 4. 配置路由

创建 [router.js](file:///d:/aproject/desk%20-%20副本/views/router.js) 文件配置 Vue Router：

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Settings from '../views/Settings.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/settings', name: 'Settings', component: Settings }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

### 5. 创建 Vue 应用入口

创建 [main-vue.js](file:///d:/aproject/desk%20-%20副本/main-vue.js) 作为 Vue 应用的入口点：

```javascript
import { createApp } from 'vue'
import router from './views/router.js'
import App from './App.vue'  // 使用App.vue作为根组件

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 6. 更新主页面

修改 [index.html](file:///d:/aproject/desk%20-%20副本/index.html) 以使用 Vue 应用：

```html
<body>
  <div id="app"></div>
  <script type="module" src="./main-vue.js"></script>
</body>
```

### 7. 配置 Electron 主进程

更新 [main.js](file:///d:/aproject/desk%20-%20副本/main.js) 文件，使其在开发模式下使用 Vite 服务器：

```javascript
// 在开发模式下使用Vite服务器，生产模式下加载本地文件
if (!app.isPackaged) {
  // 尝试加载Vite开发服务器
  mainWindow.loadURL('http://localhost:5173').catch(e => {
    console.log('Failed to load from Vite dev server, falling back to local build', e);
    // 检查是否存在构建的文件
    const distIndexPath = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(distIndexPath)) {
      // 如果存在构建的文件，则加载它们
      mainWindow.loadFile('dist/index.html');
    } else {
      console.log('No built files found. Please run "npm run build" first.');
      // 显示一个简单的错误页面
      mainWindow.loadFile('index.html');
    }
  });
} else {
  mainWindow.loadFile('dist/index.html')
}
```

## 开发流程

有两种方式运行项目：

### 方式一：带热重载的开发模式（推荐）

1. 启动 Vite 开发服务器：
   ```bash
   npm run dev
   ```

2. 在另一个终端中启动 Electron 应用：
   ```bash
   npm start
   ```

### 方式二：直接运行 Electron 应用

```bash
# 首先构建项目
npm run build

# 然后运行 Electron 应用
npm start
```

注意：这种方式不会提供热重载功能，但可以正常显示应用内容。

## 构建项目

```bash
# 构建生产版本
npm run build
```

## 实现思路

1. **模块化开发**：将 Vue 组件分离到独立文件中，便于维护和扩展
2. **路由管理**：使用 Vue Router 实现页面导航
3. **开发体验**：配置 Vite 实现热重载，提高开发效率
4. **兼容性处理**：保持 Electron 主进程和渲染进程的通信机制
5. **构建优化**：使用 Vite 进行代码构建和打包

## 功能特点

- 基于 Electron 的跨平台桌面应用
- Vue 3 组件化开发
- Vue Router 页面路由
- 热重载开发环境
- IPC 通信机制保持
- 响应式 UI 设计

## 常见问题及解决方案

### 路由跳转但页面不切换问题

**问题描述**：点击路由链接时，URL 改变了，但页面内容没有更新。

**解决方案**：
1. 创建根组件 [App.vue](file:///d:/aproject/desk%20-%20副本/App.vue)，在模板中使用 `<router-view />` 作为路由出口
2. 在 [main-vue.js](file:///d:/aproject/desk%20-%20副本/main-vue.js) 中使用 [App.vue](file:///d:/aproject/desk%20-%20副本/App.vue) 作为根组件，而不是直接使用 Home 组件

**核心原因**：Vue Router 需要一个路由视图出口来显示匹配的组件，之前直接将 Home 组件作为根组件，没有提供路由出口。

### Electron 应用启动时显示空白页面

**问题描述**：直接运行 `npm start` 时，应用窗口显示空白，控制台出现错误。

**解决方案**：
1. 在 [main.js](file:///d:/aproject/desk%20-%20副本/main.js) 中添加错误处理，当无法连接到 Vite 开发服务器时回退到加载本地构建文件
2. 配置 Vite 使用相对路径（`base: './'`）确保构建后的文件可以正确加载
3. 使用两种运行方式：
   - 带热重载：先运行 `npm run dev`，再运行 `npm start`
   - 直接运行：先运行 `npm run build` 构建项目，再运行 `npm start`（无热重载）

### 从其他页面返回首页时版本信息不更新

**问题描述**：从设置页面或关于页面返回首页时，版本信息和 IPC 通信测试不执行。

**解决方案**：
1. 将版本信息显示和 IPC 通信测试逻辑从 [renderer.js](file:///d:/aproject/desk%20-%20副本/renderer.js) 移动到 [Home.vue](file:///d:/aproject/desk%20-%20副本/views/Home.vue) 组件中
2. 在 Vue 组件中使用 `created` 或 `activated` 生命周期钩子确保每次页面显示时都能执行相关逻辑
3. 简化 [renderer.js](file:///d:/aproject/desk%20-%20副本/renderer.js) 文件，仅保留向后兼容的功能

**核心原因**：Vue Router 导航不会触发完整的页面重新加载，因此 `DOMContentLoaded` 事件只会在应用初次加载时执行一次。需要在 Vue 组件的生命周期中处理这些逻辑。

## 扩展建议

1. 添加状态管理（Vuex 或 Pinia）
2. 集成 UI 组件库（如 Element Plus）
3. 实现持久化存储
4. 添加国际化支持
5. 实现应用自动更新


***注意：
以上代码和步骤是基于您提供的文件结构和项目需求编写的。在实际开发中，可能需要根据具体环境和依赖版本进行调整。*
*建议使用最新的 Vue 3 和 Electron 版本进行开发，以确保兼容性和最新特性。
*vue2开发可能有问题，请使用vue3开发。*
*electron特性只有在运行electron时才有效，在浏览器中无效。***





@REM @echo off
@REM echo Stopping any running instances of the app...
@REM taskkill /f /im electron.exe 2>nul
@REM taskkill /f /im MyElectronApp.exe 2>nul
@REM taskkill /f /im "My Electron App.exe" 2>nul

@REM echo Cleaning release directory...
@REM if exist release rmdir /s /q release

@REM echo Cleaning dist directory...
@REM if exist dist rmdir /s /q dist

@REM echo Cleanup completed.