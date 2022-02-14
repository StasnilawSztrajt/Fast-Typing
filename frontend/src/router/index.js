import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Visit from '../views/Visit.vue'
import FAQ from '../views/FAQ.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import TopUsers from '../views/TopUsers.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Visit',
        name: 'Visit',
        component: Visit
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: FAQ
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/top-users',
        name: 'TopUsers',
        component: TopUsers,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active"
})

export default router