export default {
  ADD_Product (state, productes) {
    state.productes = productes
  },
  ADD_Carts (state, carts) {
    state.carts = carts
  },
  ADD_Orders (state, orders) {
    state.orders = orders
  },
  ADD_OrdersItem (state, orderItem) {
    state.orderItem = orderItem
  },
  REMOVE_CART (state, id) {
    const carts = state.carts
    const ItemIndex = carts.items.findIndex(p => { p.id === id })
    state.carts.items.splice(ItemIndex, 1)
    if (state.carts.items.length == 0) {
      state.carts = null
    }
  },
  REMOVE_Temp (state, template_id) {
    const carts = state.templetes
    const ItemIndex = carts.findIndex(p => { p.template_id === template_id })
    state.templetes.splice(ItemIndex, 1)
    if (state.templetes.items.length == 0) {
      state.templetes = null
    }
  },
  UPDATE_PRODUCT (state, carts) {
    const cartsIndex = state.carts.findIndex((p) => p.id === carts.id)
    Object.assign(state.carts[cartsIndex], carts)
  },
  ADD_Templates (state, templetes) {
    state.templetes = templetes
  },
  ADD_TemplatesItem (state, tempDetail) {
    state.tempDetail = tempDetail
  }
}
