import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Maps from '../components/Maps'
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
            name: 'Home',
            component: Home
        },
        {
            path: '/map',
            name: 'Map',
            component: Maps
        },
        {
            path: '/wallet',
            name: 'Wallet',
            component: Wallet
        },
        {
            path: '/plans',
            name: 'Plans',
            component: TravelPlans
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path: '/lines',
            name: 'Lines',
            component: Lines
        },
        {
            path: '/stations',
            name: 'Stations',
            component: Stations
        },
    ],
    mode: "history"
})