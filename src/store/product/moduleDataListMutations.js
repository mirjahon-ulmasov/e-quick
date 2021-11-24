export default {
  ADD_Product(state, productes){
    state.productes = productes
  },
  ADD_Carts(state, carts){
    state.carts = carts
  },
  ADD_Orders(state, orders){
    state.orders = orders
  },
  ADD_OrdersItem(state, orderItem){
    state.orderItem = orderItem
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, carts) {
    const cartsIndex = state.carts.findIndex((p) => p.id === carts.id)
    Object.assign(state.carts[cartsIndex], carts)
  },
}
