import Vue from "vue";
import App from "./App.vue";

import axios from "./axios.js";
Vue.prototype.$http = axios;
import acl from "./acl/acl";
import "./globalComponents.js";
import router from "./router";
import store from "./store/store";
import i18n from "./i18n/i18n";
import VeeValidate from "vee-validate";
import "./validator.js";

import "vuesax/dist/vuesax.css"; // Vuesax
import Vuesax from "vuesax";
Vue.use(Vuesax);

// styles
import "./assets/css/main.css";
import "./assets/scss/main.scss";

// VeeValidate
Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: (h) => h(App),
}).$mount("#app");
