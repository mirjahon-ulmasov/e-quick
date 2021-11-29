import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
console.log(localStorage.getItem('access'));
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect:  '/dealer/main',
    },
    // Dealer Layout
    {
      path: '',
      component: () => import('./layouts/dealer-page/Dealer.vue'),
      children: [
        {
          path: '/dealer/main',
          name: 'dealer-main',
          component: () => import('./views/Dealer/Home3.vue'),
          meta: {
            rule: 'dealer'
          }
        },
        {
          path: '/dealer/main2',
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
        },
        // =============================================================================
        // Pages Routes
        // =============================================================================
        {
          path: '/pages/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Profile', active: true }
            ],
            pageTitle: 'Profile',
            rule: 'editor'
          }
        },
        {
          path: '/pages/user-settings',
          name: 'page-user-settings',
          component: () => import('@/views/pages/user-settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'User Settings', active: true }
            ],
            pageTitle: 'Settings',
            rule: 'editor'
          }
        },
        {
          path: '/pages/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'FAQ', active: true }
            ],
            pageTitle: 'FAQ',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base',
          name: 'page-knowledge-base',
          component: () => import('@/views/pages/KnowledgeBase.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', active: true }
            ],
            pageTitle: 'KnowledgeBase',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category',
          name: 'page-knowledge-base-category',
          component: () => import('@/views/pages/KnowledgeBaseCategory.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/knowledge-base/category/question',
          name: 'page-knowledge-base-category-question',
          component: () => import('@/views/pages/KnowledgeBaseCategoryQuestion.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'KnowledgeBase', url: '/pages/knowledge-base' },
              { title: 'Category', url: '/pages/knowledge-base/category' },
              { title: 'Question', active: true }
            ],
            parent: 'page-knowledge-base',
            rule: 'editor'
          }
        },
        {
          path: '/pages/invoice',
          name: 'page-invoice',
          component: () => import('@/views/pages/Invoice.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Pages' },
              { title: 'Invoice', active: true }
            ],
            pageTitle: 'Invoice',
            rule: 'editor'
          }
        },
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
          path: '/login',
          name: 'login',
          component: () => import('@/views/Admins/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/v/forget-password',
          name: 'forget',
          component: () => import('@/views/Dealer/ForgetPass.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/v/login',
          name: 'v-login',
          component: () => import('@/views/Dealer/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/pages/error-404'
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
  const publicPages = ['/v/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('UserInfo')
  if (authRequired && !loggedIn) {
    !publicPages
    return next('/v/login')
  }
  next()
})

export default router
