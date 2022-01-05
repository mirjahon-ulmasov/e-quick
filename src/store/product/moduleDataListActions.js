// Products , Carts , Orders
import axios from '@/axios.js'
export default {
  // Get product by category id
  GetProduct ({ commit }, obj) {
    console.log(obj)
    if (obj.id >= 0) {
      return new Promise((resolve, reject) => {
        axios.get('api/v1/subcategory/' + `${obj.id}/products`
        )
          .then((response) => {
            commit('ADD_Product', response.data)
            console.log(response)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    }
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
      axios.get(`api/v1/cart/${  localStorage.getItem('Id')}`
      )
        .then((response) => {
          commit('ADD_Carts', response.data)
          console.log(response, 'cart')
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  DeleteCartItem ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.delete(`api/v1/cart/remove/${id}`
      )
        .then((response) => {
          commit('REMOVE_CART', id)
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
      axios.get(`/api/v1/orders/${  localStorage.getItem('Id')}`)
        .then((response) => {
          commit('ADD_Orders', response.data.reverse())
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Get ordered Cart list items
  GetOrderItem ({ commit }, id) {
    if (id >= 0) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/v1/orders/${  localStorage.getItem('Id')  }/${id}`)
          .then((response) => {
            commit('ADD_OrdersItem', response.data)
            console.log(response.data)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    }
  },
  // Get order exchange
  GetOrderExchange ({ commit }, item) {
    console.log(item)
    if(item.value !== null){
      return new Promise((resolve, reject) => {
        axios.post('/api/v1/exchange', (item)
        )
          .then((response) => {
            // commit('ADD_Orders', response.data)
            console.log(response.data)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    }
  },
  // Post templates list
  PostTemplates ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/templates', (payload))
        .then((response) => {
          // commit('ADD_Templates', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Get templates list
  GetTemplates ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/templates/${  localStorage.getItem('Id')}`)
        .then((response) => {
          commit('ADD_Templates', response.data)
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Get Templates list items
  GetTemplatesItem ({ commit }, template_id) {
    if (template_id >= 0) {
      return new Promise((resolve, reject) => {
        axios.get(`api/v1/templates/${localStorage.getItem('Id')}/${template_id}`)
          .then((response) => {
            commit('ADD_TemplatesItem', response.data)
            console.log(response.data)
            resolve(response)
          })
          .catch((error) => { reject(error) })
      })
    }
  },
  // Templates list export
  GetFile ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('api/v1/orders/export', (payload),
      { responseType: 'blob' }
      )
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  // Templates Delete
  UpdateTemplate ({  commit }, template_id) {
    return new Promise((resolve, reject) => {
      axios.put(`api/v1/templates/${template_id}`)
        .then((response) => {
          commit('REMOVE_Temp', template_id)
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  OrderTemplate ({  commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('api/v1/templates/checkout ', (payload))
        .then((response) => {
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  AddCartTemplate ({  commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('api/v1/templates/add/cart', (payload))
        .then((response) => {
          console.log(response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
