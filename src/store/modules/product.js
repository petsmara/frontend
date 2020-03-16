import ProductService from '@/services/ProductService.js'

export const namespaced = true

export const state = {
  imagePaths: []
}

export const mutations = {
  CONCAT_IMAGE_PATHS(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  }
}

export const actions = {
  uploadImages({ commit }, images) {
    return ProductService.uploadImages(images)
      .then(res => {
        console.log(res)
        commit('CONCAT_IMAGE_PATHS', res.data)
      })
      .catch(error => {
        console.error(error)
      })
  },
  registerProduct({ commit }, product) {
    return ProductService.registerProduct(product)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export const getters = {
  // loggedIn(state) {
  //   return !!state.user
  // }
}
