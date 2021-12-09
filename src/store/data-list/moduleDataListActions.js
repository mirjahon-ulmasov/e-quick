import axios from '@/axios.js'

export default {
  addItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('/api/data-list/products/', {item})
        .then((response) => {
          commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchDataListItems ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/data-list/products')
        .then((response) => {
          commit('SET_PRODUCTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
    fetchDataCompanies ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/companies')
        .then((response) => {
          commit('SET_Companies', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  AddUserCompanies ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/company_group/dealer', (payload))
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchDataListSap ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/sap/sap/')
        .then((response) => {
          commit('SET_SAP', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/data-list/products/${item.id}`, {item})
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeItem ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/data-list/products/${itemId}`)
        .then((response) => {
          commit('REMOVE_ITEM', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
