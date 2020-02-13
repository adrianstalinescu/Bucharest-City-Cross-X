<template>
  <div class="map-wrapper">
    <div id="map" />
    <div class="custom-search-wrap">
      <v-card class="search-card" elevation="0">
        <vue-google-autocomplete
          ref="address"
          id="search"
          class="form-control"
          placeholder="Search..."
          country="ro"
          enable-geolocation
          types="establishment"
          v-on:placechanged="getAddressData"
        ></vue-google-autocomplete>
        <div class="custom-search-icons">
          <v-icon v-if="address" @click="clearSearch()" class="custom-search-erase">mdi-close</v-icon>
          <v-icon color="green" @click="search()">mdi-magnify</v-icon>
        </div>
      </v-card>
    </div>
    <div class="gps-custom-button" @click="geolocate()">
      <v-btn class="ma-2" fab dark small color="white" elevation="0">
        <v-icon color="blue lighten-1">mdi-crosshairs-gps</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "Maps",
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      address: "",
      defaultLocation: {
        lat: 44.4268006,
        lng: 26.1025036
      }
    };
  },

  created() {},

  watch: {
    defaultLocation: {
      deep: true,
      immediate: false,
      handler(newLocation) {
        if (newLocation && this.defaultLocation) {
          this.createMap();
        }
      }
    }
  },

  computed: {},

  async mounted() {
    this.createMap();
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    initialize(data) {
      this.map = data.map;
      this.google = data.google;
      this.askGeolocation();
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.defaultLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    createMap() {
      let myLatLng = new google.maps.LatLng(
        this.defaultLocation.lat,
        this.defaultLocation.lng
      );
      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 16,
        options: {
          disableDefaultUI: true,
          enableHighAccuracy: true,
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#212121"
                }
              ]
            },
            {
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#212121"
                }
              ]
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              featureType: "administrative.country",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9e9e9e"
                }
              ]
            },
            {
              featureType: "administrative.land_parcel",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#bdbdbd"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#181818"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1b1b1b"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#2c2c2c"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#8a8a8a"
                }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                {
                  color: "#373737"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#3c3c3c"
                }
              ]
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry",
              stylers: [
                {
                  color: "#4e4e4e"
                }
              ]
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#616161"
                }
              ]
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#757575"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#3d3d3d"
                }
              ]
            }
          ]
        }
      });
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Your Position"
      });
    },
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
    },
    clearSearch() {
      this.address = "";
      document.getElementById("search").value = "";
    },
    search() {
      console.log(this.address.latitude + " - " + this.address.longitude);
    }
  }
};
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

#map {
  height: 100%;
  width: 100%;
}

.search-card {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 450px;
  height: 40px;
  margin-top: 1.7vh;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 20px;
  font-size: 1em;
  appearance: none;
  border: none;
  border-radius: 21px !important;
  background: none;
  background-color: rgba(255, 255, 255, 0.9);
}

.form-control {
  width: -webkit-fill-available;
  caret-color: lightgray;
  outline: none;
  margin-right: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-search-wrap {
  position: absolute;
  top: 0;
  width: 100%;
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

.gps-custom-button {
  position: absolute;
  right: 0.5vw;
  bottom: 3vh;
}
</style>