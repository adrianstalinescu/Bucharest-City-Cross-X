<template>
  <v-app id="app">
    <v-content>
      <div class="custom-wrap">
        <v-card elevation="2" class="search-card-custom">
          <v-text-field
            placeholder="Search..."
            v-model="searchInput"
            single-line
            hide-details
            rounded
            clearable
            append-icon="mdi-magnify"
            full-width
            class="search-field-custom"
          ></v-text-field>
        </v-card>
        <v-card elevation="2" class="service-status-card-custom">
          <v-navigation-drawer floating permanent>
            <v-list dense rounded color="white">
              <h3>Service Status</h3>
                <v-row style="margin-bottom: -1.5vh;">
                  <v-col cols="6" md="4">
                    <v-progress-linear value="valueDeterminate" color="#ffce00" style="width:3vw; height:4vh; border: 1px solid white;"><h1>M1</h1></v-progress-linear>
                  </v-col>
                  <v-col cols="12" md="8">
                    <h3>Good service</h3>
                  </v-col>
                </v-row>
                <v-row style="margin-bottom: -1.5vh;">
                  <v-col cols="6" md="4">
                    <v-progress-linear value="valueDeterminate" color="blue" style="width:3vw; height:4vh; border: 1px solid white;"><h1>M2</h1></v-progress-linear>
                </v-col>
                  <v-col cols="12" md="8">
                    <h3>Severe delays</h3>
                  </v-col>
                </v-row>
                <v-row style="margin-bottom: -1.5vh;">
                  <v-col cols="6" md="4">
                    <v-progress-linear value="valueDeterminate" color="red" style="width:3vw; height:4vh; border: 1px solid white;"><h1>M3</h1></v-progress-linear>
                </v-col>
                  <v-col cols="12" md="8">
                    <h3>Part suspended</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" md="4">
                    <v-progress-linear value="valueDeterminate" color="#05a841" style="width:3vw; height:4vh; border: 1px solid white;"><h1>M4</h1></v-progress-linear>
                </v-col>
                  <v-col cols="12" md="8">
                    <h3>Part suspended<br>Severe delays</h3>
                  </v-col>
                </v-row>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-card elevation="2" class="navigation-buttons-card-custom">
          <v-navigation-drawer floating permanent style="margin-left:auto; margin-right:auto;">
            <v-dialog v-model="dialogLogin" persistent max-width="40vw">
              <template v-slot:activator="{ on }">
                <v-card-actions class="justify-center" style="margin-top:5px;">
                  <v-btn color="#4bbd6a" v-on="on"><v-icon style="margin-right:7px;">mdi-tram-side</v-icon>Join Transit</v-btn>
                </v-card-actions>
              </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Join Transit</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="justify-center">
                      <v-dialog v-model="dialogRegister" persistent max-width="40vw">
                        <template v-slot:activator="{ on }">
                          <v-card-actions class="justify-center" style="margin-top:5px;">
                            <v-btn color="#4bbd6a" @click=" dialogRegister = true, dialogLogin = false"><v-icon style="margin-right:7px;">mdi-account-plus</v-icon>Register</v-btn>
                          </v-card-actions>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Join Transit</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field label="Email*" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field label="Password*" type="password" required></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn color="blue darken-1" width="5vw" @click="dialogRegister = false">Close</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="#4bbd6a" width="5vw" @click="dialogRegister = false">Login</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      </v-row>
                      <br>
                      <v-row class="justify-center">
                        <a href="#" style="font-size:1.1em;">Forgot your password?</a>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue darken-1" width="5vw" @click="dialogLogin = false">Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="#4bbd6a" width="5vw" @click="dialogLogin = false">Login</v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>
                      <v-list dense rounded color="white" style="padding-left:15px;">
                        <v-list-item v-for="item in items" :key="item.title" link style="margin-bottom:10px;">
                          <v-list-item-icon>
                            <v-icon style="font-size:2em;">{{ item.icon }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title style="font-size:16px;">{{ item.text }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-navigation-drawer>
                  </v-card>
                </div>
                <div class="map-wrapper">
                <hello-world />
                </div>
              </v-content>
            </v-app>
          </template>

<script>
import HelloWorld from "./components/HelloWorld";
/* eslint-disable */
export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
    drawer: 0,
    dialogLogin: false,
    dialogRegister: false,  
    searchInput: "",
    items: [
      { icon: 'mdi-account-circle' , text: 'My Account' },
      { icon: "mdi-subway", text: "Stations" },
      { icon: "mdi-map-marker-distance", text: "Lines"},
      { icon: "mdi-credit-card-scan", text: "Wallet" },
      { icon: "mdi-credit-card-outline", text: "Payments" },
      { icon: 'mdi-settings' , text: 'Settings' },
      { icon: 'mdi-logout' , text: 'Sign Out' }
    ],
    valueDeterminate: 100
    }
  },
  computed () {

  },
  methods () {

  }
};
</script>

<style scoped>
.custom-wrap {
  position: fixed;
  z-index: 100;
}
.map-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
}
.search-card-custom {
  width: 450px;
  margin-left: 1vw;
  margin-top: 2vh;
}
.service-status-card-custom {
  width: 270px;
  margin-left: 1vw;
  margin-top: 1.5vh;
  padding-left:5px;
  padding-bottom:10px;
}
.navigation-buttons-card-custom {
  width: 270px; 
  margin-left: 1vw; 
  margin-top: 1.5vh;
}
.search-field-custom {
  font-size: 1.2em; 
}
</style>