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
      redirect: "/login",
    },
    // Dealer Layout
    // {
    //   path: "/dealer/",
    //   component: () => import("./layouts/dealer-page/Dealer.vue"),
    //   children: [
    //     {
    //       path: "main",
    //       name: "Home",
    //       component: () => import("./views/Dealer/Home.vue"),
    //       meta: {
    //         rule: "dealer",
    //       },
    //     },
    //     {
    //       path: "templates",
    //       name: "Templates",
    //       component: () => import("./views/Dealer/Templates.vue"),
    //       meta: {
    //         rule: "dealer",
    //       },
    //     },
    //     {
    //       path: "journal",
    //       name: "Journal",
    //       component: () => import("./views/Dealer/Journal.vue"),
    //       meta: {
    //         rule: "dealer",
    //       },
    //     },
    //     {
    //       path: "settings",
    //       name: "Settings",
    //       component: () => import("./views/Dealer/Settings.vue"),
    //       meta: {
    //         rule: "dealer",
    //       },
    //     },
    //   ],
    // },
    //  Main layout Admins
    {
      path: "",
      component: () => import("./layouts/MainLayout.vue"),
      children: [
        // =============================================================================
        // SUPER ADMIN
        // =============================================================================
        {
          path: "analytics",
          name: "Analytics",
          component: () => import("./views/SuperAdmin/Analytics.vue"),
          meta: {
            rule: "super_admin",
            link: "analytics",
            title: "Аналитика",
          },
        },
        {
          path: "add-admin",
          name: "AddAdmin",
          component: () => import("./views/SuperAdmin/AdminForm.vue"),
          meta: {
            rule: "super_admin",
            link: "add-admin",
            title: "Добавить админ",
          },
        },
        {
          path: "admins",
          name: "AdminList",
          component: () => import("./views/SuperAdmin/AdminList.vue"),
          meta: {
            rule: "super_admin",
            link: "admin-list",
            title: "Список админов",
          },
        },
        {
          path: "/setting",
          name: "SuperAdminSettings",
          component: () => import("./views/Admins/Settings.vue"),
          meta: {
            rule: "super_admin",
            link: "",
            title: "Настройки",
          },
        },
        {
          path: "admins/:id",
          name: "Admin",
          component: () => import("./views/SuperAdmin/AdminDetail.vue"),
          meta: {
            rule: "super_admin",
            link: "admin-list",
            title: "Информация о пользователе",
          },
          props: true,

          children: [
            {
              path: "edit",
              name: "AdminEdit",
              component: () => import("./views/SuperAdmin/AdminForm.vue"),
              meta: {
                rule: "super_admin",
                link: "admin-list",
                title: "Изменить данные",
              },
              props: true,
            },
          ],
        },

        // =============================================================================
        // ADMIN
        // =============================================================================
        {
          path: "analytic",
          name: "Analytic",
          component: () => import("./views/SuperAdmin/Analytics.vue"),
          meta: {
            rule: "admin",
            link: "analytic",
            title: "Аналитика",
          },
        },
        {
          path: "/users",
          name: "users",
          component: () => import("./views/Admins/User.vue"),
          meta: {
            rule: "admin",
            link: "users",
            title: "Пользователи",
          },
        },
        {
          path: "/companies",
          name: "companies",
          component: () => import("./views/Admins/Company.vue"),
          meta: {
            rule: "admin",
            link: "companies",
            title: "Компании",
          },
        },
        {
          path: "/products",
          name: "products",
          component: () => import("./views/Admins/Products.vue"),
          meta: {
            rule: "admin",
            link: "products",
            title: "Товары",
          },
        },
        {
          path: "/categories",
          name: "categories",
          component: () => import("./views/Admins/Categories.vue"),
          meta: {
            rule: "admin",
            link: "categories",
            title: "Категории",
          },
        },
        {
          path: "/settings",
          name: "settings",
          component: () => import("./views/Admins/Settings.vue"),
          meta: {
            rule: "admin",
            link: "settings",
            title: "Настройки",
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
