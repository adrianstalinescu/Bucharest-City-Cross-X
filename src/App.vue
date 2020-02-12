<template>
  <v-app id="app">
    <v-app-bar app color="#424242" dense flat dark >
      <v-tabs fixed-tabs>
        <v-tab>
          Transit
          <router-link to="/map" class="router-link-transparency">
            <v-icon color="white" size="20" class="ma-2">mdi-map</v-icon>
          </router-link>
        </v-tab>
        <v-tab>
          Travel Plans
          <router-link to="/plans" class="router-link-transparency">
            <v-icon color="white" size="20" class="ma-2">mdi-ticket</v-icon>
          </router-link>
        </v-tab>
        <v-tab>
          Wallet
          <router-link to="/wallet" class="router-link-transparency">
            <v-icon color="white" size="20" class="ma-2">mdi-wallet</v-icon>
          </router-link>
        </v-tab>
        <v-tab>
          History
          <router-link to="/history" class="router-link-transparency">
            <v-icon color="white" size="20" class="ma-2">mdi-history</v-icon>
          </router-link>
        </v-tab>
        <v-tab>
          Lines
          <router-link to="/lines" class="router-link-transparency">
            <v-icon color="white" size="20" class="ma-2">mdi-transit-connection-variant</v-icon>
          </router-link>
        </v-tab>
        <v-tab>
          Stations
          <router-link to="/stations" class="router-link-transparency">
            <v-icon color="white" size="20" class="ma-2">mdi-bus-stop-covered</v-icon>
          </router-link>
        </v-tab>
      </v-tabs>
      <div class="custom-state-badges">
        <v-chip color="rgba(255, 255, 255, 0.7)" text-color="black" class="mr-1 ml-1">
          <v-avatar left>
            <v-icon color="black">mdi-weather-partly-cloudy</v-icon>
          </v-avatar>24°C
        </v-chip>
        <v-chip class="ma-2" color="rgba(255, 255, 255, 0.7)" text-color="black">
          <v-avatar left >
            <v-btn fab dark :color="notificationColor" elevation="0" width="100%" height="100%" @click="notifications = true">
              <v-icon size="18" color="grey lighten-3">mdi-bell-ring</v-icon>
            </v-btn>
          </v-avatar>
          {{ messages }}
        </v-chip>
        <v-avatar color="green" @click="profile = true" class="mr-1 ml-2" size="31">
          <v-btn fab dark color="green" elevation="0" width="100%" height="100%" @click="profile = true">
            <v-avatar size="31" >
                <img
                  src="https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg"
                />
            </v-avatar>
          </v-btn>
        </v-avatar>
      </div>

    </v-app-bar>
    <v-content>
      <v-dialog v-model="notifications" scrollable persistent max-width="50vw">
        <v-card>
          <v-toolbar flat dense class="travel-plans-top-bar ma-1 text-center">
            <div class="component-back-button">
              <v-btn
                small
                fab
                dark
                color="blue-grey lighten-1"
                elevation="0"
                @click="notifications=false"
              >
                <v-icon dark size="25">mdi-close</v-icon>
              </v-btn>
            </div>
            <v-toolbar-title class="margin-L-R">Notifications</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 500px;">
            <v-card class="ma-2" width="50vw" outlined>
              <v-list-item three-line>
                <div style="width:45vw;">
                  <div class="overline mb-2">12-02-2020 13:54</div>
                  <v-list-item-subtitle>Suspendarea liniilor de autobuz 105 si 870</v-list-item-subtitle>
                </div>
                <div style="width: 5vw;">
                  <v-row align="center" justify="end" class="notification">
                    <v-btn icon class="notification-icon">
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon color="grey darken-3">mdi-fullscreen</v-icon>
                    </v-btn>
                  </v-row>
                </div>
              </v-list-item>
            </v-card>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog persistent scrollable v-model="profile" width="40vw">
        <v-card>
          <v-card-title class="headline">Profile</v-card-title>
          <v-card-text style="height: 70vh;">
            <v-row justify="space-around">
              <v-avatar width="150px" height="150px" color="teal">
                <img
                  src="https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg"
                />
              </v-avatar>
            </v-row>
            <v-row justify="space-around">
              <v-btn color="blue-grey" class="ma-2 white--text">
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="space-around" class="ml-3 mr-3 mt-3">
              <v-text-field value label="Name" outlined disabled></v-text-field>
            </v-row>
            <v-row justify="space-around" class="ml-3 mr-3">
              <v-text-field value label="Email" outlined disabled></v-text-field>
            </v-row>
            <v-row justify="space-around" class="ml-3 mr-3">
              <v-text-field value label="Phone" outlined disabled></v-text-field>
            </v-row>
          </v-card-text>
          <v-card-actions class="ma-2">
            <v-btn
              fab
              small
              dark
              color="blue-grey lighten-1"
              elevation="0"
              @click="profile = false"
            >
              <v-icon dark size="25">mdi-close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab small dark color="success" elevation="0" @click="profileDlg = false">
              <v-icon dark size="25">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container fluid fill-height></v-container>
    </v-content>
  </v-app>
</template>

<script>
import Menu from "./components/Menu.vue";
import Maps from "./components/Maps.vue";
import VueGoogleAutocomplete from "vue-google-autocomplete";
/* eslint-disable */
export default {
  name: "App",
  components: {
    Menu,
    VueGoogleAutocomplete,
    Maps
  },

  data() {
    return {
      notificationColor: "error",
      messages: 23,
      show: false,
      notifications: false,
      profile: false
    };
  },

  created() {},

  watch: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>

<style scoped>

.router-link-transparency {
  color: transparent;
}

.margin-top-bottom {
  padding-top: 10px;
  padding-bottom: 10px;
}

.main-app-search {
  margin-left: 1vw;
  width: 80px;
  background-color: transparent !important;
  z-index: 1 !important;
  box-shadow: none;
}

.margin-L-R {
    margin-right: auto;
    margin-left: auto;
    font-weight: 400;
    font-size: 1.7em;
}

.component-back-button {
    position: absolute;
}

.notification-icon {
  margin-right: 0.3vw;
}

.custom-state-badges {
  display: flex;
  align-items: center;
}

.custom-notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 1.5vw;
  height: 3vh;
  color: red;
  font-size: 11px;
  background-color: #cc3939 !important;
  border-radius: 50px;
}

</style>