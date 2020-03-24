import axios from 'axios'
export default {
  uploadImages(images) {
    return axios.post('/image', images)
  },
  registerProduct(product) {
    return axios.post('/product', product)
  },
  getProduct(productId) {
    return axios.get(`/product/${productId}`)
  },
  getProducts({ offset = 0, limit = 9 }) {
    return axios.get(`/product?offset=${offset}&limit=${limit}`)
  }
}
