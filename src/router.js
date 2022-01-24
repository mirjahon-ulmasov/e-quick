import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      redirect: "/dealer/main",
    },
    // Dealer Layout
    {
      path: "/dealer/",
      component: () => import("./layouts/dealer-page/Dealer.vue"),
      children: [
        {
          path: "main",
          name: "Home",
          component: () => import("./views/Dealer/Home.vue"),
          meta: {
            rule: "dealer",
          },
        },
        {
          path: "templates",
          name: "Templates",
          component: () => import("./views/Dealer/Templates.vue"),
          meta: {
            rule: "dealer",
          },
        },
        {
          path: "journal",
          name: "Journal",
          component: () => import("./views/Dealer/Journal.vue"),
          meta: {
            rule: "dealer",
          },
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("./views/Dealer/Settings.vue"),
          meta: {
            rule: "dealer",
          },
        },
      ],
    },
    //  Main layout Admins
    {
      path: "",
      component: () => import("./layouts/MainLayout.vue"),
      children: [
        {
          path: "analytics",
          name: "Analytics",
          component: () => import("./views/SuperAdmin/Analytics.vue"),
          meta: {
            rule: "super_admin",
          },
        },
        {
          path: "add-admin",
          name: "AddAdmin",
          component: () => import("./views/SuperAdmin/AddAdmin.vue"),
          meta: {
            rule: "super_admin",
          },
        },
        {
          path: "admin-list",
          name: "AdminList",
          component: () => import("./views/SuperAdmin/AdminList.vue"),
          meta: {
            rule: "super_admin",
          },
        },
        {
          path: "user",
          name: "user",
          component: () => import("./views/Admins/User.vue"),
          meta: {
            rule: "admin",
          },
        },
      ],
    },

    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/v/login",
          name: "login",
          component: () => import("@/views/Admins/Login.vue"),
          meta: {
            rule: "editor",
          },
        },
        {
          path: "/forget-password",
          name: "forget",
          component: () => import("@/views/Dealer/ForgetPass.vue"),
          meta: {
            rule: "editor",
          },
        },
        {
          path: "/login",
          name: "v-login",
          component: () => import("@/views/Dealer/Login.vue"),
          meta: {
            rule: "editor",
          },
        },
      ],
    },
    {
      path: "*",
      redirect: "/dealer/main",
    },
  ],
});
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/forget-password"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("access");
  if (authRequired && !loggedIn) {
    // eslint-disable-next-line no-unused-expressions
    !publicPages;
    return next("/login");
  }
  next();
});

export default router;
