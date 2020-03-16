<template>
  <div class="app-nav">
    <h1 class="app-nav__logo">
      <router-link to="/">
        <img src="@/assets/images/icons/logo.png" alt="petsmara" />
      </router-link>
    </h1>
    <div class="app-nav__right">
      <router-link to="/">
        <button class="app-nav__mypage"></button>
      </router-link>
      <router-link to="/">
        <button class="app-nav__menu"></button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-nav {
  position: relative;
  height: 85px;
  background-color: floralwhite;
  padding: 0 16px;
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &__logo {
    img {
      width: 32px;
    }
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60px;
  }
  &__mypage {
    display: inline-block;
    width: 22px;
    height: 27px;
    background: url('~@/assets/images/icons/mypage.png') center / 100% no-repeat;
  }
  &__menu {
    display: inline-block;
    width: 25px;
    height: 16px;
    background: url('~@/assets/images/icons/menu.png') center / 100% no-repeat;
  }
}
</style>
