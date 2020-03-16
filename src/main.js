import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/element-variables.scss'
import '@/assets/css/style.scss'
// import { Button, Input, Form, FormItem } from 'element-ui'
Vue.use(ElementUI)
// Vue.component(Button)
// Vue.component(Select)

Vue.config.productionTip = false

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
  }
}).$mount('#app')
