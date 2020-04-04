import MypageService from '@/services/MypageService.js'
export const namespaced = true

export const state = {
  profile: {
    nickname: null,
    has_dog: null,
    has_cat: null
  }
}

export const mutations = {
  SET_USER_PROFILE(state, payload) {
    state.profile = { ...payload }
  }
}

export const actions = {
  getUserProfile({ commit }) {
    return MypageService.getUserProfile()
      .then(res => {
        console.log(res, 'mypage')
        commit('SET_USER_PROFILE', res.data.result)
      })
      .catch(error => {
        return error.response
      })
  }
}

export const getters = {
  // loggedIn(state) {
  //   return !!state.user && !!state.user.accessToken
  // }
}
