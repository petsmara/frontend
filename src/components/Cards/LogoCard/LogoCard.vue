<template>
  <div class="logo-card">
    <div class="logo-card__text-wrap">
      <p class="logo-card__text-top">반려동물</p>
      <p class="logo-card__text-bottom">사료 공유 플랫폼</p>
    </div>
    <img
      class="logo-card__img"
      src="@/assets/images/icons/logo.png"
      alt="petsmara"
    />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.logo-card {
  @include respond-to('tablet-portrait-only') {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__text-wrap {
    margin-bottom: 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #000000;
  }
  &__img {
    width: 52px;
  }
}
</style>
