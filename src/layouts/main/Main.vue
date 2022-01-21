<template>
  <div class="layout--main" :class="[layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]">
    <v-nav-menu
      :navMenuItems = "navMenuItems"
      title         = "Vuexy"
      parent        = ".layout--main" />

    <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <div id="content-overlay" />

    <template>
      <the-navbar-vertical
        :navbarColor="navbarColor"/>
    </template>
    <!-- /Navbar -->
      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <div class="content-area__content">
              <transition :name="routerTransition" mode="out-in">
                <router-view @changeRouteTitle="changeRouteTitle" @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>


<script>
import BackToTop           from 'vue-backtotop'
import navMenuItems        from '@/layouts/components/vertical-nav-menu/navMenuItems.js'
import TheNavbarVertical   from '@/layouts/components/navbar/TheNavbarVertical.vue'
import themeConfig         from '@/../themeConfig.js'
import VNavMenu            from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue'


export default {
  components: {
    BackToTop,
    TheNavbarVertical,
    VNavMenu
  },
  data () {
    return {
      disableCustomizer : themeConfig.disableCustomizer,
      disableThemeTour  : themeConfig.disableThemeTour,
      dynamicWatchers   : {},
      footerType        : themeConfig.footerType  || 'static',
      hideScrollToTop   : themeConfig.hideScrollToTop,
      isNavbarDark      : false,
      navbarColor       : themeConfig.navbarColor || '#fff',
      navbarType        : themeConfig.navbarType  || 'floating',
      navMenuItems,
      routerTransition  : themeConfig.routerTransition || 'none',
      routeTitle        : this.$route.meta.pageTitle,
    }
  },
  watch: {
    '$route' () {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark (val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
      this.updateNavbarColor(color)
    },
    '$store.state.mainLayoutType' (val) {
      this.setNavMenuVisibility(val)
      this.disableThemeTour = true
    }
  },
  computed: {
    bodyOverlay () { return this.$store.state.bodyOverlay },
    contentAreaClass () {
      if (this.mainLayoutType === 'vertical') {
        if      (this.verticalNavMenuWidth === 'default') return 'content-area-reduced'
        else if (this.verticalNavMenuWidth === 'reduced') return 'content-area-lg'
        else return 'content-area-full'
      } else return 'content-area-full'
    },
    footerClasses () {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      }
    },
    isAppPage () {
      return this.$route.meta.no_scroll
    },
    isThemeDark ()     { return this.$store.state.theme === 'dark' },
    layoutTypeClass () { return `main-${this.mainLayoutType}`      },
    mainLayoutType ()  { return this.$store.state.mainLayoutType   },
    navbarClasses ()   {
      return {
        'navbar-hidden'   : this.navbarType === 'hidden',
        'navbar-sticky'   : this.navbarType === 'sticky',
        'navbar-static'   : this.navbarType === 'static',
        'navbar-floating' : this.navbarType === 'floating'
      }
    },
    verticalNavMenuWidth () { return this.$store.state.verticalNavMenuWidth },
    windowWidth ()          { return this.$store.state.windowWidth }
  },
  methods: {
    changeRouteTitle (title) {
      this.routeTitle = title
    },
    updateNavbar (val) {
      if (val === 'static') this.updateNavbarColor(this.isThemeDark ? '#10163a' : '#fff')
      this.navbarType = val
    },
    updateNavbarColor (val) {
      this.navbarColor = val
      if (val === '#fff') this.isNavbarDark = false
      else this.isNavbarDark = true
    },
    updateFooter (val) {
      this.footerType = val
    },
    updateRouterTransition (val) {
      this.routerTransition = val
    },
    setNavMenuVisibility (layoutType) {
      if ((layoutType === 'horizontal' && this.windowWidth >= 1200) || (layoutType === 'vertical' && this.windowWidth < 1200)) {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
        this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')
      } else {
        this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
      }
    },
    toggleHideScrollToTop (val) {
      this.hideScrollToTop = val
    }
  },
  created () {
    const color = this.navbarColor === '#fff' && this.isThemeDark ? '#10163a' : this.navbarColor
    this.updateNavbarColor(color)
    this.setNavMenuVisibility(this.$store.state.mainLayoutType)

    // Dynamic Watchers for tour
    // Reason: Once tour is disabled it is not required to enable it.
    // So, watcher is required for just disabling it.
    this.dynamicWatchers.windowWidth = this.$watch('$store.state.windowWidth', (val) => {
      if (val < 1200) {
        this.disableThemeTour = true
        this.dynamicWatchers.windowWidth()
      }
    })

    this.dynamicWatchers.verticalNavMenuWidth = this.$watch('$store.state.verticalNavMenuWidth', () => {
      this.disableThemeTour = true
      this.dynamicWatchers.verticalNavMenuWidth()
    })

    this.dynamicWatchers.rtl = this.$watch('$vs.rtl', () => {
      this.disableThemeTour = true
      this.dynamicWatchers.rtl()
    })
  },
  beforeDestroy () {
    Object.keys(this.dynamicWatchers).map(i => {
      this.dynamicWatchers[i]()
      delete this.dynamicWatchers[i]
    })
  }
}

</script>
<style scoped>
.layout--main{
    background-image: url('~@/assets/images/pages/bg1.svg') !important;
    background-color: #fff !important;
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: top;
}
</style>

