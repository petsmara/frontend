import MypageService from '@/services/MypageService.js'
export const namespaced = true

export const state = {
  profile: {
    nickname: null,
    has_dog: null,
    has_cat: null
  },
  sellingProductList: [],
  soldOutProductList: [],
  hasMoreProduct: true,
  productListOffset: 0
}

export const mutations = {
  SET_USER_PROFILE(state, payload) {
    state.profile = { ...payload }
  },
  SET_USER_SOLDOUT_PROUDCT_LIST(state, payload) {
    state.soldOutProductList = state.soldOutProductList.concat(payload)
    state.hasMoreProduct = payload.length === 10
    state.productListOffset = state.productListOffset + 10
  },
  CONCAT_USER_SELLING_PROUDCT_LIST(state, payload) {
    state.sellingProductList = state.sellingProductList.concat(payload)
    state.hasMoreProduct = payload.length === 10
    state.productListOffset = state.productListOffset + 10
  },
  INIT_MYPAGE_OPTIONS(state, payload) {
    state.sellingProductList = []
    state.soldOutProductList = []
    state.productListOffset = 0
    state.hasMoreProduct = true
  },
  CHANGE_TODO_SOLD_OUT(state, payload) {
    const index = state.sellingProductList.findIndex(({ id }) => {
      return id === payload
    })
    state.sellingProductList.splice(index, 1)
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
          return res
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
  },
  changeToSoldOut({ commit }, payload) {
    return MypageService.changeToSoldOut(payload)
      .then(res => {
        commit('CHANGE_TODO_SOLD_OUT', res.data.message.id)
      })
      .catch(error => {
        return error.response
      })
  },
  initMypageOptions({ commit }) {
    commit('INIT_MYPAGE_OPTIONS')
  }
}

export const getters = {
  // loggedIn(state) {
  //   return !!state.user && !!state.user.accessToken
  // }
}
