import axios from '@/axios.js'

// User Auth and Update Reset and Verify

export default {
  
  loginJWT ({ commit, dispatch }, payload) {

    return new Promise((resolve, reject) => {
      axios.post('/api/v1/login', payload.userDetails )
        .then(response => {
          if (response) {
            //  User Info
            const userInfo = response.data.access_token
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
          console.log(response.data);
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
