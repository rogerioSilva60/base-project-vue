import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'

Vue.use(Router)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}]

const router = new Router({
    mode:'history',
    routes
})

export default router