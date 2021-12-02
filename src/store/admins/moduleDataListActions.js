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
          console.log(response)
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
          commit('REMOVE_ITEM', itemId)
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
  fetchUserById ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/users/${item.id}`  )
        .then((response) => {
          console.log(response)
          commit('SET_UserById', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
