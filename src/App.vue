<template>
  <div id="app">
    <AppNav />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/user/register">Register</router-link> |
      <router-link to="/user/login">Login</router-link> |
      <router-link to="/user/mypage">Mypage</router-link> |
      <router-link to="/product/list/:id">Product/list/:id</router-link> |
      <router-link to="/product/register">Product/register</router-link>
    </div>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
