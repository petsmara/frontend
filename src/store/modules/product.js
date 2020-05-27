import ProductService from '@/services/ProductService.js'
export const namespaced = true

export const state = {
  imagePaths: [],
  product: {},
  id: null,
  hasMoreProduct: true,
  productList: [],
  mainProducts: [],
  newProductsList: [],
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
  },
  SET_NEW_LIST(state, payload) {
    state.newProductsList = payload.data.result
  },
  INIT_PRODUCT_LIST(state) {
    state.productList = []
    state.hasMoreProduct = true
    state.productOffset = 0
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
        return error.response
      })
  },
  getProduct({ commit, getters }, id) {
    const product = getters.getProductById(id)

    if (product) {
      commit('SET_PRODUCT', product)
    } else {
      return ProductService.getProduct(id)
        .then(res => {
          commit('SET_PRODUCT', res.data.result)
          return res.data.result
        })
        .catch(error => {
          return error.response
        })
    }
  },

  getProducts({ commit }, { offset, limit, type, product_id }) {
    return ProductService.getProducts({ offset, limit, id: product_id })
      .then(res => {
        if (type === 'main') {
          commit('SET_MAIN_LIST', res)
        } else if (type === 'new') {
          commit('SET_NEW_LIST', res)
        } else {
          commit('CONCAT_PRODUCT_LIST', res)
        }
        return res
      })
      .catch(error => {
        console.error(error)
      })
  },

  initProudctList({ commit }, payload) {
    // return new Promise(function(resolve, reject) {
    //   $.get('url 주소/products/1', function(response) {
    //     // 데이터를 받으면 resolve() 호출
    //     resolve(response);
    //   });
    // });
    return new Promise((resolve, reject) => {
      commit('INIT_PRODUCT_LIST')
      resolve()
    })
  }
}

export const getters = {
  getProductById: state => id => {
    return state.productList.find(product => product.id === id)
  }
}
