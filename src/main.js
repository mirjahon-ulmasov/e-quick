import Vue from "vue";
import App from "./App.vue";

import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; // Vuesax
Vue.use(Vuesax);
// axios
import axios from "./axios.js";
Vue.prototype.$http = axios;
// ACL
import acl from "./acl/acl";
// Globally Registered Components
import "./globalComponents.js";
// Vue Router
import router from "./router";
// Vuex Store
import store from "./store/store";
// i18n
import i18n from "./i18n/i18n";

// styles
import "./assets/css/main.css";
import "./assets/css/iconfont.css";
import "./assets/css/font/stylesheet.css";

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: (h) => h(App),
}).$mount("#app");
