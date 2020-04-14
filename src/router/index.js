import Vue from 'vue'
import AuthGuard from '../router/AuthGuard'
import AdminGuard from '../router/AdminGuard'
import Router from 'vue-router'
import Entrance from '../components/Entrance'
import Admin from '../components/Admin'
import Check from '../components/Check'
import Home from '../components/Home'
import Transit from '../components/Transit'
import Nearby from '../components/Nearby'
import Route from '../components/Route'
import Info from '../components/Info'
import Store from '../components/Store'
import Air from '../components/Air'
import Land from '../components/Land'
import Water from '../components/Water'
import Wallet from '../components/Wallet'
import History from '../components/History'
import Lines from '../components/Lines'
import Stations from '../components/Stations'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Check',
            component: Check
        },
        {
            path: '/entrance',
            name: 'Entrance',
            component: Entrance
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            beforeEnter: AuthGuard
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            beforeEnter: AdminGuard
        },
        {
            path: '/transit',
            name: 'Transit',
            component: Transit,
            beforeEnter: AuthGuard
        },
        {
            path: '/nearby',
            name: 'Nearby',
            component: Nearby,
            beforeEnter: AuthGuard
        },
        {
            path: '/route',
            name: 'Route',
            component: Route,
            beforeEnter: AuthGuard
        },
        {
            path: '/info',
            name: 'Info',
            component: Info,
            beforeEnter: AuthGuard
        },
        {
            path: '/store',
            name: 'Store',
            component: Store,
            beforeEnter: AuthGuard
        },
        {
            path: '/air',
            name: 'Air',
            component: Air,
            beforeEnter: AuthGuard
        },
        {
            path: '/land',
            name: 'Land',
            component: Land,
            beforeEnter: AuthGuard
        },
        {
            path: '/water',
            name: 'Water',
            component: Water,
            beforeEnter: AuthGuard
        },
        {
            path: '/wallet',
            name: 'Wallet',
            component: Wallet,
            beforeEnter: AuthGuard
        },
        {
            path: '/history',
            name: 'History',
            component: History,
            beforeEnter: AuthGuard
        },
        {
            path: '/lines',
            name: 'Lines',
            component: Lines,
            beforeEnter: AuthGuard
        },
        {
            path: '/stations',
            name: 'Stations',
            component: Stations,
            beforeEnter: AuthGuard
        },
    ],
    mode: "history"
})