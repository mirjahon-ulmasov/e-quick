<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

        <!-- <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /> -->
        <profile-drop-down />
        <vs-spacer />

        <!-- <i18n />

        <search-bar />

        <cart-drop-down /> -->
        <select name="select" id="vs-select">
          <option value="1">Choose</option>
           <option   value="1">item</option>
            <option  value="1">item</option>
             <option  value="1">item</option>
        </select>
        <div class="not">
           <svg xmlns="http://www.w3.org/2000/svg" width="24px" style="color: white" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square h-6 w-6 stroke-current"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
       </div>
        <notification-drop-down class="mr-4" />
        <feather-icon icon="UserIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" />


      </vs-navbar>
    </div>
  </div>
</template>


<script>
import Bookmarks            from './components/Bookmarks.vue'
import I18n                 from './components/I18n.vue'
import SearchBar            from './components/SearchBar.vue'
import CartDropDown         from './components/CartDropDown.vue'
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown      from './components/ProfileDropDown.vue'

export default {
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: 'transparent'
    }
  },
  components: {
    Bookmarks,
    I18n,
    SearchBar,
    CartDropDown,
    NotificationDropDown,
    ProfileDropDown
  },
  computed: {
    navbarColorLocal () {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth () {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor () {
      return {'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj () {
      if      (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth)               return 'navbar-full'
    }
  },
  methods: {
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }
  }
}
</script>
<style scoped>
.not{
  display: flex;
  align-items: center;
  justify-content: center;
width: 40px;
height: 40px;
margin-left: 14px;
margin-right: 45px;
/* Pallet 4 / Accent */

background: #FF7F5C;
border-radius: 9px;
}
.stok{
  /* Rectangle 192 (Stroke) */

position: absolute;
width: 16px;
height: 13.84px;
left: 2px;
top: 8px;

background: #FFFFFF;
}
#vs-select{
width: 181px;
height: 40px;
border: none;
padding-left: 17px;
padding-right: 15px;
background: #FFFFFF;
border-radius: 9px;
}
option{
  padding: 10px;
  background: white;
}
</style>

