const actions = {
  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo ({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateUserRole ({ dispatch }, payload) {
    // Change client side
    payload.aclChangeRole(payload)
    dispatch('updateUserInfo', {userRole: payload})
  }
}

export default actions
