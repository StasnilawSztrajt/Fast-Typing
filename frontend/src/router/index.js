import {createRouter, createWebHistory} from 'vue-router'
import writeTestApp from '../views/writeTestApp.vue'
import visit from '../views/visit.vue'
import FAQ from '../views/FAQ.vue'

const routes = [
    {
        path: '/',
        name: 'writeTestApp',
        component: writeTestApp
    },
    {
        path: '/visit',
        name: 'visit',
        component: visit
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: FAQ
    },
    // {
    //     path: '/api/users/login',
    //     name: 'login',
    //     component: Login
    // },
    // {
    //     path: '/api/users/register',
    //     name: 'register',
    //     component: Register,
        // beforeEnter: checkNotAuthenticated
    // },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active"
})

export default router