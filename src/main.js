require("dotenv").config();
import Vue from 'vue'
import App from './App.vue'
import Menu from './components/Menu'
import Maps from './components/Maps'
import TravelPlans from './components/TravelPlans'
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
  ],
  mode: 'history'
})
new Vue({
  router,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')