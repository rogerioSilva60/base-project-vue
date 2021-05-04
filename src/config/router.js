import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import Auth from '@/components/auth/Auth'

Vue.use(Router)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new Router({
    mode:'history',
    routes
})

export default router