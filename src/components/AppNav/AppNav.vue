<template>
  <div class="app-nav">
    <h1 class="app-nav__logo">
      <img src="@/assets/images/icons/logo.png" alt="petsmara" />
    </h1>
    <button class="app-nav__mypage"></button>
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
  // width: 100%;
  width: 480px;
  &__logo {
    line-height: 85px;
    text-align: center;
    // position: absolute;
    // top: 0;
    // left: 50%;
    // transform: translateY(-50%);
    img {
      width: 32px;
    }
  }
  &__mypage {
    position: absolute;
    right: 0;
    top: 0;
    width: 22px;
    height: 27px;
    background: url('~@/assets/images/icons/mypage.png') center / 50px no-repeat;
  }
}
</style>
