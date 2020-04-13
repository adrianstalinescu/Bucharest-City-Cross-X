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
import Wallet from '../components/Wallet'
import TravelPlans from '../components/TravelPlans'
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
            path: '/wallet',
            name: 'Wallet',
            component: Wallet,
            beforeEnter: AuthGuard
        },
        {
            path: '/plans',
            name: 'Plans',
            component: TravelPlans,
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