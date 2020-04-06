import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/element-ui.scss'
import 'nprogress/nprogress.css'
import Dayjs from '@/plugin/dayjs'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(Dayjs)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://52.78.166.10:8000'

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const userString = localStorage.getItem('petsmaraUser')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('user/SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          // this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  }
}).$mount('#app')
