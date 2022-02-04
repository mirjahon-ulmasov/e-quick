import Vue from "vue";
import FeatherIcon from "./components/FeatherIcon.vue";
import NavBar from "./layouts/Navbar.vue";
import Table from "./components/Table.vue";
import MyButton from "./components/Button.vue";
import MyInput from "./components/input.vue";
import Notification from "./components/Notification.vue";
import StepControls from './components/wizard/stepcontrols.vue'
import StepNav from './components/wizard/stepnav.vue'
import Step from './components/wizard/step.vue'
import Sidebar from './components/sidebar.vue'
import Tree from './components/tree'
// v-select component
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: (createElement) =>
      createElement("feather-icon", {
        props: {
          icon: "XIcon",
          svgClasses: "w-4 h-4 mt-1",
        },
      }),
  },
  OpenIndicator: {
    render: (createElement) =>
      createElement("feather-icon", {
        props: {
          icon: "ChevronDownIcon",
          svgClasses: "w-5 h-5",
        },
      }),
  },
});

Vue.component(FeatherIcon.name, FeatherIcon);

Vue.component("nav-bar", NavBar);
Vue.component("mtable", Table);
Vue.component("my-input", MyInput);
Vue.component("my-button", MyButton);
Vue.component("v-select", vSelect);
Vue.component("v-notification", Notification);
Vue.component('step-navigation-step', Step);
Vue.component('step-navigation', StepNav);
Vue.component('step-controls', StepControls);
Vue.component('sidebar', Sidebar);
Vue.component("tree-item", Tree);
