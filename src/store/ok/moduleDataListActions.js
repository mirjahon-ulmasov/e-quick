import axios from '@/axios.js'

export default {
  fetchDataListSap ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/sap/sap/')
        .then((response) => {
          commit('SET_SAP', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
