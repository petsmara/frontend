<template>
  <div class="app-nav">
    <h1 class="app-nav__logo">
      <router-link to="/">
        <img src="@/assets/images/icons/logo.png" alt="petsmara" />
        <span>PETS BAB</span>
      </router-link>
    </h1>
    <div class="app-nav__right app-nav__right--pc">
      <div>
        <template v-if="!loggedIn">
          <router-link class="app-nav__link-list" to="/user/login"
            >로그인</router-link
          >
          <router-link class="app-nav__link-list" to="/user/register"
            >회원가입</router-link
          >
        </template>
        <template v-else>
          <router-link class="app-nav__link-list" to="/" @click.native="logOut"
            >로그아웃</router-link
          >
        </template>
        <router-link class="app-nav__link-list" to="/user/mypage"
          >마이페이지</router-link
        >
        <router-link class="app-nav__link-list" to="/product/register"
          >판매하기</router-link
        >
        <router-link class="app-nav__link-list" to="/product/list"
          >상품게시판</router-link
        >
      </div>
    </div>
    <div class="app-nav__right app-nav__right--mobile">
      <template v-if="!loggedIn">
        <router-link class="app-nav__link" to="/user/register">
          <img src="@/assets/images/icons/register.png" alt="resgister" />
          <span>회원가입</span>
        </router-link>
        <router-link class="app-nav__link" to="/user/login">
          <img src="@/assets/images/icons/login.png" alt="login" />
          <span>로그인</span>
        </router-link>
      </template>
      <button v-else class="app-nav__link" @click="handlelogOut">
        <img src="@/assets/images/icons/logout.png" alt="logout" />
        <span>로그아웃</span>
      </button>
      <div class="app-nav__menu" @click="openMenu">
        <img src="@/assets/images/icons/menu.png" alt="menu" />
        <span>메뉴</span>
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      size="80%"
      :show-close="false"
      :withHeader="false"
      direction="ltr"
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
          <template v-if="loggedIn">
            <p class="drawer__header__nickname">{{ user.nickname }}</p>
            <p class="drawer__header__paragraph">{{ selectedPet }}</p>
          </template>
          <template v-else>
            <p class="drawer__header__nickname">비회원</p>
            <p class="drawer__header__paragraph">로그인해주세요.</p>
          </template>
        </div>
        <div class="drawer__header__right">
          <template v-if="loggedIn">
            <img
              @click="logOut"
              class="drawer__header__icon"
              src="@/assets/images/icons/logout.png"
              alt="logout"
            />
          </template>
          <template v-else>
            <router-link to="/user/login">
              <img
                class="drawer__header__icon"
                src="@/assets/images/icons/login.png"
                alt="login"
            /></router-link>
          </template>
        </div>
      </div>
      <nav class="drawer__nav">
        <ul class="drawer__list">
          <template v-if="!loggedIn">
            <li class="drawer__item">
              <router-link
                class="drawer__link drawer__link--user"
                to="/user/register"
                >회원가입</router-link
              >
            </li>
          </template>
          <template v-else>
            <li class="drawer__item">
              <router-link
                class="drawer__link drawer__link--user"
                to="/user/mypage"
                >마이페이지</router-link
              >
            </li>
          </template>
          <li class="drawer__item">
            <router-link
              class="drawer__link drawer__link--list"
              to="/product/list"
              >상품게시판</router-link
            >
          </li>
          <li class="drawer__item">
            <router-link
              class="drawer__link drawer__link--write"
              to="/product/register"
              >글쓰기</router-link
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
const {
  mapState: userMapState,
  mapActions: userMapActions
} = createNamespacedHelpers('user')
import { authComputed } from '@/store/helpers.js'
export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...authComputed,
    ...mapState(['isOpenedDrawer']),
    ...userMapState(['user']),
    selectedPet() {
      const isSelectedDog = this.user.has_dog ? '강아지' : ''
      const isSelectedCat = this.user.has_cat ? '고양이' : ''
      const divider = isSelectedDog && isSelectedCat ? ', ' : ''
      return `${isSelectedDog}${divider}${isSelectedCat}`
    }
  },
  methods: {
    ...mapActions(['openDrawer']),
    ...userMapActions(['logOut']),
    openMenu() {
      this.openDrawer(true)
      this.drawer = this.isOpenedDrawer
    },
    handlelogOut() {
      this.logOut().then(res => {
        this.$message({
          message: '로그아웃이 완료되었습니다.!',
          duration: 1000,
          showClose: true,
          offset: 60,
          type: 'success'
        })
      })
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
  @include respond-to('tablet-portrait-only') {
    height: auto;
    padding: 12px 0;
    display: block;
  }
  position: relative;
  height: 85px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &__link-list {
    font-size: 14px;
    color: #000000;
  }
  &__logo {
    @include respond-to('tablet-portrait-only') {
      width: 100%;
    }
    a {
      padding: 10px 20px;
    }
    img {
      width: 32px;
    }
    span {
      @include respond-to('tablet-portrait-only') {
        display: none;
      }
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
    @include respond-to('tablet-portrait-only') {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    a,
    button {
      cursor: pointer;
      padding: 12px;
    }
    &--pc {
      display: flex;
      align-items: center;
      @include respond-to('tablet-portrait-only') {
        display: none;
      }
      .app-nav__menu {
        padding: 12px 36px;
      }
    }
    &--mobile {
      display: none;
      @include respond-to('tablet-portrait-only') {
        display: block;
      }
    }
  }
  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include respond-to('tablet-portrait-only') {
      display: none;
    }

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
      @include respond-to('tablet-portrait-only') {
        display: none;
      }
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
    &__right {
      margin-left: auto;
      a {
        display: inline-block;
        padding: 14px;
      }
    }
    &__nickname {
      text-align: left;
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
  &__item {
    border-bottom: 1px solid rgba(196, 196, 196, 0.6);
  }
  &__link {
    width: 100%;
    cursor: pointer;
    font-size: 16px;
    text-align: left;
    display: block;
    padding: 16px 16px 16px 76px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 20px;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 0 0;
    }
    &--user {
      &::before {
        background-image: url(~@/assets/images/icons/register.png);
      }
    }
    &--list {
      &::before {
        width: 20px;
        height: 14px;
        background-image: url(~@/assets/images/icons/menu.png);
      }
    }
    &--write {
      &::before {
        width: 20px;
        height: 14px;
        background-image: url(~@/assets/images/icons/write--black.png);
      }
    }
  }
}
.el-dropdown-menu {
  padding: 5px 0;
}
.el-dropdown-menu__item {
  padding: 10px 26px;
  line-height: 1;
}
</style>
