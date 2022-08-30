import Vue from "vue";
import VueRouter from "vue-router";
import storage from "@/service/storage";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // ======================
    // Blank Layout
    // ======================
    {
      path: "",
      component: () => import("../layout/Blank/Blank"),
      children: [
        {
          path: "/",
          redirect: "/dashboard",
        },
        {
          path: "/login",
          name: "login",
          index: 1,
          component: () => import("../views/Authentication/Login"),
        },
      ],
    },
    {
      // ======================
      // Layout
      // ======================
      path: "",
      component: () => import("../layout/Full/MainContainer"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard/Dashboard"),
        },
        {
          path: "/announcement",
          name: "announcement",
          component: () => import("../views/Announcement/Index"),
        },
        {
          path: "/user-information",
          name: "user-information",
          component: () => import("../views/Userinformation/Index"),
        },
        {
          path: "/provider-gamelist",
          name: "provider-gamelist",
          component: () => import("../views/Provider_GameList/Index"),
        },
        {
          path: "/promotion-list",
          name: "promotion-list",
          component: () => import("../views/PromotionList/Index"),
        },
        {
          path: "/sort-management",
          name: "sort-management",
          component: () => import("../views/Sortmanagement/Index"),
        },
        {
          path: "/note",
          name: "note",
          component: () => import("../views/note/Index"),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = storage.checkToken();
  if (isAuthenticated) {
    store.dispatch("fetchAccessToken");
    store.dispatch("fetchUserData");
  }
  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});
export default router;
