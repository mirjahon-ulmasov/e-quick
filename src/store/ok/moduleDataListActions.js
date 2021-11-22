// import axios from '@/axios.js'
import axios from 'axios'
export default {
  fetchDataListSap ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('http://yolproject.herokuapp.com/api/road/getroads')
        .then((response) => {
          commit('SET_SAP', response.data)
        console.log(response);
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.delete(`http://yolproject.herokuapp.com/api/road/deleteroad/${id}/`)
        .then((response) => {
          // commit('REMOVE_RECORD', userId)
          console.log(response)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
