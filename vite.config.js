import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],  // 添加Vue插件
  root: '.',  // 设置根目录为当前目录
  base: './', // 使用相对路径而不是绝对路径
  build: {
    outDir: 'dist',  // 输出目录
    emptyOutDir: true,  // 构建时清空输出目录
  },
  server: {
    // 为 Electron 环境配置服务器
    middlewareMode: false,
  },
  resolve: {
    // 配置别名
    alias: {
    }
  },
  define: {
    // 定义全局变量
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
  }
})