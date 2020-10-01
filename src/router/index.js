import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@v/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/logs",
    name: "Logs",
    component: () => import(/* webpackChunkName: "about" */ "@v/Logs.vue")
  },
  {
    path: "/history",
    name: "History",
    component: () => import(/* webpackChunkName: "about" */ "@v/History.vue")
  },
  {
    path: "/diary",
    name: "Diary",
    component: () => import(/* webpackChunkName: "about" */ "@v/LogsDiary.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
