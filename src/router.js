import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";
import i18n from "./i18n/i18n";
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
      path: "",
      redirect: () => {
        const role = store.state.auth.info;
        if (role === "super_admin" || role === "admin") {
          return "/analytics";
        } else if (role === "dealer") {
          return "/dealer/analytics";
        }
      },
    },
    // Dealer Layout
    {
      path: "/dealer",
      component: () => import("./layouts/dealer/Layuot.vue"),
      meta: {
        rule: "dealer",
      },
      children: [
        {
          path: "analytics",
          name: "DealerAnalytics",
          component: () => import("./views/Dealer/Analytics.vue"),
          meta: {
            rule: "dealer",
            link: "analytics",
            title: {
              ru: "Аналитика",
              uz: "Analitika",
            },
          },
        },
        {
          path: "create-order",
          name: "CreateOrder",
          component: () => import("./views/Dealer/CreateOrder.vue"),
          meta: {
            rule: "dealer",
            link: "create-order",
            title: {
              ru: "Создать заказ",
              uz: "Buyurtma berish",
            },
          },
        },
        {
          path: "journal",
          name: "Journal",
          component: () => import("./views/Dealer/Journal.vue"),
          meta: {
            rule: "dealer",
            link: "journal",
            title: {
              ru: "Журнал",
              uz: "Jurnal",
            },
          },
        },
        {
          path: "templates",
          name: "Templates",
          component: () => import("./views/Dealer/Templates.vue"),
          meta: {
            rule: "dealer",
            link: "templates",
            title: {
              ru: "Шаблоны",
              uz: "Namunalar",
            },
          },
        },
        {
          path: "feedback",
          name: "Feedback",
          component: () => import("./views/Dealer/Feedback.vue"),
          meta: {
            rule: "dealer",
            link: "feedback",
            title: {
              ru: "Обратная связь",
              uz: "Qayta aloqa",
            },
          },
        },
        {
          path: "whs",
          name: "WHS",
          component: () => import("./views/Dealer/WHS.vue"),
          meta: {
            rule: "dealer",
            link: "whs",
            title: {
              ru: "WHS остатки",
              uz: "WHS qoldiqlari",
            },
          },
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("./views/Dealer/Profile.vue"),
          meta: {
            rule: "dealer",
            link: "",
            title: {
              ru: "Профиль",
              uz: "Profil",
            },
          },
          children: [
            {
              path: "edit",
              name: "DealerEdit",
              component: () => import("./views/Dealer/DealerEdit.vue"),
              meta: {
                rule: "dealer",
                link: "",
                title: {
                  ru: "Изменить данные",
                  uz: "Ma'lumotlarni o'zgartirish",
                },
              },
            },
          ],
        },
      ],
    },
    //  Main layout Admins
    {
      path: "",
      component: () => import("./layouts/admin/Layout.vue"),
      meta: {
        rule: "admin_or_super",
      },
      children: [
        // =============================================================================
        // SUPER ADMIN
        // =============================================================================
        {
          path: "analytics",
          name: "Analytics",
          component: () => import("./views/SuperAdmin/Analytics.vue"),
          meta: {
            rule: "admin_or_super",
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
          path: "/login",
          name: "Login",
          component: () => import("./views/Auth/Login.vue"),
          meta: {
            rule: "editor",
          },
        },
        {
          path: "/forgot-password",
          name: "ForgotPassword",
          component: () => import("./views/Auth/ForgotPassword.vue"),
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
  const publicPages = ["/login", "/forgot-password"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("access");
  if (authRequired && !loggedIn) {
    !publicPages;
    return next("/login");
  }
  next();
});

export default router;
