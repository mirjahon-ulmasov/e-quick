export default {
  ADD_Product (state, productes) {
    state.productes = productes
  },
  Pagination(state, data){
     state.productes.results.push(...data.results)
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
    console.log(ItemIndex)
    state.carts.items.splice(ItemIndex, 1)
    if (state.carts.items.length == 0) {
      state.carts = null
    }
  },
  REMOVE_Temp (state, template_id) {
    const ItemIndex = state.templetes.findIndex(p => { console.log(p), p.template_id === template_id })
    state.templetes.splice(ItemIndex, 1)
    if (state.templetes.length === 0) {
      state.templetes = null
    }
  },
  UPDATE_PRODUCT (state, carts) {
    const cartsIndex = state.carts.findIndex((p) => p.id === carts.id)
    Object.assign(state.carts[cartsIndex], carts)
  },
  UPDATE_QUANTITY (state, payload) {
    const ItemIndex = state.carts.items.filter(p =>  p.id === payload.id )
    ItemIndex[0].quantity = payload.quantity
    const total = payload.item_price * payload.quantity
    ItemIndex[0].total_price = total
    console.log(payload.item_price)
    state.carts.total_price = state.carts.total_price + payload.item_price
  },
  MIN_QUANTITY (state, payload) {
    const ItemIndex = state.carts.items.filter(p =>  p.id === payload.id )
    ItemIndex[0].quantity = payload.quantity
    const total = payload.item_price * payload.quantity
    ItemIndex[0].total_price = total
    console.log(payload.item_price)
    state.carts.total_price = state.carts.total_price - payload.item_price
  },
  ADD_Templates (state, templetes) {
    state.templetes = templetes
  },
  ADD_TemplatesItem (state, tempDetail) {
    state.tempDetail = tempDetail
  },
  NullData (state) {
  state.orderItem = null
  console.log('nulled')
  }
}
