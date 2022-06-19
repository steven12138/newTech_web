import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import store from "@/store"
import StudentView from "@/views/StudentView";
import DashBoardView from "@/views/DashBoardView";
import ErrorPoint from "@/views/ErrorPoint";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/student',
        name: 'Student',
        component: StudentView
    },
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoardView
    },
    {
        path: "/error",
        name: "Error",
        component: ErrorPoint
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    routes
})

let excludePath = ["Home", "Error"];
let adminPath = ["DashBoard"];
let studentPath = [];

router.beforeEach(async (to, from, next) => {
    // console.log(from.path, "->", to.path);
    if (to.name == null) {
        // console.log("not Found");
        next({
            name: "Error", params: {
                code: 404,
            }
        });
        return;
    }
    if (excludePath.includes(to.name)) {
        // console.log("exclude");
        next();
        return;
    }
    if (!await store.getters.isLogin) {
        // console.log("not login");
        next({
            name: "Error", params: {
                code: 401,
            }
        });
        return;
    }
    // console.log(store.getters.role);
    if (adminPath.includes(to.name) && store.getters.role !== "admin") {
        // console.log("need admin");
        next({
            name: "Error", params: {
                code: 403,
            }
        })
        return;
    }
    // console.log("passed");
    next();
})

export default router
