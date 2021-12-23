export default {
  ADD_User (state, item) {
    state.admins.unshift(item)
  },
  SET_User (state, admins) {
    state.admins = admins
  },
  SET_Roles (state, roles) {
    state.roles = roles
  },
  UPDATE_User (state, admins) {
    const productIndex = state.admins.findIndex((p) => p.id === admins.id)
    Object.assign(state.admins[productIndex], admins)
  },
  SET_UserById (state, detail) {
    state.detail = detail
  },
  SET_Notisfy(state, notisfy){
    state.notisfy = notisfy
    // state.not_seen = notisfy.filter(x => x.status !== 'SEEN')
  },
  SET_notseen(state, notisfy){
     state.not_seen = notisfy.filter(x => x.status !== 'SEEN')
  }
}
