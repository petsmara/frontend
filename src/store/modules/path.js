export const namespaced = true

export const state = {
  redirectPath: null
}

export const mutations = {
  SET_REDIRECT_PATH(state, payload) {
    state.redirectPath = payload
  }
}

export const actions = {
  setRedirectPath({ commit }, payload) {
    commit('SET_REDIRECT_PATH', payload)
  }
}
