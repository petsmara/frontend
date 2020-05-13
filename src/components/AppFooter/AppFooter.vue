<template>
  <div class="app-footer">
    <h1 class="app-footer__logo">
      <router-link to="/">
        <img src="@/assets/images/icons/logo.png" alt="petsmara" />
        <span>PETS BAB</span>
      </router-link>
    </h1>
    <a class="app-footer__mail" href="mailto:contact@petsbab.com"
      >contact@petsbab.com</a
    >
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-footer {
  margin-top: auto;
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e9e9e9;
  &__logo {
    a {
      display: flex;
      align-items: center;
      img {
        margin-right: 6px;
        width: 32px;
      }
      span {
        font-weight: 900;
        font-size: 20px;
        color: #000000;
      }
    }
  }
  &__mail {
    font-size: 14px;
    color: #000000;
  }
}
</style>
