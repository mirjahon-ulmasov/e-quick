// Products , Carts , Orders
import axios from '@/axios.js'
export default {
  // Get product by category id
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
  // Adding product to cart
  AddCart ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('api/v1/cart/add', (payload)
      )
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Get added products in cart
  GetCart ({ commit },) {
    return new Promise((resolve, reject) => {
      axios.get('api/v1/cart/' + localStorage.getItem('Id')
      )
        .then((response) => {
          commit('ADD_Carts', response.data)
          console.log(response, 'cart')
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Update product quantity in cart
  updateCart ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put('/api/v1/increment/quantity', (item))
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  //  Order Cart items
  Order ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/orders/checkout', (item))
        .then((response) => {
          // commit('UPDATE_PRODUCT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Get ordered cart lists
  GetOrder ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/orders/' + localStorage.getItem('Id'))
        .then((response) => {
          commit('ADD_Orders', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Get ordered Cart list items
  GetOrderItem ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/orders/' + localStorage.getItem('Id') + `/${id}`  )
        .then((response) => {
          commit('ADD_OrdersItem', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
