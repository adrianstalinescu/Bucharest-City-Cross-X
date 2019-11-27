require("dotenv").config();
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import HelloWorld from "./components/HelloWorld"
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueRouter);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCJG1xfQca-0KZLyw4annYR29_C1e8b2H0",
    libraries: "places"
  }
});

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: HelloWorld }
  ],
  mode: 'history'
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')