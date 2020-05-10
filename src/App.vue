<template>
  <div id="app">
    <AppNav />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import { AppNav } from '@/components/AppNav'
export default {
  components: {
    AppNav
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
</style>
