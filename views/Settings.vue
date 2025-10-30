<template>
  <div class="settings">
    <el-card>
      <h1>设置页面11133333333333333333</h1>
      <el-form :model="form" label-width="120px">
        <el-form-item label="深色模式">
          <el-switch v-model="form.darkMode" />
        </el-form-item>
        
        <el-form-item label="语言">
          <el-select v-model="form.language" placeholder="请选择语言">
            <el-option label="中文" value="zh"></el-option>
            <el-option label="English" value="en"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button @click="$router.back()" type="primary">返回首页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const form = ref({
  darkMode: false,
  language: 'zh'
});

onMounted(() => {
  console.log('SettingsView mounted ----------------------------------------------------------------------------');
})
</script>

<style scoped>
.settings {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.el-form {
  margin-top: 20px;
  text-align: left;
}
</style>


<!-- 


<template>
  <div class="settings">
    <el-card>
      <h1>设置页面</h1>
      <el-form :model="form" label-width="120px">
        <el-form-item label="深色模式">
          <el-switch v-model="form.darkMode" />
        </el-form-item>
        
        <el-form-item label="语言123">
          <el-select v-model="form.language" placeholder="请选择语言">
            <el-option label="中文" value="zh"></el-option>
            <el-option label="English" value="en"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button @click="$router.back()" type="primary">返回首页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SettingsView',
  data() {
    return {
      form: {
        darkMode: false,
        language: 'zh'
      }
    }
  },
  // 添加created钩子确保form对象被正确初始化
  created() {
    console.log('SettingsView created');
    // 确保form对象存在并有默认值
    if (!this.form) {
      this.form = {
        darkMode: false,
        language: 'zh'
      }
    }
  }
}
</script>

<style scoped>
.settings {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.el-form {
  margin-top: 20px;
  text-align: left;
}
</style> -->