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
  registerUser({ commit, dispatch }, user) {
    return UserService.registerUser(user)
      .then(() => {
        commit('REGISTER_USER', true)
      })
      .catch(error => {
        throw error
      })
  }
}
