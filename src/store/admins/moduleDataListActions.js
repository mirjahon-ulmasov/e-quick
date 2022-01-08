import axios from '@/axios.js'

export default {
  addItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/users', (item))
        .then((response) => {
          commit('ADD_User', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchDataListItems ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/users')
        .then((response) => {
          commit('SET_User', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateItem ({ commit }, item) {
    return new Promise((resolve, reject) => { 
      axios.put(`/api/v1/users/${item.id}`, (item))
        .then((response) => {
          commit('UPDATE_User', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeItem ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/v1/users/${itemId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchRoles ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/allowed_roles')
        .then((response) => {
          commit('SET_Roles', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUserById ({ commit }, id) {
    if (id >= 0) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/v1/users/${id}`)
          .then((response) => {
            commit('SET_UserById', response.data)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    }
  },
  NotisfyGet ({ commit },) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/v1/notifications/${localStorage.getItem('Id')}`)
          .then((response) => {
            commit('SET_Notisfy', response.data)
            commit('SET_notseen', response.data)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
  },
     NotisfyPut ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.put(`/api/v1/notifications/seen/${id}`)
          .then((response) => {
            commit('SET_Notisfy', response.data)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
  },
  NotisfySeenAll ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/v1/notifications/seen/all/${localStorage.getItem('Id')}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
},
NotisfyDelete ({ commit }, id) {
  return new Promise((resolve, reject) => {
    axios.put(`/api/v1/notifications/delete/${id}`)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => { reject(error) })
  })
},
  UserReviews ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/v1/users/review`, (payload))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
}
}
