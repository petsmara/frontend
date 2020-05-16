import UserService from '@/services/UserService.js'
import axios from 'axios'

export const namespaced = true

export const state = {
  user: {
    email: null,
    nickname: null,
    accessToken: null,
    has_dog: null,
    has_cat: null
  }
}

export const mutations = {
  SET_USER_DATA(state, payload) {
    const userData = {
      email: payload.email,
      nickname: payload.nickname,
      accessToken: payload.access_token || payload.accessToken,
      has_dog: payload.has_dog,
      has_cat: payload.has_cat
    }
    state.user = userData
    localStorage.setItem('petsbabUser', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = userData.accessToken
  },
  REMOVE_USER_DATA(state) {
    localStorage.removeItem('petsbabUser')
    location.reload()
    // state.user = null
    // axios.defaults.headers.common['Authorization'] = null
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
  },
  recoveryPassword({ commit }, user) {
    return UserService.recoveryPassword(user)
      .then(res => {
        console.log(res, 'res')
        // commit('SET_IS_RECOVERY', res.data)
        return res
      })
      .catch(error => {
        return error.response
      })
  },
  resetPassword({ commit }, user) {
    return UserService.resetPassword(user)
      .then(res => {
        console.log(res, 'res')
        // commit('SET_IS_RECOVERY', res.data)
        return res
      })
      .catch(error => {
        return error.response
      })
  }
  // findMyPassword({ commit }, user) {
  //   return
  // }
}

export const getters = {
  loggedIn(state) {
    return !!state.user && !!state.user.accessToken
  }
}
