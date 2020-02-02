<template>
  <v-app id="app">
    <v-content>
      <v-col cols="12" class="cols-padding">
          <v-row
            align="start"
            justify="space-around"
          >
          <v-card
          class="main-app-search"
          >
            <v-chip
            class="ma-2"
            color="rgba(255, 255, 255, 0.7)"
            text-color="black"
            >
            <v-avatar left>
              <v-icon color="#f2da1f">mdi-weather-sunny</v-icon>
            </v-avatar>
              24°C
            </v-chip>
          </v-card> 
            <v-text-field
            placeholder="Search..."
            v-model="searchInput"
            single-line
            hide-details
            rounded
            clearable
            append-icon="mdi-magnify"
            @click:append="geolocate"
            color="green"
            class="search-card"
            >
            </v-text-field>
          <v-card
          class="main-app-search"
          >
            <v-chip
            class="ma-2"
            color="rgba(255, 255, 255, 0.7)"
            text-color="black"
            >
              <v-avatar 
              left
              color="green"
              >
                <v-btn
                fab 
                dark
                color="green"
                elevation="0" 
                width="100%"
                height="100%"
                >
                  <v-icon 
                  size="15"
                  color="white"
                  >
                    mdi-bell-ring
                  </v-icon>
                </v-btn>
              </v-avatar>
                {{ notifications }}
            </v-chip>
          </v-card>
          </v-row>
      </v-col>
      <v-col cols="12" class="cols-padding main-app-menu-wrap">
        <v-row
          align="start"
          justify="space-around"
        >
          <v-card
          class="main-app-menu"
          >
          <router-link to="/menu" class="router-link-transparency">
            <v-btn 
              text 
              icon 
              :ripple="false"
              color="transparent"
              width="100%"
              class="main-app-menu-drawer"
              >
                <v-icon 
                size="30"
                color="success"
                >
                  mdi-menu 
                </v-icon>
              </v-btn>
            </router-link>
          </v-card>
        </v-row>
      </v-col>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'
import Maps from './components/Maps.vue'
/* eslint-disable */
export default {
  name: "App",
  components: {
    Menu,
    Maps
  },

  data() {
    return {
      searchInput: "",
      notifications: "3",
    };
  },

  created() {
  },

  watch: {
  },
  
  computed: {
  },

  mounted () {
  },

  methods: {
    geolocate: function() {
      console.log("ceva");
     }
  }
}

</script>
<style scoped>

.router-link-transparency {
  color: transparent;
}

.cols-padding {
  padding: 0px !important;
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
  z-index: 1;
  width: 450px;
  height: 40px;
  padding-top: 5px;
  margin-top: 1.7vh;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 1em;
  appearance: none;
  border: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.9);
}

.main-app-menu {
  box-shadow: none !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  width: 100px !important;
  height: 32px !important;
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