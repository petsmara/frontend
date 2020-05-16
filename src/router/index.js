import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/register',
    name: 'RegisterUser',
    component: () => import('../views/user/RegisterUser.vue')
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/user/mypage',
    name: 'Mypage',
    component: () => import('../views/user/Mypage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: () => import('../views/product/ProductList.vue')
  },
  {
    path: '/product/register',
    name: 'RegisterProduct',
    component: () => import('../views/product/RegisterProduct.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/product/:id',
    component: () => import('../views/product/Product.vue'),
    props: true
    // beforeEnter(routeTo, routeFrom, next) {
    //   // before this route is loaded
    //   store.dispatch('product/getProduct', routeTo.params.id).then(product => {
    //     routeTo.params.product = product
    //     next()
    //   })
    // }
  },
  {
    path: '/user/welcome',
    name: 'Welcome',
    component: () => import('../views/user/Welcome.vue')
  },
  {
    path: '/findpassword',
    name: 'FindPassword',
    component: () => import('../views/FindPassword.vue')
  },
  {
    path: '/reset-your-password',
    name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    // return { x: 0, y: 0 }
    document.getElementById('app').scrollIntoView()
  }
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  store.dispatch('path/setRedirectPath', routeFrom.fullPath)
  store.dispatch('drawer/closeDrawer', false)
  const loggedIn = localStorage.getItem('petsbabUser')
  if (routeTo.matched.some(record => record.meta.requiresAuth)) {
    // 이 라우트는 인증이 필요하며 로그인 한 경우 확인하십시오.
    // 그렇지 않은 경우 로그인 페이지로 리디렉션하십시오.
    if (!loggedIn) {
      next({
        path: '/user/login',
        query: { redirect: routeTo.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 반드시 next()를 호출하십시오!
  }
})

router.afterEach((routeTo, routeFrom, next) => {
  if (routeTo.name === 'ProductList') {
    return false
  }
  NProgress.done()
})

export default router
