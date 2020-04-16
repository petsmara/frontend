import ProductService from '@/services/ProductService.js'
export const namespaced = true

export const state = {
  imagePaths: [],
  product: {},
  id: null,
  hasMoreProduct: true,
  productList: [],
  mainProducts: [],
  productOffset: 0
}

export const mutations = {
  SET_PRODUCT(state, payload) {
    state.product = payload
  },
  CONCAT_IMAGE_PATHS(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },
  REMOVE_IMAGE_PATH(state, index) {
    state.imagePaths.splice(index, 1)
  },
  REMOVE_ALL_IMAGE_PATH(state) {
    state.imagePaths = []
  },
  CONCAT_PRODUCT_LIST(state, payload) {
    state.productList = state.productList.concat(payload.data.result)
    state.hasMoreProduct = payload.data.result.length === 10
    state.productOffset = state.productOffset + 10
  },
  SET_MAIN_LIST(state, payload) {
    state.mainProducts = payload.data.result
  }
}

export const actions = {
  uploadImages({ commit }, images) {
    return ProductService.uploadImages(images)
      .then(res => {
        commit('CONCAT_IMAGE_PATHS', res.data.images)
      })
      .catch(error => {
        console.error(error)
      })
  },
  removeImagePath({ commit }, index) {
    commit('REMOVE_IMAGE_PATH', index)
  },
  registerProduct({ commit }, product) {
    return ProductService.registerProduct(product)
      .then(res => {
        commit('REMOVE_ALL_IMAGE_PATH')
        return res
      })
      .catch(error => {
        console.log(error.response)
        return error.response
      })
  },
  getProduct({ commit }, id) {
    return ProductService.getProduct(id)
      .then(res => {
        commit('SET_PRODUCT', res.data.result)
        return res.data.result
      })
      .catch(error => {
        console.log(error.response)
        return error.response
      })
  },

  getProducts({ commit }, payload) {
    return ProductService.getProducts(payload)
      .then(res => {
        commit('CONCAT_PRODUCT_LIST', res)
        return res
      })
      .catch(error => {
        console.log(error)
      })
  },
  getMainProducts({ commit }, payload) {
    return ProductService.getProducts(payload)
      .then(res => {
        commit('SET_MAIN_LIST', res)
        return res
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const getters = {
  // loggedIn(state) {
  //   return !!state.user
  // }
}
