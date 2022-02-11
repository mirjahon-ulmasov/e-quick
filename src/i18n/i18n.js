import Vue from "vue";
import VueI18n from "vue-i18n";
import store from "../store/store";
import i18nData from "./i18nData";
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "ru", // set default locale
  messages: i18nData,
});
export default i18n;
