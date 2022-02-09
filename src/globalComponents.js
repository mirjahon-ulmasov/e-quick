import Vue from "vue";
import FeatherIcon from "./components/FeatherIcon.vue";
import NavBar from "./layouts/Navbar.vue";
import MyButton from "./components/Button.vue";
import MyInput from "./components/input.vue";
import Notification from "./components/Notification.vue";
import StepControls from './components/wizard/stepcontrols.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import StepNav from './components/wizard/stepnav.vue'
import Step from './components/wizard/step.vue'
import Tree from './components/tree'
// v-select component
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";


Vue.component(FeatherIcon.name, FeatherIcon);

Vue.component("nav-bar", NavBar);
Vue.component("my-input", MyInput);
Vue.component("my-button", MyButton);
Vue.component("v-select", vSelect);
Vue.component("v-notification", Notification);
Vue.component('step-navigation-step', Step);
Vue.component('step-navigation', StepNav);
Vue.component('step-controls', StepControls);
Vue.component("tree-item", Tree);
Vue.component("spinner", LoadingSpinner);
