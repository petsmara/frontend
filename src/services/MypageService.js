import axios from 'axios'

export default {
  getUserProfile() {
    return axios.get('user/account/profile')
  }
  // logIn(user) {
  //   return axios.post('/user/account/login', user)
  // }
}
