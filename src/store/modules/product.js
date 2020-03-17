import ProductService from '@/services/ProductService.js'

export const namespaced = true

export const state = {
  imagePaths: []
}

export const mutations = {
  CONCAT_IMAGE_PATHS(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },
  REMOVE_IMAGE_PATH(state, index) {
    state.imagePaths.splice(index, 1)
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
    console.log(index, 'store')
    commit('REMOVE_IMAGE_PATH', index)
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
