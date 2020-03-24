<template>
  <div class="app-nav">
    <h1 class="app-nav__logo">
      <router-link to="/">
        <img src="@/assets/images/icons/logo.png" alt="petsmara" />
      </router-link>
    </h1>
    <div class="app-nav__right">
      <router-link to="/user/mypage">
        <button class="app-nav__mypage"></button>
      </router-link>
      <button class="app-nav__menu" @click="openMenu"></button>
    </div>
    <el-drawer title="메뉴메뉴메뉴" :visible.sync="drawer" size="40%">
      <nav>
        <ul>
          <li>
            <router-link to="/">홈</router-link>
          </li>
          <li>
            <router-link to="/user/register">회원가입</router-link>
          </li>
          <li>
            <router-link to="/user/login">로그인</router-link>
          </li>
          <li>
            <router-link to="/user/logout">로그아웃</router-link>
          </li>
          <li>
            <router-link to="/user/mypage">마이페이지</router-link>
          </li>
          <li>
            <router-link to="/product/register">상품판매하기</router-link>
          </li>
          <li>
            <router-link to="/product/list">상품판매리스트</router-link>
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
    // background-color: lavender;
  }
  @include respond-to('tablet-portrait-only') {
    padding: 0 20px 0 30px;
  }
  position: relative;
  height: 85px;
  background-color: #c4c4c4;
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
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      padding: 20px;
    }
  }
  &__mypage {
    cursor: pointer;
    border: none;
    outline: none;
    display: inline-block;
    width: 22px;
    height: 27px;
    background: url('~@/assets/images/icons/mypage.png') center / 100% no-repeat;
  }
  &__menu {
    cursor: pointer;
    border: none;
    outline: none;
    display: inline-block;
    width: 25px;
    height: 16px;
    background: url('~@/assets/images/icons/menu.png') center / 100% no-repeat;
  }
}
</style>
