<template>
  <div class="map-wrapper">
    <div id="map" />
    <div class="custom-search-wrap">
      <v-card class="search-card" elevation="0">
        <div class="display-flex mr-2">
            <v-icon size="25" color="#D95033">mdi-magnify</v-icon>
        </div>
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
        <div class="display-flex">
          <v-icon @click="clearSearch()" class="custom-search-erase">mdi-close</v-icon>
          <v-icon @click="search()" class="custom-search-go">mdi-send</v-icon>
        </div>
      </v-card>
    </div>
    <div class="gps-custom-button" @click="geolocate()">
      <v-btn class="ma-2" fab dark small color="white" elevation="0">
        <v-icon color="blue lighten-1" style="transform: rotate(45deg);">mdi-navigation</v-icon>
      </v-btn>
    </div>
    <router-link :to="'transit-land'" class="custom-router-link-transparency">
      <v-btn
      rounded
      dark
      color="#D95033"
      elevation="0"
      class="custom-back-button"
      >
          <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "@/firebase";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "Route",
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      address: {},
      defaultLocation: {
        lat: 44.4268006,
        lng: 26.1025036
      },
      zoom: 16,
      destination: null,
      map: null,
      directions: {
        service: null,
        display: null,
        start: null,
        end: null
      }
    };
  },
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

  mounted() {
    this.createMap();
    this.geolocate();
  },

  methods: {
    curday(sp) {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1; 
      let yyyy = today.getFullYear();

      if(dd<10) dd='0'+dd;
      if(mm<10) mm='0'+mm;
      return (dd+sp+mm+sp+yyyy);
    },
    curtime() {
      let today = new Date();
      let hh = today.getHours()
      let mm = today.getMinutes()

      if(hh<10) hh='0'+hh;
      if(mm<10) mm='0'+mm;
      let time =  hh + ":" + mm
      return (time)
    },
    initialize(data) {
      this.map = data.map;
      this.google = data.google;
      this.askGeolocation();
    },
    geolocate() {
      this.defaultLocation.lat = null
      this.defaultLocation.lng = null
      navigator.geolocation.getCurrentPosition(position => {
        this.defaultLocation.lat = position.coords.latitude
        this.defaultLocation.lng = position.coords.longitude
      });
    },
    createMap() {
      let myLatLng = new window.google.maps.LatLng(
        this.defaultLocation.lat,
        this.defaultLocation.lng
      );
      this.directions.service = new window.google.maps.DirectionsService();
      this.directions.display = new window.google.maps.DirectionsRenderer();
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: this.zoom,
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
      this.directions.display.setMap(this.map);
      this.search();
      let gpsImage = {
        url: require('@/assets/vehicles/location.svg'),
        scaledSize: new google.maps.Size(35, 35)
      }
      let marker = new window.google.maps.Marker({
        position: myLatLng,
        map: this.map,
        icon: gpsImage,
        title: "Your Position"
      });
    },
    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
      this.destination = placeResultData;
    },
    clearSearch() {
      this.address = "";
      document.getElementById("search").value = "";
    },
    search() {
      this.destination;
      if (this.destination) {
        const request = {
          origin: this.defaultLocation,
          destination: this.destination.geometry.location,
          travelMode: "TRANSIT"
        };

        this.directions.service.route(request, (response, status) => {
          if (status === "OK") {
            this.directions.display.setDirections(response);
            firebase
              .database()
              .ref("History/Search/" + this.$store.getters.user.uid)
              .push({
                Title: this.destination.name,
                Date: this.curday('-'),
                Time: this.curtime()
              });
          } else {
            window.alert("Directions request failed due to " + status);
          }
        });
      }
    }
  },
};
</script>

<style scoped>
.custom-router-link-transparency {
  color: transparent;
  height: 25vh !important;
  align-self: center;
}

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
  padding-left: 15px;
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

.custom-search-erase {
  margin-right: 10px;
}

.custom-search-erase:hover {
  transition: 0.4s ease;
  color: red;
}

.custom-search-go:hover {
  transition: 0.4s ease;
  color: #42A5F5;
}

.gps-custom-button {
  position: absolute;
  right: 0.5vw;
  bottom: 3vh;
}

.custom-back-button {
  position: absolute;
  top: 2vh;
  left: 1.5vw;
}

.display-flex {
  display: flex;
}
</style>