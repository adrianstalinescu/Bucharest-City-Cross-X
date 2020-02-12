<template>
  <v-app id="app">
    <v-content>
      <v-col cols="12" class="cols-padding">
        <v-row align="start" justify="space-around">
          <v-card class="main-app-search">
            <v-chip class="ma-2" color="rgba(255, 255, 255, 0.7)" text-color="black">
              <v-avatar left>
                <v-icon color="#f2da1f">mdi-weather-sunny</v-icon>
              </v-avatar>24°C
            </v-chip>
          </v-card>
          <div class="custom-search-wrap">
            <v-card class="search-card" elevation="0">
              <vue-google-autocomplete
                ref="address"
                id="search"
                class="form-control"
                placeholder="Search..."
                v-on:placechanged="getAddressData"
              ></vue-google-autocomplete>
              <div class="custom-search-icons">
                <v-icon v-if="address" @click="eraseData()" class="custom-search-erase">mdi-close</v-icon>
                <v-icon color="green" @click="ceva()">mdi-magnify</v-icon>
              </div>
            </v-card>
            <v-card class="main-app-menu">
              <router-link to="/menu" class="router-link-transparency">
                <v-btn
                  text
                  icon
                  :ripple="false"
                  color="transparent"
                  width="100%"
                  class="main-app-menu-drawer"
                >
                  <v-icon size="30" color="success">mdi-menu</v-icon>
                </v-btn>
              </router-link>
            </v-card>
          </div>
          <v-card class="main-app-search">
            <v-chip class="ma-2" color="rgba(255, 255, 255, 0.7)" text-color="black">
              <v-avatar left color="green">
                <v-btn fab dark color="green" elevation="0" width="100%" height="100%">
                  <v-icon size="15" color="white">mdi-bell-ring</v-icon>
                </v-btn>
              </v-avatar>
              {{ notifications }}
            </v-chip>
          </v-card>
        </v-row>
      </v-col>
      {{ getUserData }}
      <transition name="fade" mode="in-out">
        <router-view></router-view>
      </transition>
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
      address: "",
      notifications: "3"
    };
  },

  created() {},

  watch: {},

  computed: {
    getUserData() {
      this.$store.getters.getUser;
    }
  },

  mounted() {},

  methods: {
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
      this.$store.dispatch("actionUser", "someData");
    },

    eraseData() {
      this.address = "";
      document.getElementById("search").value = "";
    }
  }
};
</script>
<style scoped>
.form-control {
  width: -webkit-fill-available;
  caret-color: lightgray;
  outline: none;
  margin-right: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form-control::placeholder {
  color: rgb(169, 169, 169);
  font-weight: 350;
}

.custom-search-wrap {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.custom-search-icons {
  display: flex;
}

.custom-search-erase {
  margin-right: 10px;
}

.custom-search-erase:hover {
  transition: 0.4s ease;
  color: red;
}

.router-link-transparency {
  color: transparent;
}

.cols-padding {
  padding: 0px !important;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.2s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}

.main-app-search {
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 1vh;
  width: 80px;
  background-color: transparent !important;
  z-index: 1 !important;
  box-shadow: none;
}

.search-card {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 450px;
  height: 40px;
  margin-top: 1.7vh;
  margin-left: 100px;
  margin-right: 100px;
  padding-right: 15px;
  padding-left: 20px;
  font-size: 1em;
  appearance: none;
  border: none;
  border-radius: 21px !important;
  background: none;
  background-color: rgba(255, 255, 255, 0.9);
}

.main-app-menu {
  box-shadow: none !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  width: 100px !important;
  height: 32px !important;
  margin-top: 0.5vh;
  border-radius: 50% / 100% !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  transform: rotate(180deg) !important;
  z-index: 1 !important;
}

.main-app-menu-drawer {
  transform: rotate(180deg) !important;
}
</style>