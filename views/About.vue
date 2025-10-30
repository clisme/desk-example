<template>
  <div class="about">
    <el-card>
      <h1>关于页面</h1>
      <p>这是关于页面的内容。111111213</p>
      <el-alert
        title="这是一个使用 Element Plus 组件构建的页面"
        type="success"
        show-icon
        :closable="false"
      />
      <el-button @click="$router.back()" type="primary" round class="back-button">
        返回首页
      </el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  margin-top: 20px;
  font-size: 16px;
  padding: 12px 30px;
}
</style>