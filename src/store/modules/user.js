import UserService from '@/services/UserService.js'

export const namespaced = true

export const state = {
  isAuthorization: false
}

export const mutations = {
  REGISTER_USER(state, payload) {
    state.isAuthorization = payload
  }
}

export const actions = {
  registerUser({ commit }, user) {
    return UserService.registerUser(user)
      .then(res => {
        console.log(res)
        commit('REGISTER_USER', true)
      })
      .catch(error => {
        throw error
      })
  },
  signIn({ commit }, user) {
    return UserService.signIn(user)
      .then(() => {
        commit('SIGN_IN', user)
      })
      .catch(error => {
        throw error
      })
  }
}
