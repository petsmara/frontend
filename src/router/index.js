import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    path: '/product/list/:id',
    component: () => import('../views/product/Product.vue')
  },
  {
    path: '/product/register',
    name: 'RegisterProduct',
    component: () => import('../views/product/RegisterProduct.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
