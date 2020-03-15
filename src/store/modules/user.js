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
      accessToken: payload.access_token
    }
    state.user = userData
    localStorage.setItem('petsmaraUser', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = userData.accessToken
  }
}

export const actions = {
  registerUser({ commit }, user) {
    return UserService.registerUser(user)
      .then(res => {
        // commit('SET_USER_DATA', true)
        return res
      })
      .catch(error => {
        throw error
      })
  },
  logIn({ commit }, user) {
    return UserService.logIn(user)
      .then(res => {
        console.log(res)
        commit('SET_USER_DATA', res.data)
        return res
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user.accessToken
  }
}
