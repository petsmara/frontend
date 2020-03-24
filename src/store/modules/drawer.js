export const namespaced = true

export const state = {
  isOpenedDrawer: false
}

export const mutations = {
  SET_DRAWER_STATUS(state, payload) {
    state.isOpenedDrawer = payload
  }
}

export const actions = {
  openDrawer({ commit }, payload) {
    commit('SET_DRAWER_STATUS', payload)
  },
  closeDrawer({ commit }, payload) {
    commit('SET_DRAWER_STATUS', payload)
  }
}
