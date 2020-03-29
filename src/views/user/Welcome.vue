<template>
  <div class="welcome">
    <header class="welcome__header">
      <LogoCard class="welcome__logo" />
      <h2 class="welcome__title">환영합니다 :)</h2>
      <p class="welcome__paragraph">
        <span class="welcome__nickname">{{ user.nickname }}</span> 님 사료 공유
        플랫폼을 즐겨보세요!
      </p>
    </header>

    <div class="welcome__middle">
      <img
        class="welcome__image"
        src="@/assets/images/welcome.png"
        alt="welcome"
      />
      <div class="welcome__submit">
        <router-link to="/" class="welcome__btn-start">
          시작하기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
import { LogoCard } from '@/components/Cards'
export default {
  components: {
    LogoCard
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.welcome {
  padding-bottom: 30px;
  @include respond-to('tablet-portrait-only') {
    padding: 0 16px 16px;
  }
  text-align: center;
  &__logo {
    @include respond-to('tablet-portrait-only') {
      display: none;
    }
  }
  &__header {
  }
  &__middle {
    text-align: center;
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
  }
  &__submit {
    padding: 0 12px;
  }
  &__title {
    @include respond-to('tablet-portrait-only') {
      font-size: 38px;
    }
    margin-top: 36px;
    font-weight: 500;
    font-size: 48px;
    margin-bottom: 42px;
    color: #000000;
  }
  &__paragraph {
    @include respond-to('tablet-portrait-only') {
      font-size: 16px;
    }
    font-size: 20px;
    color: #000000;
    margin-bottom: 24px;
  }
  &__nickname {
    @include respond-to('tablet-portrait-only') {
      font-size: 30px;
    }
    font-weight: 500;
    font-size: 36px;
  }
  &__image {
    width: 100%;
  }
  &__btn-start {
    margin-top: 50px;
    padding: 14px;
    display: inline-block;
    width: 100%;
    background: #e9e9e9;
    border-radius: 8px;
    font-size: 16px;
    color: #000000;
  }
}
</style>
