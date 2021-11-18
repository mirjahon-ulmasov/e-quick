import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
import admin from './admins/moduleDataList.js'
import dataList from './data-list/moduleDataList'
import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'
import sap from './ok/moduleDataList'
import category from './category/moduleDataList'
import product from './product/moduleDataList'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    sap: sap,
    addUser: admin,
    dataList: dataList,
    auth: moduleAuth,
    eCommerce: moduleECommerce,
    category: category,
    product: product
  },
  strict: process.env.NODE_ENV !== 'production'
})
