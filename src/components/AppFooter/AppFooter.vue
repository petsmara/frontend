<template>
  <div class="app-footer">
    <h1 class="app-footer__logo">
      <router-link to="/">
        <img src="@/assets/images/icons/logo_footer.png" alt="petsbab" />
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
  background-color: #6f6f6f;
  &__logo {
    margin-bottom: 8px;
    text-align: center;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-right: 6px;
        width: 32px;
      }
      span {
        font-weight: 900;
        font-size: 20px;
        line-height: 23px;
        color: #ffffff;
      }
    }
  }
  &__mail {
    display: block;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;
  }
}
</style>
