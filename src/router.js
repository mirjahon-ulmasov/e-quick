import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect:  '/dealer/main'
    },
     //  Main layout
     {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/user',
          name: 'user',
          component: () => import('./views/Admins/User.vue'),
          meta: {
            rule: 'admin'
          }
        },
      ]
    },

    // Dealer Layout
    {
      path: '/dealer/',
      component: () => import('./layouts/dealer-page/Dealer.vue'),
      children: [
        {
          path: 'main',
          name: 'dealer-main',
          component: () => import('./views/Dealer/Home.vue'),
          meta: {
            rule: 'dealer'
          }
        },
        {
          path: '/dealer/templates',
          name: 'Main',
          component: () => import('./views/Dealer/Templates.vue'),
          meta: {
            rule: 'dealer'
          }
        },
        {
          path: '/dealer/journal',
          name: 'Main',
          component: () => import('./views/Dealer/Journal.vue'),
          meta: {
            rule: 'dealer'
          }
        },
        {
          path: '/dealer/settings',
          name: 'Main',
          component: () => import('./views/Dealer/Settings.vue'),
          meta: {
            rule: 'dealer'
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/v/login',
          name: 'login',
          component: () => import('@/views/Admins/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/forget-password',
          name: 'forget',
          component: () => import('@/views/Dealer/ForgetPass.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/login',
          name: 'v-login',
          component: () => import('@/views/Dealer/Login.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/dealer/main'
    }
  ]
})
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/forget-password']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('access')
  if (authRequired && !loggedIn) {
    // eslint-disable-next-line no-unused-expressions
    !publicPages
    return next('/login')
  }
  next()
})

export default router
