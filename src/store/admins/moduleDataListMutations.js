export default {
  ADD_ITEM (state, item) {
    state.admins.unshift(item)
  },
  SET_PRODUCTS (state, admins) {
    state.admins = admins
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT (state, admins) {
    const productIndex = state.admins.findIndex((p) => p.id === admins.id)
    Object.assign(state.admins[productIndex], admins)
  },
  REMOVE_ITEM (state, itemId) {
    const ItemIndex = state.admins.findIndex((p) => p.id === itemId)
    state.admins.splice(ItemIndex, 1)
  }
}
