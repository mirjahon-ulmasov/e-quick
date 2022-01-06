import axios from '../../http/axios/index.js'

export default {
  SET_BEARER (state, access) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    // Set token globally
    localStorage.setItem('access', access)
  },
  SetInfo (state, info) {
    state.info = info
  },
  UpdateInfo (state, info) {
    state.info.email = info.email
    state.info.full_name = info.full_name
    state.info.phone_number = info.phone_number
  },
  UpdateIMG(state, info){
   state.info.profile_picture = info
  }
}
