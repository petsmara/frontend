import axios from 'axios'

export default {
  registerUser(user) {
    return axios.post('/user/account/signup', user)
  },
  logIn(user) {
    return axios.post('/user/account/login', user)
  },
  recoveryPassword(user) {
    return axios.post('/user/account/password', user)
  },
  resetPassword(user) {
    return axios.patch('/user/account/password', user)
  }
}
