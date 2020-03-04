import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
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
  registerUser(user) {
    return apiClient.post('/users', user)
  }
}
