<template>
  <v-app id="app">
    <v-app-bar app color="#424242" dense flat dark>
      <div class="custom-app-toolbar">
        <v-tabs fixed-tabs>
          <v-tab to="/home">
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
            color="blue-grey"
            elevation="0"
            class="custom-profile-avatar"
            @click="profile = true"
          >
            <v-icon v-if="!this.$store.getters.profilePicture" dark size="25">mdi-account-circle</v-icon>
            <img
              v-if="this.$store.getters.profilePicture"
              :src="this.$store.getters.profilePicture"
              style="border-radius: 50%;"
              width="38px"
              height="38px"
            />
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-content>
      <v-dialog persistent scrollable v-model="profile" width="35vw">
        <v-card>
          <v-card-text style="height: 80vh;">
            <v-row justify="space-around" class="mt-3">
              <v-avatar v-if="!this.$store.getters.profilePicture" width="150px" height="150px" color="blue-grey">
                <v-icon dark size="85">mdi-account-circle</v-icon>
              </v-avatar>
              <v-avatar v-if="this.$store.getters.profilePicture" width="150px" height="150px" color="white">
                <img width="151px" height="151px" :src="this.$store.getters.profilePicture"/>
              </v-avatar>
            </v-row>
            <v-row justify="space-around">
              <input
                type="file"
                accept="image/*"
                style="display:none"
                ref="profilePicture"
                @change="pictureSelect"
              />
              <v-btn
                :loading="loading"
                @click.native="loader = 'loading'"
                @click.exact="profilePictureUpdate()"
                elevation="0"
                rounded
                outlined
                color="blue-grey"
                class="ma-4 white--text"
              >
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="space-around">
              <v-switch inset v-model="switcher" class="custom-switcher" label="Edit data"></v-switch>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-0">
                <v-text-field v-model="user.name" label="Name" type="text" prepend-icon="mdi-account" color="green" class="ma-0" :disabled="switcher === false" :rules="[rules.required]"></v-text-field>
                <v-text-field v-model="user.phone" label="Phone" type="text" prepend-icon="mdi-phone" color="green" class="ma-0" :disabled="switcher === false" :rules="[rules.required]"></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="switcher === true" justify="space-around">
              <v-btn fab elevation="0" color="success" class="ma-1 white--text" outlined @click="profileSave()">
                <v-icon dark>mdi-content-save-outline</v-icon>
              </v-btn>
            </v-row>
            <v-row v-if="switcher === true" justify="space-around">
              <v-btn rounded elevation="0" color="red" class="ma-2" outlined @click="profileCancelSave()">
                <span>Cancel</span>
              </v-btn>
            </v-row>
            <v-row justify="space-around">
              <v-btn elevation="0" color="grey darken-1" rounded @click="gdpr = true" outlined class="white--text mt-2">
                <span>GDPR and Privacy Policy</span>
                <v-icon right dark size="20">mdi-file-multiple</v-icon>
              </v-btn>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
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
                @click="SignOut()"
              >
              <div class="ml-1">
                <span>Log Out</span>
                <v-icon dark right size="20">mdi-logout</v-icon>
              </div>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog persistent scrollable v-model="gdpr" v-if="profile" width="50vw">
        <v-card>
          <v-card-text style="height: 70vh;" class="pt-2 pb-2">
            <span v-html="this.$store.getters.gdpr"></span>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row justify="space-around" class="ma-1">
              <v-btn fab small dark color="blue-grey lighten-1" elevation="0" @click="gdpr = false">
                <v-icon dark size="25">mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <v-snackbar v-model="profilePictureNotification" :timeout="2000" color="success">
        <span class="data-modify">The Profile picture was updated</span>
      </v-snackbar>
      <v-snackbar v-model="profileUpdate" :timeout="2000" color="success">
        <span class="data-modify">The Data has been updated</span>
      </v-snackbar>
      <v-snackbar v-model="profileUpdateError" :timeout="2000" color="error">
        <span class="data-modify">All required data must be completed</span>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import firebase from '@/firebase'
/* eslint-disable */
export default {
  name: "App",

  data() {
    return {
      switcher: false,
      profilePictureNotification: false,
      profileUpdate: false,
      profileUpdateError: false,
      weather: {
        icon: null,
        temperature: null
      },
      profile: false,
      user: {
        profilePicture: null,
        mail: null,
        phone: null,
        name: null
      },
      profilePicture: null,
      loading: false,
      gdpr: false,
      rules: {
        required: value => !!value || "Required"
      }
    };
  },

  created() {
    this.$store.dispatch("AuthChange")
    this.$store.dispatch("gdpr")
  },

  watch: {
    profile: {
      handler(profile) {
        if(profile === true)
        {
          this.user.name = this.$store.getters.userName
          this.user.email = this.$store.getters.userEmail
          this.user.phone = this.$store.getters.userPhone
        }
      }
    }
  },

  computed: {
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
    pictureSelect(payload) {
      this.profilePictureNotification = false
      const selectedFile = payload.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.imageUrl = selectedFile;
      const uploadTask = firebase
        .storage()
        .ref("/" + this.$store.getters.user.uid + "/profile/profile")
        .put(selectedFile);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          var downloadURL = uploadTask.snapshot.ref.getDownloadURL();
          downloadURL.then(downloadURL => {
            this.$store.dispatch("profilePicture", {
              url: downloadURL
            })
            this.profilePictureNotification = true
          });
        }
      );
    },
    profilePictureUpdate() {
      this.$refs.profilePicture.click();
    },
    profileSave() {
      this.profileUpdate = false
      this.profileUpdateError = false
      let validateName = false
      let validatePhone = false
      if(this.user.name)
      {
        validateName = true
      } else {
        validateName = false
      }
      if(this.user.phone)
      {
        validatePhone = true
      } else {
        validatePhone = false
      }
      if(validateName + validatePhone === 2)
      {
        firebase
          .database()
          .ref("Users/" + this.$store.getters.user.uid + "/")
          .update({
            Name: this.user.name,
            Phone: this.user.phone
          })
        this.switcher = false
        this.profileUpdate = true
      } else {
        this.profileUpdateError = true
      }
    },
    profileCancelSave() {
      this.switcher = false
      this.user.name = this.$store.getters.userName
      this.user.phone = this.$store.getters.userPhone
    },
    SignOut() {
      this.profile = false
      this.$store.dispatch("signOut")
    },
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

.custom-switcher {
  width: 120px;
  height: 35px;
  margin-top: 0px;
  font-weight: 700;
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

.data-modify {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.gdpr-info {
  font-weight: 500;
  font-size: 0.9rem;
  align-self: center;
  justify-self: center;
}
</style>