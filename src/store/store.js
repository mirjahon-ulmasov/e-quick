import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
import dataList from './data-list/moduleDataList'
import moduleAuth from './auth/moduleAuth.js'
import category from './category/moduleDataList'
import product from './product/moduleDataList'
import addUser from './admins/moduleDataList'
export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    addUser,
    dataList,
    auth: moduleAuth,
    category,
    product
  },
  strict: process.env.NODE_ENV !== 'production'
})
