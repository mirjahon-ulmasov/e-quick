import axios from '../../axios'

export default {
  SET_BEARER (state, access, usertype) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
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
