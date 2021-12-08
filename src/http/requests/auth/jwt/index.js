import axios from '../../../axios/index.js'
import router from '../../../../router'

export default {
  // Logout when token expired
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        router.push('/login')
      }
      return Promise.reject(error)
    })
  },
  // Login User
  login (username, password) {
    return axios.post('/api/v1/login', {
      username,
      password
    })
  },
}
