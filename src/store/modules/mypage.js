import MypageService from '@/services/MypageService.js'
export const namespaced = true

export const state = {
  profile: {
    nickname: null,
    has_dog: null,
    has_cat: null
  },
  sellingProductList: [],
  soldOutgProductList: [],
  hasMoreProduct: true,
  productOffset: 0,
  sellingProductListOffset: 0
}

export const mutations = {
  SET_USER_PROFILE(state, payload) {
    state.profile = { ...payload }
  },
  SET_USER_SOLDOUT_PROUDCT_LIST(state, payload) {
    state.soldOutProductList = payload
  },
  CONCAT_USER_SELLING_PROUDCT_LIST(state, payload) {
    state.sellingProductList = state.sellingProductList.concat(payload)
    state.hasMoreProduct = payload.length === 10
    state.sellingProductListOffset = state.sellingProductListOffset + 10
  }
}

export const actions = {
  getUserProfile({ commit }) {
    return MypageService.getUserProfile()
      .then(res => {
        commit('SET_USER_PROFILE', res.data.result)
      })
      .catch(error => {
        return error.response
      })
  },
  getUserProductList({ commit }, payload) {
    return MypageService.getUserProductList(payload)
      .then(res => {
        if (payload.tabId === 0) {
          // 판매종료
          commit('SET_USER_SOLDOUT_PROUDCT_LIST', res.data.products)
        }
        if (payload.tabId === 1) {
          // 판매중
          commit('CONCAT_USER_SELLING_PROUDCT_LIST', res.data.products)
          return res
        }
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
