<template>
  <v-app id="app">
    <v-app-bar app color="#424242" dense flat dark>
      <v-tabs fixed-tabs>
        <v-tab to="/">
          Home
          <v-icon color="white" size="20" class="ma-2">mdi-home</v-icon>
        </v-tab>
        <v-tab to="/map">
          Transit
          <v-icon color="white" size="20" class="ma-2">mdi-map</v-icon>
        </v-tab>
        <v-tab to="/plans">
          Travel Plans
          <v-icon color="white" size="20" class="ma-2">mdi-ticket</v-icon>
        </v-tab>
        <v-tab to="/wallet">
          Wallet
          <v-icon color="white" size="20" class="ma-2">mdi-wallet</v-icon>
        </v-tab>
        <v-tab to="/history">
          History
          <v-icon color="white" size="20" class="ma-2">mdi-history</v-icon>
        </v-tab>
        <v-tab to="/lines">
          Lines
          <v-icon color="white" size="20" class="ma-2">mdi-transit-connection-variant</v-icon>
        </v-tab>
        <v-tab to="/stations">
          Stations
          <v-icon color="white" size="20" class="ma-2">mdi-bus-stop-covered</v-icon>
        </v-tab>
      </v-tabs>
      <div class="custom-state-badges">
        <v-chip color="rgba(255, 255, 255, 0.7)" text-color="black" class="mr-1 ml-1">
          <v-avatar left>
            <v-icon color="black">mdi-weather-partly-cloudy</v-icon>
          </v-avatar>24°C
        </v-chip>
        <v-avatar color="green" @click="profile = true" class="mr-1 ml-2" size="31">
          <v-btn
            fab
            dark
            color="green"
            elevation="0"
            width="100%"
            height="100%"
            @click="profile = true"
          >
            <v-avatar size="31">
              <img
                src="https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg"
              />
            </v-avatar>
          </v-btn>
        </v-avatar>
      </div>
    </v-app-bar>
    <v-content>
      <v-dialog persistent scrollable v-model="profile" width="40vw">
        <v-card>
          <v-row justify="space-around" class="ma-1">
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
            <v-btn rounded dark color="error" elevation="0" @click="profile = false">
              Log Out
              <v-icon dark right size="20">mdi-logout</v-icon>
            </v-btn>
          </v-row>
          <v-divider></v-divider>
          <v-card-text style="height: 70vh;">
            <v-row justify="space-around" class="mt-3">
              <v-avatar width="150px" height="150px" color="teal">
                <img
                  src="https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg"
                />
              </v-avatar>
            </v-row>
            <v-row justify="space-around">
              <v-btn color="blue-grey" class="ma-4 white--text">
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email" type="email" prepend-icon="mdi-email" color="green"></v-text-field>
                <v-text-field label="Name" type="text" prepend-icon="mdi-account" color="green"></v-text-field>
                <v-select
                  v-model="gender"
                  label="Gender"
                  :items="genderSelect"
                  type="text"
                  prepend-icon="mdi-account-card-details-outline"
                  color="green"
                ></v-select>
                <v-text-field
                  label="Phone"
                  type="text"
                  required
                  prepend-icon="mdi-phone"
                  color="green"
                ></v-text-field>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Birthday date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                      color="green"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    color="green"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row justify="space-around">
              <v-btn elevation="0" color="grey darken-1" @click="gdpr = true" class="white--text">
                GDPR and Privacy Policy
                <v-icon right dark>mdi-library-books</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="space-around">
              <v-btn fab elevation="0" color="success" class="ma-4 white--text">
                <v-icon dark>mdi-content-save-outline</v-icon>
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog persistent scrollable v-model="gdpr" width="40vw">
        <v-card>
          <v-row justify="space-around" class="ma-1">
            <v-btn fab small dark color="blue-grey lighten-1" elevation="0" @click="gdpr = false">
              <v-icon dark size="25">mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-divider></v-divider>
          <v-card-text style="height: 70vh;">Lorem ipsum dolor sit amet</v-card-text>
        </v-card>
      </v-dialog>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: "App",
  components: {},

  data() {
    return {
      profile: false,
      date: null,
      menu: false,
      gdpr: false,
      genderSelect: ["Male", "Female"],
      gender: null
    };
  },

  created() {},

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  computed: {},

  mounted() {},

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    }
  }
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