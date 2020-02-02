require("dotenv").config();
import Vue from 'vue'
import App from './App.vue'
import Menu from './components/Menu'
import Maps from './components/Maps'
import Wallet from './components/Wallet'
import TravelPlans from './components/TravelPlans'
import History from './components/History'
import Buses from './components/Buses'
import Trams from './components/Trams'
import Metro from './components/Metro'
import Stations from './components/Stations'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import * as firebase from './firebase'

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Maps
    },
    {
      path: '/menu',
      component: Menu
    },
    {
      path: '/plans',
      component: TravelPlans
    },
    {
      path: '/wallet',
      component: Wallet
    },
    {
      path: '/history',
      component: History
    },
    {
      path: '/buses',
      component: Buses
    },
    {
      path: '/trams',
      component: Trams
    },
    {
      path: '/metro',
      component: Metro
    },
    {
      path: '/stations',
      component: Stations
    },
  ],
  mode: 'history'
})
new Vue({
  router,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')