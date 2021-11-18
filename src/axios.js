// axios
import axios from 'axios'

const baseURL = 'http://10.7.5.109:8100'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
export default axios.create({
  baseURL
})
