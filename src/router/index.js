import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import store from "@/store";
const checkLayout = () => {
  let page = {
    view: null,
    layout: "",
  };
  if (window.innerWidth >= 700) {
    // page.view = MainDeskView;
    page.layout = "desktop";
  } else {
    // page.view = MainMobView;
    page.layout = "mobile";
  }
  return page;
};

window.addEventListener("resize", checkLayout);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/LogIn/LogIn.vue"),
    // component: LoginView,
    meta: {
      layout: "auth",
      auth: false,
      role: "student",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/pages/SignUp/SignUp.vue"),
    meta: {
      layout: "auth",
      auth: false,
      role: "student",
    },
  },
  {
    path: "/main",
    name: "student-main",
    // component: checkLayout().view,
    component: () => import("../pages/MainBlog/MainBlog.vue"),
    meta: {
      layout: checkLayout().layout,
      auth: true,
      role: "student",
    },
  },

  {
    path: "/student-profile/:id",
    name: "student-profile-main",
    // component: checkLayout().view,
    component: () => import("../pages/FriendsSpace/FriendsSpace.vue"),
    meta: {
      layout: checkLayout().layout,
      auth: true,
      role: "student",
    },
  },

  {
    path: "/coins-history",
    name: "coins-history",
    component: () => import("../modules/CoinsHistory/CoinsHistory.vue"),
    meta: {
      layout: checkLayout().layout,
      auth: false,
      role: "student",
    },
  },
  {
    path: "/mars-games-typing",
    name: "mars-typing",
    component: () => import("../modules/Games/MarsTyping.vue"),
    meta: {
      layout: "desktop",
      auth: true,
      role: "student",
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
    meta: {
      layout: "auth",
      auth: false,
      role: "student",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active",
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.meta.auth;
  const userRole = localStorage.getItem("roleInSpace");

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access_token")}`;

  if (
    requiredAuth &&
    store.getters["auth/isAuth"] &&
    userRole === to.meta.role
  ) {
    next();
  } else if (
    requiredAuth &&
    store.getters["auth/isAuth"] &&
    userRole &&
    userRole !== to.meta.role
  ) {
    next({ name: `${userRole}-main` });
  } else if (requiredAuth && !store.getters["auth/isAuth"]) {
    next("/");
  } else if (store.getters["auth/isAuth"] && to.name === "signup") {
    next({ name: `${userRole}-main` });
  } else {
    next();
  }
});

export default router;
