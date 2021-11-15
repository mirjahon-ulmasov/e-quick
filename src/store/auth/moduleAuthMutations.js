import axios from '../../http/axios/index.js'

export default {
  SET_BEARER (state, access) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
  }
  // Set_User() {

  // }
}
