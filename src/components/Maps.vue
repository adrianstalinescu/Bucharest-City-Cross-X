<template>
  <div class="map-wrapper">
    <div id="map" />
    <v-navigation-drawer
      v-model="drawer"
      color="rgba(255, 255, 255, 0.8)"
      absolute
      class="custom-lines-menu-wrapper"
    >
      <v-expansion-panels multiple accordion>
        <v-expansion-panel
          v-for="lk in lines.keys"
          :key="lk"
          >
          <v-expansion-panel-header class="pa-2">
            <div class="custom-expansion-panel-header">
              <v-icon :color="lines.data[lk].Color" size="30">{{lines.data[lk].Icon}}</v-icon>
              <v-chip small :color="lines.data[lk].Color" class="ml-1" outlined>
                <span class="custom-line-number">{{lines.data[lk].Type}}</span>
                <v-icon size="20">mdi-chevron-right</v-icon>
                <span class="custom-line-number">{{lk}}</span>
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="custom-expansion-panel-dropdown">
            <div class="custom-line ma-1">
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                  @click="lineDetailsRefresh(lines.data[lk].ID, 0, lines.data[lk].CenterLat, lines.data[lk].CenterLng, lines.data[lk].CenterZoom, lines.data[lk].Color, lk, lines.data[lk].Icon, lines.data[lk].Type, lines.data[lk].T1)"
                >
                  <span class="custom-direction-text">{{lines.data[lk].T1}}</span>
                </v-btn>
              </div>
              <div class="ma-1">
                <v-icon>mdi-arrow-up-down</v-icon>
              </div>
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                  @click="lineDetailsRefresh(lines.data[lk].ID, 1, lines.data[lk].CenterLat, lines.data[lk].CenterLng, lines.data[lk].CenterZoom, lines.data[lk].Color, lk, lines.data[lk].Icon, lines.data[lk].Type, lines.data[lk].T2)"
                >
                  <span class="custom-direction-text">{{lines.data[lk].T2}}</span>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
    <div class="custom-search-wrap">
      <v-card v-if="drawerReturn === false" class="search-card" elevation="0">
        <div class="display-flex mr-2">
            <v-icon v-if="drawer === true" @click="drawer = false" size="25">mdi-menu</v-icon>
            <v-icon v-if="drawer === false" @click="drawer = true" size="25">mdi-menu</v-icon>
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
          <v-icon color="green" @click="search()">mdi-magnify</v-icon>
        </div>
      </v-card>
      <div v-if="drawerReturn === true" class="mt-2">
        <v-chip :color="selectedLineDetails.color" close class="px-5" dark @click:close="close">
          <v-icon left size="30" class="mr-1">{{selectedLineDetails.icon}}</v-icon>
          <span class="custom-line-number mr-2">{{selectedLineDetails.type}}:</span>
          <span class="custom-line-number">{{selectedLineDetails.number}}</span>
          <v-icon size="19">mdi-chevron-right</v-icon>
          <span class="custom-line-number">{{selectedLineDetails.direction}}</span>
        </v-chip>
      </div>
    </div>
    <div class="gps-custom-button" @click="geolocate()">
      <v-btn class="ma-2" fab dark small color="white" elevation="0">
        <v-icon color="blue lighten-1" style="transform: rotate(45deg);">mdi-navigation</v-icon>
      </v-btn>
    </div>
    <v-dialog persistent scrollable v-model="stationSelectedDetails" width="60vw">
      <v-card class="custom-info-wrapper">
        <v-card-text class="custom-station-wrapper">
          <div class="custom-station-name-title">
            <v-chip color="teal" outlined>
              <v-icon size="20">mdi-bus-stop-covered</v-icon>
              <span class="station-name">{{stationSelected.name}}</span>
            </v-chip>
          </div>
          <div v-for="lk in stationSelected.lines.keys" :key="lk">
            <v-card v-if="stationSelected.lines.data[lk].type !== 'SUBWAY'" elevation="0" class="custom-station-info">
              <div v-if="stationSelected.lines.data[lk].type !== 'SUBWAY'" class="custom-card-grid">
                <v-icon
                  v-if="stationSelected.lines.data[lk].type === 'BUS'"
                  size="38"
                  :color="stationSelected.lines.data[lk].color"
                >mdi-bus</v-icon>
                <img v-if="stationSelected.lines.data[lk].type === 'CABLE_CAR'" class="display-flex justify-self-center" width="34px" height="34px" src="../assets/vehicles/trolleybus.svg"/>
                <v-icon
                  v-if="stationSelected.lines.data[lk].type === 'TRAM'"
                  size="38"
                  :color="stationSelected.lines.data[lk].color"
                >mdi-tram</v-icon>
                <div class="align-self-center">
                  <v-chip :color="stationSelected.lines.data[lk].color" class="ml-1" outlined>
                    <span class="custom-line-number">{{stationSelected.lines.data[lk].name}}</span>
                    <v-icon size="28" :color="stationSelected.lines.data[lk].color">mdi-chevron-right</v-icon>
                    <span class="custom-line-number">{{stationSelected.lines.data[lk].direction_name}}</span>
                  </v-chip>
                </div>
                <v-chip color="rgb(117, 149, 166)" class="custom-arrival-wrapper" outlined>
                  <span class="card-info-time">{{ stationDetailsTime(stationSelected.lines.data[lk].arriving_time) }}</span>
                  <svg
                    v-if="stationSelected.lines.data[lk].arriving_time !== null"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                    class="feed-animation"
                  >
                    <g fill="#FBD42A">
                      <path
                        d="M15.9840916,8.88301685 C17.0973425,8.88301685 18,9.78539134 18,10.8988915 C18,12.0123916 17.0973425,12.9147661 15.9840916,12.9147661 C14.2915753,12.9147661 12.9149488,14.2916374 12.9149488,15.9838575 C12.9149488,17.0970897 12.0122913,18 10.8987725,18 C9.78552171,18 8.88286418,17.0970897 8.88286418,15.9838575 C8.88286418,12.0683881 12.0685567,8.88301685 15.9840916,8.88301685"
                        class="live-feed-animation-1"
                      />
                      <path
                        d="M10.5402817,3.0998359 C12.2654855,2.37000569 14.0970578,2 15.9840916,2 C17.0973425,2 18,2.90264242 18,4.01614254 C18,5.12937473 17.0973425,6.03201715 15.9840916,6.03201715 C13.3256862,6.03201715 10.8264313,7.0672829 8.94689954,8.94678321 C7.06709982,10.8265515 6.03181674,13.3254965 6.03181674,15.9838575 C6.03181674,17.0970897 5.12942713,18 4.01590837,18 C2.90265753,18 2,17.0970897 2,15.9838575 C2,14.0971231 2.37001189,12.2653136 3.09985431,10.5401387 C3.80424335,8.87471114 4.81219753,7.37941659 6.0958521,6.09578352 C7.37950667,4.81215044 8.87482626,3.80421314 10.5402817,3.0998359 Z"
                        class="live-feed-animation-2"
                      />
                    </g>
                  </svg>
                </v-chip>
              </div>
              <v-divider class="ma-2"></v-divider>
            </v-card>
            <v-card
              v-if="stationSelected.lines.data[lk].type === 'SUBWAY'"
              elevation="0"
              class="custom-capacity-indicator-card"
            >
              <div v-if="stationSelected.lines.data[lk].type === 'SUBWAY'" class="custom-capacity-indicator-title-grid">
                <v-chip :color="subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Color" class="capacity-indicator-line">
                  {{stationSelected.lines.data[lk].name}}
                  <v-icon>mdi-chevron-right</v-icon>
                  <v-chip color="white" outlined>
                    <span class="capacity-indicator-direction">{{stationSelected.lines.data[lk].direction_name}}</span>
                  </v-chip>
                </v-chip>
                <v-chip color="rgb(117, 149, 166)" outlined class="capacity-indicator-arrival-wrapper">
                  <span class="capacity-indicator-arrival">Arrival</span>
                  <v-chip color="rgb(117, 149, 166)" outlined>
                    <span
                      v-if="stationSelected.lines.data[lk].arriving_time !== null"
                      class="capacity-indicator-arrival-time"
                    >{{ stationDetailsTime(stationSelected.lines.data[lk].arriving_time)}}</span>
                    <span
                      v-if="stationSelected.lines.data[lk].arriving_time === null"
                      class="capacity-indicator-arrival-time"
                    >No service</span>
                  </v-chip>
                </v-chip>
              </div>
              <div class="custom-capacity-indicator-content-wrapper">
                <div class="capacity">
                  <span v-for="c in Object.keys(subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Capacity)" :key="c">
                    <img
                      v-if="subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Capacity[c] === 'low'"
                      class="carriage low"
                      src="../assets/capacityIndicator/capacity-low.svg"
                    />
                    <img
                      v-if="subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Capacity[c] === 'medium'"
                      class="carriage medium"
                      src="../assets/capacityIndicator/capacity-medium.svg"
                    />
                    <img
                      v-if="subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Capacity[c] === 'high'"
                      class="carriage high"
                      src="../assets/capacityIndicator/capacity-high.svg"
                    />
                  </span>
                </div>
              </div>
              <v-divider class="ma-2"></v-divider>
            </v-card>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row justify="space-around" class="ma-1">
            <v-btn fab small dark color="blue-grey lighten-1" elevation="0" @click="stationSelectedDetailsClose()">
              <v-icon dark size="25">mdi-close</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "@/firebase";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "Maps",
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      drawer: false,
      drawerReturn: false,
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
      },
      bounds: {
        ne:{
          lat: null,
          lng: null
        },
        sw: {
          lat: null,
          lng: null
        }
      },
      stations: [],
      stationSelectedDetails: false,
      stationSelected: {
        id: null,
        name: null,
        lines: {
          keys: [],
          data: null
        }
      },
      subway: {
        keys: [],
        data: null
      },
      lines: {
        keys: [],
        data: null
      },
      selectedLineDetails: {
        number: null,
        direction: null,
        color: null,
        icon: null,
        type: null
      },
      vehicleList: [],
      stopsList: []
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
    },
    bounds: {
      deep: true,
      immediate: false,
      handler(newLocation) {
        if (newLocation) {
          if(this.drawerReturn === false)
          {
            this.callerStations()
          }
        }
      }
    },
    stationSelectedDetails: {
      deep: true,
      handler(station) {
        if (station) {
          this.stationDetailsRefresh(this.stationSelected.id)
        } else {
          clearInterval(this.refreshStation);
        }
      }
    },
    drawer: {
      deep: true,
      handler(status) {
        if (status) {
          this.linesLoader()
        } else {
          this.lines.keys = []
          this.lines.data = null
        }
      }
    }
  },

  computed: {
  },

  mounted() {
    this.createMap();
    this.geolocate();
    this.subwayStations();
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
      google.maps.event.addListener(this.map, 'idle', () => {
        let bounds =  this.map.getBounds();
        this.bounds.ne.lat = bounds.getNorthEast().lat().toString();
        this.bounds.sw.lat = bounds.getSouthWest().lat().toString();
        this.bounds.ne.lng = bounds.getNorthEast().lng().toString();
        this.bounds.sw.lng = bounds.getSouthWest().lng().toString();
      });
      /* Change markers on zoom */
      google.maps.event.addListener(this.map, 'zoom_changed', () => {
        this.zoom = this.map.getZoom();
      })
      this.directions.display.setMap(this.map);
      this.search();
      if(this.drawerReturn === false)
      {
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
      }
    },
    createLinesMap() {
      let myLatLng = new window.google.maps.LatLng(
        this.defaultLocation.lat,
        this.defaultLocation.lng
      );
      let z = this.zoom
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: z,
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
    },
    callerStations() {
      if(this.zoom >= 16)
      {
        let stationsData = []
        const callSTB = new XMLHttpRequest();
        callSTB.open("GET", "https://info.stbsa.ro/rp/api/lines/home/stops/"+this.bounds.sw.lat+"/"+this.bounds.sw.lng+"/"+this.bounds.ne.lat+"/"+this.bounds.ne.lng+"?lang=ro", true);
        callSTB.send()
        callSTB.onload = () => {
          stationsData = JSON.parse(callSTB.responseText);
          if(stationsData !== null)
          {
            for(i=0; i<this.stations.length; i++){
              this.stations[i].setMap(null);
            }
            this.stations = []
            let infowindow = new google.maps.InfoWindow();
            let i;
            let stationImage = {
              url: require('@/assets/vehicles/station-regular.png'),
              scaledSize: new google.maps.Size(15, 15),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(7, 7)
            }
            let subwayStationImage = {
              url: require('@/assets/vehicles/station-subway.png'),
              scaledSize: new google.maps.Size(15, 15),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(7, 7)
            }
            let sticketOfficeImage = {
              url: require('@/assets/vehicles/ticket-office.png'),
              scaledSize: new google.maps.Size(15, 15),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(7, 7)
            }
            for (i = 0; i < stationsData.length; i++) {
              let marker 
              switch (stationsData[i].type)
              {
                case "STATION":
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(stationsData[i].lat, stationsData[i].lng),
                    icon: stationImage,
                    map: this.map
                  })
                  break;
                case "SUBWAY_STATION":
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(stationsData[i].lat, stationsData[i].lng),
                    icon: subwayStationImage,
                    map: this.map
                  })
                  break;
                case "TICKET_OFFICE":
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(stationsData[i].lat, stationsData[i].lng),
                    icon: sticketOfficeImage,
                    map: this.map
                  })
                  break;
              }
              let stationName = stationsData[i].name
              let stationID = stationsData[i].id
              marker.addListener('click', () => {
                this.stationSelectedDetails = true
                this.stationSelected.name = stationName
                this.stationSelected.id = stationID
              });
              this.stations.push(marker)
            }
          }
        }
      } else {
        for(let i=0; i<this.stations.length; i++){
          this.stations[i].setMap(null);
        }
        this.stations = []
      }
    },
    stationDetailsRefresh(station) {
      this.callerStationDetails(station)
      clearInterval(this.refreshStation);
      this.refreshStation = setInterval(() => {
        const callSTB = new XMLHttpRequest();
        callSTB.open(
          "GET",
          "https://info.stbsa.ro/rp/api/lines/stops/" + station + "?lang=ro",
          true
        );
        callSTB.send();
        callSTB.onload = () => {
          let response = JSON.parse(callSTB.responseText);
          this.stationSelected.lines.data = response.lines;
        };
      }, 15000);
    },
    callerStationDetails(station) {
      const callSTB = new XMLHttpRequest();
      callSTB.open(
        "GET",
        "https://info.stbsa.ro/rp/api/lines/stops/" + station + "?lang=ro",
        true
      );
      callSTB.send();
      callSTB.onload = () => {
        let response = JSON.parse(callSTB.responseText);
        this.stationSelected.lines.keys = Object.keys(response.lines);
        this.stationSelected.lines.data = response.lines;
      };
    },
    stationDetailsTime(arriving_time) {
      if (arriving_time !== null) {
        var h = Math.floor(arriving_time / 3600);
        var m = Math.floor((arriving_time % 3600) / 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " hrs ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "0 min";
        return hDisplay + mDisplay;
      } else {
        return "No Service";
      }
    },
    stationSelectedDetailsClose() {
      this.stationSelected.lines.keys = []
      this.stationSelected.lines.data = null
      this.stationSelectedDetails = false
    },
    subwayStations() {
      firebase
        .database()
        .ref("MetroStation")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.subway.keys = keys;
          this.subway.data = myObj;
        });
    },
    linesLoader() {
      firebase
        .database()
        .ref("Lines/")
        .on("value", snap => {
          let myObj = snap.val();
          this.lines.data = myObj
          let keys = Object.keys(snap.val());
          this.lines.keys = keys
        });
    }, 
    lineDetailsRefresh(id, direction, centerLat, centerLng, centerZoom, lineColor, lineNumber, lineIcon, lineType, lineDirectionName) {
      for(let i=0; i<this.stations.length; i++){
        this.stations[i].setMap(null);
      }
      this.stations = []
      this.drawer = false
      this.map = null
      this.defaultLocation = {
        lat: centerLat,
        lng: centerLng
      }
      this.selectedLineDetails.number = lineNumber
      this.selectedLineDetails.direction = lineDirectionName
      this.selectedLineDetails.color = lineColor
      this.selectedLineDetails.icon = lineIcon
      this.selectedLineDetails.type = lineType
      this.zoom = centerZoom
      this.drawerReturn = true
      this.createLinesMap()
      this.callerLineDetails(id,direction,lineColor)
      clearInterval(this.refreshLines)
      this.refreshLines = setInterval(() => {
      let vehicles = []
      const callSTB = new XMLHttpRequest();
      callSTB.open("GET", "https://info.stbsa.ro/rp/api/lines/"+id+"/vehicles/"+direction+"?lang=ro", true);
      callSTB.send()
      callSTB.onload = () => {
        vehicles = JSON.parse(callSTB.responseText)
        if(vehicles !== null)
        {
          for(i=0; i<this.vehicleList.length; i++){
            this.vehicleList[i].setMap(null);
          }
          this.vehicleList = []
          let infowindow = new google.maps.InfoWindow();
          let i;
          var image = {
            url: require('@/assets/vehicles/tram.png')
          }
          for (i = 0; i < vehicles.length; i++) {
            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(vehicles[i].lat, vehicles[i].lng),
              icon: image,
              map: this.map
            });
            this.vehicleList.push(marker)
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<span style="font-weight: 500;">' + vehicles[i].id + '</span>');
                infowindow.open(this.map, marker);
              }
            })(marker, i));
          }
        }
      }
      }, 7000);
    },
    callerLineDetails(id, direction, lineColor) {
      let vehicles = []
      const callSTB = new XMLHttpRequest();
      callSTB.open("GET", "https://info.stbsa.ro/rp/api/lines/"+id+"/vehicles/"+direction+"?lang=ro", true);
      callSTB.send()
      callSTB.onload = () => {
        vehicles = JSON.parse(callSTB.responseText);
        if(vehicles !== null)
        {
          for(i=0; i<this.vehicleList.length; i++){
            this.vehicleList[i].setMap(null);
          }
          this.vehicleList = []
          let infowindow = new google.maps.InfoWindow();
          let i;
          var image = {
            url: require('@/assets/vehicles/tram.png')
          }
          for (i = 0; i < vehicles.length; i++) {
            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(vehicles[i].lat, vehicles[i].lng),
              icon: image,
              map: this.map
            });
            this.vehicleList.push(marker)
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<span style="font-weight: 500;">' + vehicles[i].id + '</span>');
                infowindow.open(this.map, marker);
              }
            })(marker, i));
          }
        }
      }
      //Load path of the line and the stations
      let lineDirection
      const callSTBDirection = new XMLHttpRequest();
      callSTBDirection.open("GET", "https://info.stbsa.ro/rp/api/lines/"+id+"/direction/"+direction+"?lang=ro", true);
      callSTBDirection.send()
      callSTBDirection.onload = () => {
        lineDirection = JSON.parse(callSTBDirection.responseText);
        let stops = lineDirection.stops
        if(stops !== null)
        {
          for(i=0; i<this.stopsList.length; i++){
            this.stopsList[i].setMap(null);
          }
          this.stopsList = []
          let infowindow = new google.maps.InfoWindow();
          let i;
          var image = {
            url: require('@/assets/vehicles/station-backup.png'),
            scaledSize: new google.maps.Size(15, 15),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(7, 7)
          }
          let encodedPath = lineDirection.segment_path
          let decodedPoints = google.maps.geometry.encoding.decodePath(encodedPath) ;
          let encodedPolyline = new google.maps.Polyline ( {
                        strokeColor: lineColor,
                        strokeOpacity: 1.0 ,
                        strokeWeight: 5 ,
                        path: decodedPoints ,
                        clickable: false
          } );
          encodedPolyline.setMap(this.map)

          for (i = 0; i < stops.length; i++) {
            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(stops[i].lat, stops[i].lng),
              icon: image,
              map: this.map
            });
            this.stopsList.push(marker)
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<span style="font-weight: 500;">' + stops[i].name + '</span>');
                infowindow.open(this.map, marker);
              }
            })(marker, i));
          }
        }
      }
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
    },
    close() {
      for(let i=0; i<this.stations.length; i++){
        this.stations[i].setMap(null);
      }
      this.stations = []
      this.vehicleList = []
      this.stopsList = []
      clearInterval(this.refreshLines)
      this.drawerReturn = false
      this.map = null
      this.geolocate()
      this.selectedLineDetails.number = null
      this.selectedLineDetails.direction = null
      this.selectedLineDetails.color = null
      this.selectedLineDetails.icon = null
      this.selectedLineDetails.type = null
      this.zoom = 16
      this.drawer = true
      this.createMap()
    }
  },

  beforeDestroy() {
    clearInterval(this.refreshStation);
    clearInterval(this.refreshLines);
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

.gps-custom-button {
  position: absolute;
  right: 0.5vw;
  bottom: 3vh;
}

.align-self-center {
  align-self: center;
}

.display-flex {
  display: flex;
}

.justify-self-center {
  justify-self: center;
}

.custom-info-wrapper {
  width: 100%;
  height: 70vh;
}

.custom-station-info {
  width: 100%;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.custom-card-grid {
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: grid;
  grid-template-columns: 0.8fr 5fr 2fr;
}

.custom-line-number {
  padding: 0px;
  margin-bottom: 0px !important;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
  font-size: 0.9rem;
  color: inherit;
}

.custom-arrival-wrapper {
  align-self: center;
  justify-self: end;
  margin-right: 15px;
}

.card-info-time {
  font-size: 1rem;
  font-weight: 700;
}

.custom-station-name-title {
  display: flex;
  justify-content: center;
  width: 100%;
}

.station-name {
  font-weight: 600;
  font-size: 1rem;
  margin-left: 8px;;
}

.feed-animation {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  align-self: baseline;
  margin-top: 2px;
}

.live-feed-animation-1 {
  animation: liveFeed 5000ms ease-in-out 1200ms infinite normal none running;
}

.live-feed-animation-2 {
  animation: liveFeed 5000ms ease-in-out 1300ms infinite normal none running;
}

@keyframes liveFeed {
  0%,
  18%,
  22%,
  28%,
  32% {
    opacity: 1;
  }
  20%,
  30% {
    opacity: 0.2;
  }
}

.custom-capacity-indicator-card {
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2vh;
}

.custom-capacity-indicator-title-grid {
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.custom-capacity-indicator-content-wrapper {
  display: block;
  height: 5.4rem;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 1 rem;
}

.capacity-indicator-line {
  font-weight: 800;
  font-size: 1rem !important;
  align-self: center;
  justify-self: start;
  margin-left: 0.8vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
  padding-right: 0px;
}

.capacity-indicator-direction {
  font-weight: 700;
  font-size: 1rem !important;
  color: rgba(0, 0, 0, 0.87);
}

.capacity-indicator-arrival-wrapper {
  font-weight: 800;
  font-size: 1rem !important;
  align-self: center;
  justify-self: end;
  margin-right: 0.8vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
  padding-right: 0px;
}

.capacity-indicator-arrival {
  margin-right: 0.5rem;
}

.capacity-indicator-arrival-time {
  font-weight: 800;
  font-size: 1rem !important;
}

.capacity {
  height: 80%;
  background: url("../assets/capacityIndicator/train.svg") -1px -1px no-repeat,
    #23282d;
  background-size: auto calc(100% + 2px);
  text-align: right;
  animation: slide 2s 0s linear 1;
  margin-left: 1rem;
}

@keyframes slide {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.carriage {
  width: 14%;
  height: 2.9rem;
  margin-top: 0.7rem;
  margin-right: 0.7rem;
  padding: 0.2rem 0;
  vertical-align: bottom;
}

.carriage.low {
  background: #82af5d;
}

.carriage.medium {
  background: #f5bc28;
}

.carriage.high {
  background: #df2f1f;
}

.custom-station-wrapper {
  padding: 10px 0px 10px 0px!important;
}

.custom-lines-menu-wrapper {
  align-self: center;
  overflow-y: auto;
  width: 20vw !important;
  height: 100% !important;
}

.custom-expansion-panel-dropdown {
  text-align: -webkit-center;
}

.custom-expansion-panel-header {
  text-align: -webkit-left;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 0px;
}


.custom-line {
  align-self: center;
  flex: none !important;
}

.custom-line-number {
  padding: 0px;
  margin-bottom: 0px !important;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
  font-size: 0.9rem;
  color: inherit;
}

.custom-direction-button {
  height: auto !important;
  max-width: 225px;
  min-height: 5vh;
}

.custom-direction-text {
  margin-bottom: 5px;
  margin-top: 5px;
  max-width: 205px;
  white-space: normal;
}
</style>