// axios
import axios from 'axios'

const baseURL = ' https://e-quick.uz:8990'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
export default axios.create({
  baseURL
})
