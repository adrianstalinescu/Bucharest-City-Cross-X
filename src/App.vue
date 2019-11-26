<template>
  <v-app id="app">
    <v-content>
      <div class="custom-wrap">
        <v-card elevation="2" width="300" style="margin-left: 1vw; margin-top: 2vh;">
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
        <v-card elevation="2" width="200" style="margin-left: 1vw; margin-top: 2vh;">
          <v-navigation-drawer floating permanent>
            <v-card-actions class="justify-center">
              <v-btn color="#4bbd6a">Join Transit</v-btn>
            </v-card-actions>
            <v-list dense rounded color="white">
              <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
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
      // { icon: 'mdi-account-circle' , text: 'My Account' },
      { icon: "mdi-subway", text: "Stations" },
      { icon: "mdi-credit-card-scan", text: "Tickets" },
      { icon: "mdi-credit-card-outline", text: "Payments" }
      // { icon: 'mdi-settings' , text: 'Settings' },
      // { icon: 'mdi-logout' , text: 'Sign Out' },
    ]
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