require("dotenv").config();
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import * as firebase from './firebase'
import Vuex from 'vuex'
import store from './store'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

Vue.use(Vuex)
Vue.use(VueGoogleAutocomplete)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')