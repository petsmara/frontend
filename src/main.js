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
import '@/helpers/filters'
import VueGtag from 'vue-gtag'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(Dayjs)
Vue.use(VueGtag, {
  config: { id: 'UA-164590286-1' }
})

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_PRODUCTION_URI

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const userString = localStorage.getItem('petsbabUser')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('user/SET_USER_DATA', userData)
    }
  }
}).$mount('#app')
