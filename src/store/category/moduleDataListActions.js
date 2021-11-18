import axios from '@/axios.js'

export default {
  GetItem ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/company_group/dealer/' + localStorage.getItem('Id'))
        .then((response) => {
          commit('ADD_ITEM', response.data)
          console.log(response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  GetProduct ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get('http://product-api.jprq.io/api/products_by_subcategory/' + `${2}/?format=json`,
     {headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
    }
      )
        .then((response) => {
          commit('ADD_Product', response.data)
          console.log(response)
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
