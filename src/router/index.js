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
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            path: "/about",
            name: "About",
            component: () => import("../views/About.vue")
        },
        {
            path: "/get-involved/supporter",
            name: "involvedSupporter",
            component: () => import("../views/InvolvedSupporter.vue")
        },
        {
            path: "/get-involved/volunteer",
            name: "involvedVolunteer",
            component: () => import("../views/InvolvedVolunteer.vue")
        },
        {
            path: "/get-involved/friend",
            name: "involvedFriend",
            component: () => import("../views/InvolvedFriend.vue")
        },
        {
            path: "/podcasts",
            name: "WessexPodcasts",
            component: () => import("../views/Podcasts.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/admin/Register.vue")
        },
        {
            path: "/authorise",
            name: "authorise",
            component: () => import("../views/admin/Authorise.vue")
        },
        {
            path: "/sign-in",
            name: "sign-in",
            component: () => import("../views/admin/SignIn.vue")
        },
        {
            path: "/authorise",
            name: "authorise",
            component: () => import("../views/admin/Authorise.vue")
        },
        {
            path: "/policies",
            name: "policies",
            component: () => import("../views/admin/Policies.vue")
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("../views/Contact.vue")
        }
    ]
});

export default router;
