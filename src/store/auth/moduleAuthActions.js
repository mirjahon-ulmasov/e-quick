import jwt from '../../http/requests/auth/jwt/index.js'
import axios from '@/axios.js'
export default {
  
  loginJWT ({ commit, dispatch }, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.username, payload.userDetails.password)
        .then(response => {
          console.log(response)
          if (response) {
            // Decode jwt token
            function parseJwt (token) {
              try {
                // Get Token Header
                const base64HeaderUrl = token.split('.')[0]
                const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/')
                const headerData = JSON.parse(window.atob(base64Header))
            
                // Get Token payload and date's
                const base64Url = token.split('.')[1]
                const base64 = base64Url.replace('-', '+').replace('_', '/')
                const dataJWT = JSON.parse(window.atob(base64))
                dataJWT.header = headerData
            
                // TODO: add expiration at check ...
            
            
                return dataJWT
              } catch (err) {
                return false
              }
            }

            //  User Info
            const userInfo = parseJwt(response.data.access_token)
            console.log(userInfo, 'manana')
            // Set userId
            localStorage.setItem('Id', userInfo.id)
            // Set userRole in mutations
            commit('UPDATE_USER_INFO', userInfo,  {root: true})
            // Set bearer token in axios
            commit('SET_BEARER', response.data.access_token)
            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }
        })
        .catch(error => { reject(error) })
    })
  },
  DealerInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/users/${ localStorage.getItem('Id')}`)
        .then((response) => {
          commit('SetInfo', response.data)
          console.log(response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/v1/users/${localStorage.getItem("Id")}`, (item),{
      })
        .then((response) => {
          commit('UpdateInfo', item)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateIMG ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/v1/users/upload_picture/${localStorage.getItem("Id")}`, item,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          commit('UpdateIMG', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  ResetPass ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/users/reset_password', (item))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  Verify ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/users/verify', (item))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  ChangePass ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/users/change_password', (item))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
