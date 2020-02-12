import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUSer(payload) {
            this.$state.user = payload
        }
    },
    actions: {
        actionUser({commit}, payload) {
            commit('setUser', payload)
        }
    },
    getters: {
        getUser:state => state.user
    },
})