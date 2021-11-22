import axios from '../../../axios/index.js'
import store from '../../../../store/store.js'
import router from '../../../../router'
// import axios from 'axios'
// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (access) {
  subscribers = subscribers.filter(callback => callback(access))
}

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        router.push('/v/login')
      }
      return Promise.reject(error)
    })
  },
  login (username, password) {
    return axios.post('/api/v1/login', {
      username,
      password
    })
  },
}
