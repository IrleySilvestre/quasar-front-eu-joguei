const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [
      {
        path: "/signin",
        name: "signin",
        component: () => import("pages/login/LoginPage.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("src/pages/login/RegisterPage.vue"),
      },
      {
        path: "/forgot-password",
        name: "forgotPassword",
        component: () => import("src/pages/login/ForgotPasswordPage.vue"),
      },
    ],
  },

  {
    path: "/home",
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dash-board",
        name: "dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "add-user/",
        name: "userAdd",
        component: () => import("src/pages/users/UserAdd.vue"),
      },
      {
        path: "edit-user/:id",
        name: "userEdit",
        component: () => import("src/pages/users/UserAdd.vue"),
      },
      {
        path: "edmin-page/:tabActive?",
        name: "admPage",
        component: () => import("src/pages/admin/AdmPage.vue"),
      },
      {
        path: "role-add",
        name: "roleAdd",
        component: () => import("src/pages/roles/RoleAdd.vue"),
      },
      {
        path: "role-detail/:id",
        name: "roleDetail",
        component: () => import("src/pages/roles/RoleDetail.vue"),
      },
      {
        path: "role-edit/:id",
        name: "roleEdit",
        component: () => import("src/pages/roles/RoleAdd.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
