export default {
  ADD_ITEM (state, item) {
    state.categories = item
  },
  ADD_Product(state, product){
    state.product = product
  },
  SET_PRODUCTS (state, products) {
    state.products = products
  },
  SET_SAP (state, sap) {
    state.sap = sap
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, product) {
    const productIndex = state.products.findIndex((p) => p.id === product.id)
    Object.assign(state.products[productIndex], product)
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.products.findIndex((p) => p.id === itemId)
    state.products.splice(ItemIndex, 1)
  }
}
