import jwt from '../../http/requests/auth/jwt/index.js'
import 'firebase/auth'
import router from '@/router'
import acl from '../../acl/acl'
export default {
  
  loginJWT ({ commit, dispatch }, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.username, payload.userDetails.password)
        .then(response => {
          console.log(response)
          if (response) {
            // function parseJwt(token) {
            //   try {
            //     // Get Token Header
            //     const base64HeaderUrl = token.split('.')[0];
            //     const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
            //     const headerData = JSON.parse(window.atob(base64Header));
            
            //     // Get Token payload and date's
            //     const base64Url = token.split('.')[1];
            //     const base64 = base64Url.replace('-', '+').replace('_', '/');
            //     const dataJWT = JSON.parse(window.atob(base64));
            //     dataJWT.header = headerData;
            
            // // TODO: add expiration at check ...
            
            
            //     return dataJWT;
            //   } catch (err) {
            //     return false;
            //   }
            // }
            // // Set bearer token in axios
            // const userInfo = parseJwt(response.data.access_token)
            const userInfo = 'dealer'
            // acl.change = userInfo
            console.log(acl.initial)
            // console.log(userInfo, 'actions admin')
            // localStorage.setItem('UserInfo', userInfo)
            commit('UPDATE_USER_INFO', userInfo,  {root: true})
            commit('SET_BEARER', response.data.access_token)
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
