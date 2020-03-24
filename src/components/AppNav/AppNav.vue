<template>
  <div class="app-nav">
    <h1 class="app-nav__logo">
      <router-link to="/">
        <img src="@/assets/images/icons/logo.png" alt="petsmara" />
        <span>PETS MARA</span>
      </router-link>
    </h1>
    <div class="app-nav__right">
      <router-link class="app-nav__link" to="/user/register">
        <img src="@/assets/images/icons/register.png" alt="resgister" />
        <span>회원가입</span>
      </router-link>
      <router-link class="app-nav__link" to="/user/login">
        <img src="@/assets/images/icons/login.png" alt="login" />
        <span>로그인</span>
      </router-link>
      <div class="app-nav__menu" @click="openMenu">
        <img src="@/assets/images/icons/menu.png" alt="menu" />
        <span>메뉴</span>
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      size="40%"
      :show-close="false"
      :withHeader="false"
      class="drawer"
    >
      <div class="drawer__header">
        <div class="drawer__header__left">
          <img
            class="drawer__header__avatar"
            src="@/assets/images/icons/logo.png"
            alt="petsmara"
          />
        </div>
        <div class="drawer__header__center">
          <p class="drawer__header__nickname">비회원</p>
          <p class="drawer__header__paragraph">로그인해주세요.</p>
        </div>
        <div class="drawer__header__right">
          <router-link to="/user/login">
            <img
              class="drawer__header__icon"
              src="@/assets/images/icons/login.png"
              alt="login"
          /></router-link>
        </div>
      </div>
      <nav class="drawer__nav">
        <ul class="drawer__list">
          <li class="drawer__item">
            <router-link class="drawer__link" to="/">홈</router-link>
          </li>
          <li class="drawer__item">
            <router-link class="drawer__link" to="/user/register"
              >회원가입</router-link
            >
          </li>
          <li class="drawer__item">
            <router-link class="drawer__link" to="/user/login"
              >로그인</router-link
            >
          </li>
          <li class="drawer__item">
            <router-link class="drawer__link" to="/user/logout"
              >로그아웃</router-link
            >
          </li>
          <li class="drawer__item">
            <router-link class="drawer__link" to="/user/mypage"
              >마이페이지</router-link
            >
          </li>
          <li class="drawer__item">
            <router-link class="drawer__link" to="/product/register"
              >상품판매하기</router-link
            >
          </li>
          <li class="drawer__item">
            <router-link class="drawer__link" to="/product/list"
              >상품판매리스트</router-link
            >
          </li>
        </ul>
      </nav>
    </el-drawer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('drawer')
export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState(['isOpenedDrawer'])
  },
  methods: {
    ...mapActions(['openDrawer']),
    openMenu() {
      this.openDrawer(true)
      this.drawer = this.isOpenedDrawer
    }
  },
  watch: {
    isOpenedDrawer(newValue, oldValue) {
      this.drawer = this.isOpenedDrawer
    }
  }
}
</script>

<style lang="scss" scoped>
.app-nav {
  @include respond-to('mobile-portrait-only') {
  }
  @include respond-to('tablet-portrait-only') {
    padding: 0 20px 0 30px;
  }
  position: relative;
  height: 85px;
  padding: 0 40px 0 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &__logo {
    a {
      padding: 10px 20px;
    }
    img {
      width: 32px;
    }
    span {
      padding-left: 10px;
      font-weight: 900;
      font-size: 30px;
      color: #000000;
    }
  }
  &__right {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    a {
      padding: 12px;
    }
  }
  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      // width: 30px;
      height: 30px;
    }
    span {
      margin-top: 8px;
      display: inline-block;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
    }
  }
  &__menu {
    cursor: pointer;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 30px;
    }
    span {
      margin-top: 14px;
      display: inline-block;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
    }
  }
}

.drawer {
  &__header {
    padding: 30px 16px 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid #c4c4c4;
    &__left {
      width: 60px;
      height: 60px;
      border: 1px solid #000000;
      border-radius: 50%;
      margin-right: 14px;
      position: relative;
    }
    &__center {
    }
    &__right {
      margin-left: auto;
      a {
        display: inline-block;
        padding: 14px;
      }
    }
    &__nickname {
      font-family: Roboto;
      font-weight: bold;
      font-size: 20px;
      color: #000000;
    }
    &__paragraph {
      font-weight: 500;
      font-size: 14px;
      color: #000000;
    }
    &__avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
    }
    &__icon {
      width: 20px;
    }
  }

  &__nav {
  }
  &__list {
  }
  &__item {
    border-bottom: 1px solid rgba(196, 196, 196, 0.6);
  }
  &__link {
    text-align: left;
    display: block;
    padding: 16px 16px 16px 60px;
  }
}
</style>
