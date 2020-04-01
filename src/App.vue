<template>
  <v-app id="app">
    <!-- <v-app-bar v-if="this.$store.getters.user" app color="rgba(0, 0, 0, 0.26)" dense flat dark>
      <div class="custom-app-toolbar">
        <v-tabs class="custom-toolbar-buttons" fixed-tabs background-color="transparent">
          <v-tab to="/home">
            Home
            <v-icon color="white" size="20" class="ma-2">mdi-home</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab v-if="this.$store.getters.userRole === 'admin'" to="/admin">
            Admin
            <v-icon color="white" size="20" class="ma-2">mdi-view-dashboard-variant</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/map">
            Transit
            <v-icon color="white" size="20" class="ma-2">mdi-map</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/plans">
            Plans
            <v-icon color="white" size="20" class="ma-2">mdi-ticket</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/wallet">
            Wallet
            <v-icon color="white" size="20" class="ma-2">mdi-wallet</v-icon>
          </v-tab>
        </v-tabs>
        <div class="custom-badges">
          <v-chip color="rgba(0, 0, 0, 0.2)" text-color="white" class="custom-weather">
            <img
              v-if="weather.icon"
              class="custom-weather-icon"
              :src="require('./assets/weather/' + weather.icon + '.png')"
            />
            <span
              v-if="weather.temperature"
              class="custom-weather-temperature"
            >{{this.weather.temperature}}°C</span>
            <span
              v-if="!weather.icon || !weather.temperature"
              class="mx-2"
              style="font-weight: 500;"
            >No Weather</span>
          </v-chip>
          
        </div>
      </div>
    </v-app-bar> -->
    <v-content >
     
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      
    </v-content>
  </v-app>
</template>

<script>

/* eslint-disable */
export default {
  name: "App",

  data() {
    return {
      
      weather: {
        icon: null,
        temperature: null
      },
      
    };
  },

  created() {
    this.$store.dispatch("AuthChange");
  },

  watch: {
    
  },

  computed: {},

  mounted() {
    this.weatherLoad()
  },

  methods: {
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
    },
    
  }
};
</script>

<style scoped>
#app {
  background: #27aae1;
}

.router-link-transparency {
  color: transparent;
}

.fade-enter-active{
  transition: all 0.2s;
}

.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter {
  opacity: 0;
  /* transform: translateY(-10%) */
}
.fade-leave-to {
  opacity: 0;
  /* transform: translateY(10%) */
}



.custom-toolbar-buttons {
  width: 87.6vw;
  height: 100%;
}

.custom-badges {
  height: 100%;
  width: 11vw;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.custom-app-toolbar {
  width: 100%;
  height: 100%;
  display: -webkit-box;
}

.custom-weather {
  width: auto;
  height: 5.1vh !important;
  align-self: center;
  justify-self: center;
  padding: 0px 1vw 0px 0.5vw !important;
}

.custom-weather-icon {
  height: 6.3vh;
  width: 3vw;
  margin-right: 0.3vw;
}

.custom-weather-temperature {
  font-weight: 500;
  font-size: 3vh;
}

</style>