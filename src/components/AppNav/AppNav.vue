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
  @include respond-to('mobile-portrait-only') {
    // background-color: lavender;
  }
  @include respond-to('tablet-portrait-only') {
    // background-color: red;
  }
  position: relative;
  height: 85px;
  background-color: #c4c4c4;
  padding: 0 60px;
  width: 100%;
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