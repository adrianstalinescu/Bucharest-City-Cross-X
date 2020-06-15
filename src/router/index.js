import Vue from 'vue'
import AuthGuard from '../router/AuthGuard'
import AdminGuard from '../router/AdminGuard'
import Router from 'vue-router'
import Entrance from '../components/Entrance'
import Admin from '../components/Admin'
import Check from '../components/Check'
import Home from '../components/Home'
import Transit from '../components/Transit'
import Nearby from '../components/Transit/Land/Nearby'
import Route from '../components/Transit/Land/Route'
import Info from '../components/Transit/Land/Info'
import InfoAir from '../components/Transit/Air/Info'
import Store from '../components/Store'
import LandStore from '../components/Store/Land/Land'
import Wallet from '../components/Epass/Wallet'
import History from '../components/History'
import Lines from '../components/Lines'
import Stations from '../components/Stations'
import Face from '../components/Face'
import LandTransit from '../components/Transit/LandTransit'
import AirTransit from '../components/Transit/AirTransit'
import WaterTransit from '../components/Transit/WaterTransit'
import Epass from '../components/Epass'


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
            path: '/face',
            name: 'Face',
            component: Face
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
            path: '/transit-land',
            name: 'Transit Land',
            component: LandTransit,
            beforeEnter: AuthGuard
        },
        {
            path: '/transit-air',
            name: 'Transit Air',
            component: AirTransit,
            beforeEnter: AuthGuard
        },
        {
            path: '/transit-water',
            name: 'Transit Water',
            component: WaterTransit,
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
            path: '/info-air',
            name: 'Info Air',
            component: InfoAir,
            beforeEnter: AuthGuard
        },
        {
            path: '/store',
            name: 'Store',
            component: Store,
            beforeEnter: AuthGuard
        },
        {
            path: '/land-store',
            name: 'Land Store',
            component: LandStore,
            beforeEnter: AuthGuard
        },
        {
            path: '/epass',
            name: 'Epass',
            component: Epass,
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