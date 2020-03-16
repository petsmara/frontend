import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://52.78.166.10:8000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
})

export default {
  // getUsers(perPage, page) {
  //   return apiClient.get('/Users?_limit=' + perPage + '&_page=' + page)
  // },
  // getUser(id) {
  //   return apiClient.get('/Users/' + id)
  // },
  uploadImages(images) {
    return apiClient.post('/image', images)
  },
  registerProduct(product) {
    return apiClient.post('/product', product)
  }
  // logIn(user) {}
}
