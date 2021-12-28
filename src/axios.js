import axios from 'axios'
const baseURL = process.env.VUE_APP_BASE
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
export default axios.create({
  baseURL
})

