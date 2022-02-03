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
      redirect: "/analytics",
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
            rule: "public",
            link: "analytics",
            title: "Аналитика",
          },
        },
        {
          path: "add-admin",
          name: "AddAdmin",
          component: () => import("./views/SuperAdmin/AdminCreate.vue"),
          meta: {
            rule: "super_admin",
            link: "add-admin",
            title: "Добавить админа",
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
          path: "setting",
          name: "SA_Settings",
          component: () => import("./views/SuperAdmin/SA_Settings.vue"),
          meta: {
            rule: "super_admin",
            title: "Настройки",
            id: `${localStorage.getItem("Id")}`,
            link: "",
          },
          children: [
            {
              path: "edit",
              name: "SA_Edit",
              component: () => import("./views/SuperAdmin/AdminEdit.vue"),
              meta: {
                rule: "super_admin",
                title: "Изменить данные",
                id: `${localStorage.getItem("Id")}`,
                link: "",
              },
              props: true,
            },
          ],
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
              component: () => import("./views/SuperAdmin/AdminEdit.vue"),
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
          path: "/add-user",
          name: "addusers",
          component: () => import("./views/Admins/AddUser.vue"),
          meta: {
            rule: "admin",
            link: "users",
            title: "Добавить пользователя",
          },
        },
        {
          path: "/user/:id",
          name: "usersdetails",
          component: () => import("./views/Admins/UserDetail.vue"),
          meta: {
            rule: "admin",
            link: "users",
            title: "Пользователи",
          },
          props: true,

          children: [
            {
              path: "editing",
              name: "UserEdit",
              component: () => import("./views/Admins/Edit.vue"),
              meta: {
                rule: "admin",
                link: "",
                title: "Изменить данные",
              },
              props: true,
            },
          ],
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
          path: "/company/:id",
          name: "companiesDetail",
          component: () => import("./views/Admins/CompanyDetail.vue"),
          meta: {
            rule: "admin",
            title: "Компании",
          },
          props: true,
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
          path: "/product/:id",
          name: "product",
          component: () => import("./views/Admins/ProductDetail.vue"),
          meta: {
            rule: "admin",
            title: "Товары",
          },
          props: true,
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
        {
          path: "editing",
          name: "AD_Edit",
          component: () => import("./views/Admins/Edit.vue"),
          meta: {
            rule: "admin",
            link: "",
            title: "Изменить данные",
            id: `${localStorage.getItem("Id")}`,
          },
          props: true,
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
          name: "ForgetPassword",
          // component: () => import("./views/Auth/ForgotPassword.vue"),
          component: () => import("./views/Dealer/ForgetPass.vue"),
          meta: {
            rule: "editor",
          },
        },
        {
          path: "/login",
          name: "Login",
          component: () => import("./views/Auth/Login.vue"),
          meta: {
            rule: "editor",
          },
        },
        {
          path: "/404",
          name: "PageNotFound",
          component: () => import("./views/Auth/PageNotFound.vue"),
          meta: {
            rule: "public",
          },
        },
      ],
    },
    {
      path: "/*",
      redirect: "/404",
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
