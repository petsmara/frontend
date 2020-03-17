import axios from 'axios'
export default {
  uploadImages(images) {
    return axios.post('/image', images)
  },
  registerProduct(product) {
    return axios.post('/product', product)
  }
}
