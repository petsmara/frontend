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
    component: () => import('../views/user/Mypage.vue')
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: () => import('../views/product/ProductList.vue')
  },
  {
    path: '/product/register',
    name: 'RegisterProduct',
    component: () => import('../views/product/RegisterProduct.vue')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView()
  }
})

router.beforeEach((routeTo, routeFrom, next) => {
  store.dispatch('drawer/closeDrawer', false)
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
