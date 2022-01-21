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
    //  Main layout Admins
    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/attechments',
          name: 'attechments',
          component: () => import('./views/Admins/Attechments.vue'),
          meta: {
            rule: 'super_admin'
          }
        },
        {
          path: '/table',
          name: 'table',
          component: () => import('./views/Admins/Table.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/table-2',
          name: 'table2',
          component: () => import('./views/Admins/Table2.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/company',
          name: 'company',
          component: () => import('./views/Admins/Company.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('./views/Admins/User.vue'),
          meta: {
            rule: 'admin'
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
    !publicPages
    return next('/login')
  }
  next()
})

export default router
