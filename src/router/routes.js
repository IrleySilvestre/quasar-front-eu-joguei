const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "list-users",
        name: "user",
        component: () => import("src/pages/users/UserPage.vue"),
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
