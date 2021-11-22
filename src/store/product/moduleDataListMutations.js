export default {
  ADD_Product(state, product){
    state.product = product
  },
  ADD_Carts(state, carts){
    state.carts = carts
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, carts) {
    const cartsIndex = state.carts.findIndex((p) => p.id === carts.id)
    Object.assign(state.carts[cartsIndex], carts)
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.products.findIndex((p) => p.id === itemId)
    state.products.splice(ItemIndex, 1)
  }
}
