import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/features",
      name: "WessexFeatures",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/WessexFeatures.vue")
    },
    {
      path: "/podcasts",
      name: "WessexPodcasts",
      component: () => import("../views/Podcasts.vue")
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue")
    },
    {
      path: "/authorise",
      name: "authorise",
      component: () => import("../views/Authorise.vue")
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignIn.vue")
    },
    {
      path: "/authorise",
      name: "authorise",
      component: () => import("../views/Authorise.vue")
    },
    {
      path: "/policies",
      name: "policies",
      component: () => import("../views/Policies.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/Contact.vue")
    }
  ]
});

export default router;
