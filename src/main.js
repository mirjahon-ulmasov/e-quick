import Vue from 'vue'
import App from './App.vue'

import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)
// axios
import axios from './axios.js'
Vue.prototype.$http = axios

// API Calls
import './http/requests'

// mock
import './fake-db/index.js'

// Theme Configurations
import '../themeConfig.js'

// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'

// Vuexy Admin Filters
import './filters/filters'


// VeeValidate
import VeeValidate  from 'vee-validate'
Vue.use(VeeValidate)


// Feather font icon
require('./assets/css/iconfont.css')

require('./assets/css/font/stylesheet.css')
// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount('#app')
