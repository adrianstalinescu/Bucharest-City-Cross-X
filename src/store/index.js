/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        gdpr: null,
        user: null,
        userName: null,
        userPhone: null,
        userRole: null,
        profilePicture: null,
        profilePictureRegister: null,
        notifications: null,
        notificationsCount: null
    },
    mutations: {
        setGDPR(state, payload) {
            state.gdpr = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        setUserName(state, payload) {
            state.userName = payload
        },
        setUserPhone(state, payload) {
            state.userPhone = payload
        },
        setRole(state, payload) {
            state.userRole = payload
        },
        setUserProfilePicture(state, payload) {
            state.profilePicture = payload
        },
        setUserProfilePictureRegister(state, payload) {
            state.profilePictureRegister = payload
        },
        setNotifications(state, payload) {
            state.notifications = payload
        },
        setNotificationsCount(state, payload) {
            state.notificationsCount = payload
        },
    },
    actions: {
        AuthChange({
            commit
        }) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (this.state.profilePictureRegister !== null) {
                        firebase.storage().ref("/" + user.uid + "/profile/profile").put(this.state.profilePictureRegister).then(() => {
                            firebase.storage().ref("/" + user.uid + "/profile/profile").getDownloadURL().then(res => {
                                commit('setUserProfilePicture', res)
                                commit('setUser', user)
                                firebase.database().ref('Users/' + this.state.user.uid)
                                    .on('value', snap => {
                                        const myObj = snap.val()
                                        commit("setUserName", myObj.Name)
                                        commit("setUserPhone", myObj.Phone)
                                        commit("setRole", myObj.Role)
                                        if (myObj.Notifications) {
                                            commit('setNotificationsCount', Object.keys(myObj.Notifications))
                                            commit('setNotifications', myObj.Notifications)
                                        } else {
                                            commit('setNotificationsCount', null)
                                            commit('setNotifications', null)
                                        }
                                    })
                            })
                        })
                    } else {
                        commit('setUserProfilePictureRegister', null)
                        commit('setUser', user)
                        firebase.database().ref('Users/' + this.state.user.uid)
                            .on('value', snap => {
                                const myObj = snap.val()
                                commit("setUserName", myObj.Name)
                                commit("setUserPhone", myObj.Phone)
                                commit("setRole", myObj.Role)
                                if (myObj.Notifications) {
                                    commit('setNotificationsCount', Object.keys(myObj.Notifications))
                                    commit('setNotifications', myObj.Notifications)
                                } else {
                                    commit('setNotificationsCount', null)
                                    commit('setNotifications', null)
                                }
                                firebase.storage().ref("/" + user.uid + "/profile/profile")
                                    .getDownloadURL().then(function (url) {
                                        commit('setUserProfilePicture', url)
                                    })
                            }, function (error) {
                                console.log('Error: ' + error.message)
                            })
                    }
                } else {
                    commit('setUser', null)
                    commit('setUserName', null)
                    commit('setUserPhone', null)
                    commit("setRole", null)
                    commit('setUserProfilePicture', null)
                    commit('setUserProfilePictureRegister', null)
                    commit('setNotifications', null)
                    commit('setNotificationsCount', null)
                }
            })
        },
        profilePicture({
            commit
        }, payload) {
            commit('setUserProfilePicture', payload.url)
        },
        profilePictureRegister({
            commit
        }, payload) {
            commit('setUserProfilePictureRegister', payload.Picture)
        },
        gdpr({
            commit
        }) {
            firebase
                .database()
                .ref("Agreements/")
                .on("value", snap => {
                    let myObj = snap.val()
                    commit('setGDPR', myObj.Content)
                });
        },
        signIn({
            commit
        }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    authData => {
                        commit('setUser', authData.user.uid)
                        firebase.database().ref('Users/' + authData.user.uid)
                    })
                .catch(
                    error => {
                        console.log(error.message)
                    }
                )
        },
        register({
            commit
        }, payload) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.Email, payload.Password)
                .then(authData => {
                    commit('setUser', authData.user.uid)
                    firebase.database().ref('Users/' + authData.user.uid)
                        .set({
                            Email: payload.Email,
                            Gender: payload.Gender,
                            Name: payload.Name,
                            Phone: payload.Phone,
                            Created: payload.Created,
                            Role: payload.Role,
                            Birthdate: payload.Birthdate,
                            GDPR: payload.GDPR
                        })
                })
                .catch(error => {
                    console.log(error.message);
                })
        },
        signOut({
            commit
        }) {
            firebase.auth().signOut().then(function () {
                commit('setUser', null)
                commit('setUserName', null)
                commit('setUserPhone', null)
                commit('setUserProfilePicture', null)
                commit('setUserProfilePictureRegister', null)
                commit('setNotifications', null)
                commit('setNotificationsCount', null)
            }).catch(
                error => {
                    window.alert(error.message)
                })
        },
    },
    getters: {
        gdpr: state => state.gdpr,
        user: state => state.user,
        userName: state => state.userName,
        userPhone: state => state.userPhone,
        userRole: state => state.userRole,
        profilePicture: state => state.profilePicture,
        notifications: state => state.notifications,
        notificationsCount: state => state.notificationsCount
    },
})