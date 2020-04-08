import axios from 'axios'

export default {
  getUserProfile() {
    return axios.get('user/account/profile')
  },
  getUserProductList({ tabId = 1, offset = 0, limit = 10 }) {
    return axios.get(
      `user/account/product/${tabId}?offset=${offset}&limit=${limit}`
    )
  },
  changeToSoldOut(id) {
    return axios.put(`product/${id}`, {
      on_sale: false
    })
  },
  deleteProduct(productId) {
    return axios.delete(`/product/${productId}`)
  }
}
