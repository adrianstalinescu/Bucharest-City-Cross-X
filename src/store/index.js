/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        AuthChange({
            commit
        }) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    commit('setUser', user)
                    firebase.database().ref('Users/' + this.state.user.uid)
                        .on('value', snap => {
                            const myObj = snap.val()
                            console.log(myObj)
                        }, function (error) {
                            console.log('Error: ' + error.message)
                        })
                } else {
                    commit('setUser', null)
                }
            })
        },
        signIn({
            commit
        }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    authData => {
                        commit('setUser', authData.user.uid)
                        firebase.database().ref('Users/' + authData.user.uid)
                            .on('value', snap => {
                                console.log(snap.val())
                            }, function (error) {
                                console.log('Error: ' + error.message)
                            })
                    })
                .catch(
                    error => {
                        console.log(error.message)
                    }
                )
        },
        signOut({
            commit
        }) {
            firebase.auth().signOut().then(function () {
                commit('setUser', null)
            }).catch(
                error => {
                    window.alert(error.message)
                })
        },
    },
    getters: {
        user: state => state.user,
    },
})