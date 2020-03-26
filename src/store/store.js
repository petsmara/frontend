import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as product from '@/store/modules/product.js'
import * as drawer from '@/store/modules/drawer.js'
import * as path from '@/store/modules/path.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    product,
    drawer,
    path
  },
  state: {
    test: 'teaast'
  }
  // mutations: {},
  // actions: {},
  // modules: {}
})
