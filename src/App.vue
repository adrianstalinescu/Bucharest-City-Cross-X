<template>
  <v-app id="app">
    <v-content>
      <div class="custom-wrap">
        <v-card elevation="2" width="450" style="margin-left: 1vw; margin-top: 2vh;">
          <v-text-field
            placeholder="Search..."
            single-line
            hide-details
            color="grey"
            background-color="white"
            rounded
            clearable
            append-icon="mdi-magnify"
            full-width
          ></v-text-field>
        </v-card>
        <v-card elevation="2" width="270" style="margin-left: 1vw; margin-top: 1.5vh; padding-left:5px; padding-bottom:10px">
          <v-navigation-drawer floating permanent>
            <v-list dense rounded color="white">
              <h1>M1</h1>
                <v-progress-linear v-model="valueDeterminate" color="yellow"></v-progress-linear>
              <h1>M2</h1>
                <v-progress-linear v-model="valueDeterminate" color="blue"></v-progress-linear>
              <h1>M3</h1>
                <v-progress-linear v-model="valueDeterminate" color="red"></v-progress-linear>
              <h1>M4</h1>
                <v-progress-linear v-model="valueDeterminate" color="green"></v-progress-linear>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-card elevation="2" width="270" style="margin-left: 1vw; margin-top: 1.5vh;">
          <v-navigation-drawer floating permanent style="margin-left:auto; margin-right:auto;">
            <v-card-actions class="justify-center" style="margin-top:5px;">
              <v-btn color="#4bbd6a"><v-icon style="margin-right:7px;">mdi-tram-side</v-icon>Join Transit</v-btn>
            </v-card-actions>
            <v-list dense rounded color="white" style="padding-left:15px;">
              <v-list-item v-for="item in items" :key="item.title" link style="margin-bottom:10px;">
                <v-list-item-icon>
                  <v-icon style="font-size:30px;">{{ item.icon }}</v-icon>
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
    items: [
      { icon: 'mdi-account-circle' , text: 'My Account' },
      { icon: "mdi-subway", text: "Stations" },
      { icon: "mdi-credit-card-scan", text: "Tickets" },
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
</style>