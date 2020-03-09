<template>
  <v-app id="app">
    <v-app-bar app color="#424242" dense flat dark>
      <div class="custom-app-toolbar">
        <v-tabs fixed-tabs>
          <v-tab to="/">
            Home
            <v-icon color="white" size="20" class="ma-2">mdi-home</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/map">
            Transit
            <v-icon color="white" size="20" class="ma-2">mdi-map</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/plans">
            Travel Plans
            <v-icon color="white" size="20" class="ma-2">mdi-ticket</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/wallet">
            Wallet
            <v-icon color="white" size="20" class="ma-2">mdi-wallet</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/history">
            History
            <v-icon color="white" size="20" class="ma-2">mdi-history</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/lines">
            Lines
            <v-icon color="white" size="20" class="ma-2">mdi-transit-connection-variant</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/stations">
            Stations
            <v-icon color="white" size="20" class="ma-2">mdi-bus-stop-covered</v-icon>
          </v-tab>
        </v-tabs>
        <v-divider class="mr-2" vertical></v-divider>
        <div class="custom-badges">
          <v-chip color="rgba(255, 255, 255, 0.7)" text-color="black" class="mr-2 custom-weather">
            <h4 style="display:none">{{ weatherLoad }}</h4>
            <img
              v-if="weather.icon"
              height="40px"
              width="40px"
              style="margin-left: 5px;"
              :src="require('./assets/weather/' + weather.icon + '.png')"
            />
            <span
              v-if="weather.temperature"
              class="custom-weather-temperature"
            >{{ this.weather.temperature }}°C</span>
            <span
              v-if="!weather.icon || !weather.temperature"
              class="mx-2"
              style="font-weight: 500;"
            >No Weather</span>
          </v-chip>
          <v-btn
            fab
            dark
            color="grey"
            elevation="0"
            class="custom-profile-avatar"
            @click="profile = true"
          >
            <img
              src="https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg"
              style="border-radius: 50%;"
              width="38px"
            />
          </v-btn>
        </div>
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
            <v-btn
              rounded
              dark
              color="error"
              elevation="0"
              class="justify-center"
              @click="onSignOut()"
            >
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
                <v-text-field label="Phone" type="text" prepend-icon="mdi-phone" color="green"></v-text-field>
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
      <v-dialog persistent scrollable v-model="gdpr" v-if="profile" width="40vw">
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
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-dialog persistent color="white" v-model="entrance" v-if="!user" fullscreen>
      <div class="entrance-wrapper" v-if="entranceWrap" style="background: white">
        <v-card
          width="35vw"
          elevation="0"
          color="transparent"
          class="margin-L-R entrance-card-wrapper"
        >
          <v-card-actions>
            <v-btn
              fab
              elevation="0"
              color="success"
              class="entrance-buttons"
              @click="signupWrapper()"
            >
              Join
              <v-icon right>mdi-plus-circle-outline</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              fab
              elevation="0"
              color="success"
              class="entrance-buttons"
              @click="loginWrapper()"
            >
              Login
              <v-icon right>mdi-location-enter</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="login" class="login-wrapper">
        <v-card width="35vw" height="70vh" elevation="0" class="margin-L-R login-card-wrapper">
          <v-card-title class="pa-0 justify-align-center">
            <div class="margin-L-R">
              TRANSIT
              <v-icon>mdi-tram-side</v-icon>
            </div>
          </v-card-title>
          <v-container grid-list-sm class="pa-0 justify-align-center">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-text-field
                  label="Email"
                  v-model="email"
                  color="green"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                  name="input-10-1"
                  label="Password"
                  v-model="password"
                  min="8"
                  color="green"
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions justify-align-center>
            <v-btn fab color="success" elevation="0" @click="entranceBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab color="success" elevation="0" type="submit" @click="userSignin()">
              <v-icon>mdi-location-enter</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions justify-align-center>
            <v-btn
              rounded
              color="success"
              elevation="0"
              @click="userSignin"
              class="margin-L-R"
            >Forgot password?</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="register" class="register-wrapper">
        <v-card width="70vw" height="90vh" elevation="0" class="margin-L-R register-card-wrapper">
          <v-card-title>
            <div class="margin-L-R">
              Join
              <v-icon>mdi-plus-circle-outline</v-icon>
            </div>
          </v-card-title>
          <v-container grid-list-sm>
            <v-layout wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-text-field
                  label="Email"
                  v-model="email"
                  color="success"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Name" v-model="name" color="success"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Phone" color="success" v-model="phone"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select :items="genderSelect" v-model="gender" color="success" label="Gender"></v-select>
              </v-flex>
              <v-flex xs6>
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
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="input-10-1"
                  label="Password"
                  color="success"
                  hint="Minimum 8 characters"
                  v-model="password"
                  min="8"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="'password'"
                  :rules="[rules.required]"
                  counter
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  name="input-10-1"
                  label="Password confirm"
                  hint="Minimum 8 caractere"
                  color="success"
                  v-model="confirmPassword"
                  min="8"
                  :type="'password'"
                  :rules="[comparePasswords]"
                ></v-text-field>
              </v-flex>
              <v-btn
                elevation="0"
                color="grey darken-1"
                @click="gdprRegister = true"
                class="white--text justify-center margin-L-R mt-2"
              >
                GDPR and Privacy Policy
                <v-icon right dark>mdi-library-books</v-icon>
              </v-btn>
              <v-flex xs12>
                <v-checkbox
                  class="justify-center margin-L-R mt-2"
                  label="I agree to the terms and conditions"
                  color="success"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn fab color="success" elevation="0" @click="entranceBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab color="success" elevation="0" type="submit" @click="userRegister()">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
          <v-dialog persistent scrollable v-model="gdprRegister" width="40vw">
            <v-card>
              <v-row justify="space-around" class="ma-1">
                <v-btn
                  fab
                  small
                  dark
                  color="blue-grey lighten-1"
                  elevation="0"
                  @click="gdprRegister = false"
                >
                  <v-icon dark size="25">mdi-close</v-icon>
                </v-btn>
              </v-row>
              <v-divider></v-divider>
              <v-card-text style="height: 70vh;">Lorem ipsum dolor sit amet</v-card-text>
            </v-card>
          </v-dialog>
        </v-card>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: "App",
  components: {},

  data() {
    return {
      weather: {
        icon: null,
        temperature: null
      },
      profile: false,
      name: null,
      email: null,
      date: null,
      phone: null,
      password: null,
      confirmPassword: null,
      menu: false,
      gdprRegister: false,
      gdpr: false,
      genderSelect: ["Male", "Female"],
      gender: null,
      entrance: true,
      entranceWrap: true,
      login: false,
      register: false,
      e1: true,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        }
      }
    };
  },

  created() {
    this.$store.dispatch("AuthChange");
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    weatherLoad() {
      var apikey = "VSbxFwm7S4kz8tyvaBiFAVxCbsBlnvtm";
      const latlong = "44.4268006,26.1025036";
      const vremea = new XMLHttpRequest();
      vremea.open(
        "GET",
        "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" +
          apikey +
          "&q=" +
          latlong +
          "&details=true",
        true
      );
      vremea.onload = () => {
        const locationKey = JSON.parse(vremea.responseText);
        const key1 = locationKey.Key;
        const vremeaStatus = new XMLHttpRequest();
        vremeaStatus.open(
          "GET",
          "https://dataservice.accuweather.com/currentconditions/v1/" +
            key1 +
            "?apikey=" +
            apikey +
            "&details=true",
          true
        );
        vremeaStatus.send();
        vremeaStatus.onload = () => {
          const stareVreme = JSON.parse(vremeaStatus.responseText);
          const iconVreme = stareVreme[0].WeatherIcon;
          switch (iconVreme) {
            case 1:
              this.weather.icon = "sun";
              break;
            case 2:
              this.weather.icon = "sun";
              break;
            case 3:
              this.weather.icon = "cloud-2";
              break;
            case 4:
              this.weather.icon = "cloud-2";
              break;
            case 5:
              this.weather.icon = "cloud-2";
              break;
            case 6:
              this.weather.icon = "cloud-2";
              break;
            case 7:
              this.weather.icon = "cloud-1";
              break;
            case 8:
              this.weather.icon = "cloud-1";
              break;
            case 9:
              this.weather.icon = "cloud-1";
              break;
            case 11:
              this.weather.icon = "cloud-1";
              break;
            case 12:
              this.weather.icon = "rain-3";
              break;
            case 13:
              this.weather.icon = "rain-3";
              break;
            case 14:
              this.weather.icon = "rain-3";
              break;
            case 15:
              this.weather.icon = "storm";
              break;
            case 16:
              this.weather.icon = "rain-3";
              break;
            case 17:
              this.weather.icon = "rain-3";
              break;
            case 18:
              this.weather.icon = "rain";
              break;
            case 19:
              this.weather.icon = "cloud-2";
              break;
            case 20:
              this.weather.icon = "cloud-2";
              break;
            case 21:
              this.weather.icon = "cloud-2";
              break;
            case 22:
              this.weather.icon = "snow";
              break;
            case 23:
              this.weather.icon = "snow";
              break;
            case 24:
              this.weather.icon = "snow-1";
              break;
            case 25:
              this.weather.icon = "cloud-1";
              break;
            case 26:
              this.weather.icon = "cloud-1";
              break;
            case 27:
              this.weather.icon = "cloud-1";
              break;
            case 28:
              this.weather.icon = "cloud-1";
              break;
            case 29:
              this.weather.icon = "cloud-1";
              break;
            case 30:
              this.weather.icon = "sun";
              break;
            case 31:
              this.weather.icon = "snow-1";
              break;
            case 32:
              this.weather.icon = "cloud-1";
              break;
            case 33:
              this.weather.icon = "moon";
              break;
            case 34:
              this.weather.icon = "moon";
              break;
            case 35:
              this.weather.icon = "moon";
              break;
            case 36:
              this.weather.icon = "moon";
              break;
            case 37:
              this.weather.icon = "moon";
              break;
            case 38:
              this.weather.icon = "cloud";
              break;
            case 39:
              this.weather.icon = "rain-2";
              break;
            case 40:
              this.weather.icon = "rain-2";
              break;
            case 41:
              this.weather.icon = "storm";
              break;
            case 42:
              this.weather.icon = "storm";
              break;
            case 43:
              this.weather.icon = "cloud";
              break;
            case 44:
              this.weather.icon = "snow";
          }
          const tempVreme = stareVreme[0].Temperature.Metric.Value;
          this.weather.temperature = tempVreme.toFixed(0);
        };
      };
      vremea.send();
    }
  },

  mounted() {},

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    loginWrapper() {
      this.login = true;
      this.entranceWrap = false;
      this.register = false;
    },
    signupWrapper() {
      this.register = true;
      this.entranceWrap = false;
      this.login = false;
    },
    entranceBack() {
      this.login = false;
      this.register = false;
      this.entranceWrap = true;
    },
    onSignOut() {
      this.$store.dispatch("signOut");
      this.entrance = true;
      this.entranceWrap = true;
      this.profile = false;
    },
    userSignin() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password
      });
    },
    ceva() {
      this.gdpr = true;
    }
  }
};
</script>

<style scoped>
.router-link-transparency {
  color: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.justify-align-center {
  align-self: center;
  justify-self: center;
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

.entrance-wrapper {
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
}

.login-wrapper {
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
}

.register-wrapper {
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
}

.entrance-buttons {
  width: 10vw !important;
  height: 10vw !important;
}

.login-card-wrapper {
  align-self: center;
}

.register-card-wrapper {
  align-self: center;
}

.entrance-card-wrapper {
  align-self: center;
}

.margin-L-R {
  margin-left: auto;
  margin-right: auto;
}

.component-back-button {
  position: absolute;
}

.notification-icon {
  margin-right: 0.3vw;
}

.custom-badges {
  height: 100%;
  width: 140px;
  margin-left: 5px;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.custom-profile-avatar {
  height: 38px !important;
  width: 38px !important;
  align-self: center;
  justify-self: center;
}

.custom-app-toolbar {
  width: 100%;
  height: 100%;
  display: -webkit-box;
}

.custom-weather {
  align-self: center;
  justify-self: center;
  padding: 0px !important;
}

.custom-weather-temperature {
  margin-right: 10px;
  font-weight: 500;
  font-size: 1rem;
}
</style>