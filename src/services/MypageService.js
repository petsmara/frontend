import axios from 'axios'

export default {
  getUserProfile() {
    return axios.get('user/account/profile')
  },
  getUserProductList({ tabId = 1, offset = 0, limit = 10 }) {
    return axios.get(
      `user/account/product/${tabId}?offset=${offset}&limit=${limit}`
    )
  }
}
