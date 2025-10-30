<template>
  <div id="app">
    <div>App component loaded</div>
    <div>Current route: {{ $route?.path }}</div>
    <button @click="$router.push('/')">Go to Home</button>
    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  created() {
    console.log('App component created');
  },
  mounted() {
    console.log('App component mounted');
    console.log('Current route in App mounted:', this.$route);
    
    // 强制导航到首页
    this.$router.push('/').catch(err => {
      console.log('Navigation error:', err);
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>