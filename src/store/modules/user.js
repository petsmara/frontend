import UserService from '@/services/UserService.js'
import axios from 'axios'

export const namespaced = true

export const state = {
  user: {
    email: null,
    nickname: null,
    accessToken: null
  }
}

export const mutations = {
  SET_USER_DATA(state, payload) {
    const userData = {
      email: payload.email,
      nickname: payload.nickname,
      accessToken: payload.access_token || payload.accessToken
    }
    state.user = userData
    localStorage.setItem('petsmaraUser', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = userData.accessToken
  },
  REMOVE_USER_DATA(state) {
    localStorage.removeItem('petsmaraUser')
    state.user = null
    axios.defaults.headers.common['Authorization'] = null
  }
}

export const actions = {
  registerUser({ commit }, user) {
    return UserService.registerUser(user)
      .then(res => {
        commit('SET_USER_DATA', res.data)
        return res
      })
      .catch(error => {
        return error.response
      })
  },
  logIn({ commit }, user) {
    return UserService.logIn(user)
      .then(res => {
        commit('SET_USER_DATA', res.data)
        return res
      })
      .catch(error => {
        return error.response
      })
  },
  logOut({ commit }) {
    commit('REMOVE_USER_DATA')
    return true
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user && !!state.user.accessToken
  }
}
