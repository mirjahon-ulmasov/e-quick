import axios from '@/axios.js'
export default {
  GetProduct ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get('api/v1/products_by_subcategory/' + `${id}/`
      )
        .then((response) => {
          commit('ADD_Product', response.data)
          console.log(response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  AddCart ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('api/v1/cart/add', {payload}
      )
        .then((response) => {
          // commit('ADD_Product', response.data)
          console.log(response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  GetCart ({ commit },) {
    return new Promise((resolve, reject) => {
      axios.get('api/v1/cart/' + localStorage.getItem('Id')
      )
        .then((response) => {
          commit('ADD_Carts', response.data)
          console.log(response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateCart ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put('/api/v1/increment/quantity', {item})
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
