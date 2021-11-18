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

function addSubscriber (callback) {
  subscribers.push(callback)
}
export default {
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const { config, response } = error
      const originalRequest = config
      localStorage.removeItem('access')
      router.push('/login')
      // if (status === 401) {
      // if (response && response.status === 401) {
      //   if (!isAlreadyFetchingAccessToken) {
      //     isAlreadyFetchingAccessToken = true
      //   }

      //   const retryOriginalRequest = new Promise((resolve) => {
      //     addSubscriber(access => {
      //       originalRequest.headers.Authorization = `Bearer ${access}`
      //       resolve(axios(originalRequest))
      //     })
      //   })
      //   return retryOriginalRequest
      // }
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
