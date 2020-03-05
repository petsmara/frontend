import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

// import { Button, Input, Form, FormItem } from 'element-ui'

Vue.use(ElementUI)
// Vue.component(Button)
// Vue.component(Select)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
