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
</style>
