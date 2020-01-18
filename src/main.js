require("dotenv").config();
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import * as firebase from './firebase'

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', }
  ],
  mode: 'history'
})

new Vue({
  router,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')