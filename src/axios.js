import axios from 'axios'
const baseURL = process.env.VUE_APP_BASE
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`
const instance =  axios.create({
  baseURL
})

instance.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('access')
      router.push('/login')
    }
    return Promise.reject(error)
  })
  export default instance

