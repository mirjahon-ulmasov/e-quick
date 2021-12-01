import axios from '../../http/axios/index.js'

export default {
  SET_BEARER (state, access) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    // Set token globally
    localStorage.setItem('access', access )
  }
}
