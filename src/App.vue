<template>
  <div id="app">
    <AppNav />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/user/register">Register</router-link> |
      <router-link to="/user/login">Login</router-link> |
      <router-link to="/user/mypage">Mypage</router-link> |
      <router-link to="/product/1">Product/1</router-link> |
      <router-link to="/product/register">Product/register</router-link> |
      <router-link to="/product/list">Product/list</router-link>
    </div> -->
    <router-view />
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
