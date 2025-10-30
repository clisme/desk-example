<template>
  <div class="home">
    <el-card class="welcome-card">
      <h1>欢迎来到 Electron + Vue 应用</h1>
      <p>这是一个使用 Vue 作为前端框架的 Electron 应用程序。</p>
    </el-card>
    
    <el-alert
      :title="versionInfo"
      type="info"
      show-icon
      :closable="false"
      class="version-info"
    />

    <p id="info">123</p>
    
    <el-row :gutter="20" class="nav-buttons">
      <el-col :span="12">
        <el-button 
          type="primary" 
          @click="$router.push('/about')"
          round
          class="nav-button"
        >
          关于页面
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button 
          type="success" 
          @click="$router.push('/settings')"
          round
          class="nav-button"
        >
          设置页面
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue'

// 定义响应式数据
const versionInfo = ref('正在获取版本信息...')

// 定义方法
const updateVersionInfo = () => {
  console.log('updateVersionInfo called')
  // 调试信息
  console.log('window object:', window)
  console.log('window.versions:', window.versions)
  console.log('typeof window.versions:', typeof window.versions)
  
  // 获取版本信息
  if (typeof window.versions !== 'undefined') {
    versionInfo.value = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`
    
    // 测试IPC通信
    testIPC()
  } else {
    console.log('window.versions is undefined')
    versionInfo.value = '无法获取版本信息'
  }
}

const testIPC = async () => {
  try {
    const response = await window.versions.ping()
    console.log('IPC response:', response)
  } catch (error) {
    console.error('Error calling ping:', error)
  }
}

// 使用生命周期钩子
onMounted(() => {
  console.log('HomeView mounted')
  updateVersionInfo()
})

onActivated(() => {
  console.log('HomeView activated')
  updateVersionInfo()
})

// 导出需要在模板中使用的数据和方法
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.welcome-card {
  margin-bottom: 20px;
}

.version-info {
  margin-bottom: 30px;
  text-align: left;
}

.nav-buttons {
  margin-top: 20px;
}

.nav-button {
  width: 100%;
  font-size: 16px;
  padding: 15px;
}
</style>