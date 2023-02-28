import Vue from "vue";
import VueRouter from "vue-router";
import storage from "@/service/storage";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/coffee",
      name: "Coffee",
      component: () => import("../views/Coffee/Index"),
    },
    // ======================
    // Blank Layout
    // ======================
    {
      path: "",
      component: () => import("../layout/Blank/Blank"),
      children: [
        {
          path: "/",
          redirect: "/coffee",
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
      path: "admin",
      component: () => import("../layout/Full/MainContainer"),
      children: [
        {
          path: "/admin",
          name: "dashboard",
          component: () => import("../views/Dashboard/Dashboard"),
        },
        {
          path: "/admin/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard/Dashboard"),
        },

        {
          path: "/admin/user-information",
          name: "user-information",
          component: () => import("../views/Userinformation/Index"),
        },
        {
          path: "/admin/bill-order",
          name: "bill-order",
          component: () => import("../views/BillOrder/Index"),
        },
        {
          path: "/admin/beverages-list",
          name: "beverages-list",
          component: () => import("../views/BeveragesList/Index"),
        },
        {
          path: "/admin/category",
          name: "category",
          component: () => import("../views/Category/Index"),
        },
        {
          path: "/admin/management",
          name: "management",
          component: () => import("../views/Management/Index"),
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
    if (to.name !== "Coffee") {
      store.dispatch("fetchAccessToken");
      store.dispatch("fetchUserData");
    }
  }
  if (to.name !== "Coffee") {
    if (to.name !== "login" && !isAuthenticated) {
      next({ name: "login" });
    } else if (to.name === "login" && isAuthenticated) {
      next({ name: "dashboard" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
