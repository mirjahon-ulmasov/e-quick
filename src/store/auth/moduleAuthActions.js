import jwt from '../../http/requests/auth/jwt/index.js'
import 'firebase/auth'
import router from '@/router'

export default {
  
  loginJWT ({ commit }, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.username, payload.userDetails.password)
        .then(response => {
          console.log(response)
          // If there's user data in response
          if (response) {
            // Set accessToken
            localStorage.setItem('access', response.data.accessToken)
            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken)
            // Navigate User to homepage
            router.push('/')
            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }
        })
        .catch(error => { reject(error) })
    })
  },
  fetchAccessToken () {
    return new Promise((resolve) => {
      jwt.refreshToken().then(response => { resolve(response) })
    })
  }
}
