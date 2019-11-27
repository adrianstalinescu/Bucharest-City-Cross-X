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
                  <v-progress-linear value="valueDeterminate" color="#ffce00" class="custom">
                    <h1>M1</h1>
                  </v-progress-linear>
                </v-col>
                <v-col cols="12" md="8">
                  <h3>Good service</h3>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -1.5vh;">
                <v-col cols="6" md="4">
                  <v-progress-linear value="valueDeterminate" color="blue" class="custom">
                    <h1>M2</h1>
                  </v-progress-linear>
                </v-col>
                <v-col cols="12" md="8">
                  <h3>Severe delays</h3>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -1.5vh;">
                <v-col cols="6" md="4">
                  <v-progress-linear value="valueDeterminate" color="red" class="custom">
                    <h1>M3</h1>
                  </v-progress-linear>
                </v-col>
                <v-col cols="12" md="8">
                  <h3>Part suspended</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" md="4">
                  <v-progress-linear value="valueDeterminate" color="#05a841" class="custom">
                    <h1>M4</h1>
                  </v-progress-linear>
                </v-col>
                <v-col cols="12" md="8">
                  <h3>Closed</h3>
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
                  <v-btn color="#4bbd6a" v-on="on">
                    <v-icon style="margin-right:7px;">mdi-tram-side</v-icon>Join Transit
                  </v-btn>
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
                            <v-btn
                              color="#4bbd6a"
                              @click=" dialogRegister = true, dialogLogin = false"
                            >
                              <v-icon style="margin-right:7px;">mdi-account-plus</v-icon>Register
                            </v-btn>
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
                            <v-btn
                              color="blue darken-1"
                              width="5vw"
                              @click="dialogRegister = false"
                            >Close</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="#4bbd6a" width="5vw" @click="dialogRegister = false">Login</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                    <br />
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
            <v-list dense rounded color="white">
              <div v-for="item in items" :key="item.title">
                <v-btn
                  v-if="!item.isUserLoggedIn"
                  rounded
                  large
                  depressed
                  text
                  color="#8fc9b0"
                  min-width="12vw"
                  max-width="12vw"
                  style="padding-top:0.2vh; margin-bottom: 1vh;"
                  @click="navigationDrawer(item)"
                >
                  <v-list-item style="margin-bottom:10px;">
                    <v-list-item-icon>
                      <v-icon style="font-size:2em;">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content style="text-align: left">
                      <v-list-item-title style="font-size:16px;">{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-btn>
              </div>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-dialog v-model="dialogStations" persistent max-width="40vw">
          <v-card>
            <v-card-title>
              <span class="headline">Stations</span>
            </v-card-title>
            <!-- wip -->
            <v-card-actions>
              <v-btn color="blue darken-1" width="5vw" @click="dialogStations = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogLines" persistent max-width="40vw">
          <v-card>
            <v-card-title>
              <span class="headline">Lines</span>
            </v-card-title>
            <!-- wip -->
            <v-card-actions>
              <v-btn color="blue darken-1" width="5vw" @click="dialogLines = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="map-wrapper">
        <hello-world />
      </div>
      <div class="gps-custom-button">
        <v-btn class="mx-2" fab dark color="#269e46">
          <v-icon dark>mdi-crosshairs-gps</v-icon>
        </v-btn>
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
      dialogStations: false,
      dialogLines: false,
      searchInput: "",
      valueDeterminate: 100,
      items: [
        {
          icon: "mdi-account-circle",
          text: "My Account",
          isUserLoggedIn: true
        },
        { icon: "mdi-subway", text: "Stations", isUserLoggedIn: false },
        {
          icon: "mdi-map-marker-distance",
          text: "Lines",
          isUserLoggedIn: false
        },
        { icon: "mdi-credit-card-scan", text: "Wallet", isUserLoggedIn: true },
        {
          icon: "mdi-credit-card-outline",
          text: "Payments",
          isUserLoggedIn: true
        },
        // { icon: 'mdi-settings' , text: 'Settings' },
        { icon: "mdi-logout", text: "Sign Out", isUserLoggedIn: true }
      ]
    };
  },
  computed: {},
  methods: {
    navigationDrawer(item) {
      switch (item.text) {
        case "Stations":
          this.dialogStations = true;
          break;
        case "Lines":
          this.dialogLines = true;
          break;
      }
    },
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
  padding-left: 5px;
  padding-bottom: 10px;
}
.navigation-buttons-card-custom {
  width: 270px;
  margin-left: 1vw;
  margin-top: 1.5vh;
}
.search-field-custom {
  font-size: 1.2em;
}
.custom {
  width: auto;
  height: 4vh !important;
  border: 1px solid white;
}
.gps-custom-button {
  position:absolute;
  right: 0.5vw;
  bottom: 3vh;
}
</style>