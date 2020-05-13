<template>
  <div id="app">
    <AppNav />
    <router-view :key="$route.fullPath" />
    <AppFooter />
  </div>
</template>

<script>
import { AppNav } from '@/components/AppNav'
import { AppFooter } from '@/components/AppFooter'
export default {
  components: {
    AppNav,
    AppFooter
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
