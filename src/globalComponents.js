import Vue from 'vue'
import FeatherIcon  from './components/FeatherIcon.vue'
import NavBar from './layouts/Navbar.vue'
import Table from './components/Table.vue'
import MyButton from './components/Button.vue'
import MyInput from './components/input.vue'

Vue.component(FeatherIcon.name, FeatherIcon)


// v-select component
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'XIcon',
        svgClasses: 'w-4 h-4 mt-1'
      }
    })
  },
  OpenIndicator: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'ChevronDownIcon',
        svgClasses: 'w-5 h-5'
      }
    })
  },
})
Vue.component('nav-bar', NavBar)
Vue.component('mtable', Table)
Vue.component('my-input', MyInput )
Vue.component('my-button', MyButton)
Vue.component( vSelect)
