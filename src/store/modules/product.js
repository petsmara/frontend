import ProductService from '@/services/ProductService.js'

export const namespaced = true

export const state = {
  // product: {
  //   email: '',
  //   nickname: '',
  //   acessToken: ''
  // }
}

export const mutations = {
  SET_USER_DATA(state, payload) {
    state.user = payload
  }
}

export const actions = {
  registerUser({ commit }, user) {
    return UserService.registerUser(user)
      .then(res => {
        console.log(res)
        // 로컬스토리지 등록
        // axios header token 추가
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        // axios.defaults.headers.common['Authorization'] = userData.token
        commit('SET_USER_DATA', true)
      })
      .catch(error => {
        throw error
      })
  },
  logIn({ commit }, user) {
    return UserService.logIn(user)
      .then(() => {
        // 로컬스토리지 등록
        // axios header token 추가
        commit('SET_USER_DATA', user)
      })
      .catch(error => {
        throw error
      })
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
