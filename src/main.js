import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/css/element-variables.scss'
// import '@/assets/css/style.scss'
// import { Button, Input, Form, FormItem } from 'element-ui'
Vue.use(ElementUI)
// Vue.component(Button)
// Vue.component(Select)

Vue.use(ElementUI)
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
