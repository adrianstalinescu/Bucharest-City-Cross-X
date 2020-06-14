<template>
  <div class="map-wrapper">
    <div id="map" />
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
    <v-dialog persistent scrollable v-model="stationSelectedDetails" width="60vw">
      <v-card class="custom-info-wrapper">
        <v-card-text class="custom-station-wrapper">
          <div class="custom-station-name-title">
            <v-chip color="#D95033" >
              <v-icon color="white" size="20">mdi-bus-stop-covered</v-icon>
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
                <img v-if="stationSelected.lines.data[lk].type === 'CABLE_CAR'" class="display-flex justify-self-center" width="34px" height="34px" src="@/assets/vehicles/trolleybus.svg"/>
                <v-icon
                  v-if="stationSelected.lines.data[lk].type === 'TRAM'"
                  size="38"
                  :color="stationSelected.lines.data[lk].color"
                >mdi-tram</v-icon>
                <div class="align-self-center">
                  <v-chip :color="stationSelected.lines.data[lk].color" class="ml-1">
                    <span class="custom-line-number">{{stationSelected.lines.data[lk].name}}</span>
                    <v-icon size="28" color="white">mdi-chevron-right</v-icon>
                    <span class="custom-line-number">{{stationSelected.lines.data[lk].direction_name}}</span>
                  </v-chip>
                </div>
                <v-chip :color="stationSelected.lines.data[lk].color" class="custom-arrival-wrapper">
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
                <v-chip :color="subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Color" class="capacity-indicator-arrival-wrapper">
                  <span class="capacity-indicator-arrival">Arrival</span>
                  <v-chip color="white" outlined>
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
                      src="@/assets/capacityIndicator/capacity-low.svg"
                    />
                    <img
                      v-if="subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Capacity[c] === 'medium'"
                      class="carriage medium"
                      src="@/assets/capacityIndicator/capacity-medium.svg"
                    />
                    <img
                      v-if="subway.data[stationSelected.name][stationSelected.lines.data[lk].direction_name].Capacity[c] === 'high'"
                      class="carriage high"
                      src="@/assets/capacityIndicator/capacity-high.svg"
                    />
                  </span>
                </div>
              </div>
              <v-divider class="ma-2"></v-divider>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-row justify="space-around" class="ma-1">
            <v-btn
              rounded
              small
              dark
              color="#D95033"
              elevation="0"
              @click="stationSelectedDetailsClose()"
            >
              <v-icon dark size="25">mdi-arrow-left</v-icon>
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
export default {
  name: "Nearby",
  data() {
    return {
      defaultLocation: {
        lat: 44.4268006,
        lng: 26.1025036
      },
      zoom: 16,
      map: null,
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
    },
    bounds: {
      deep: true,
      immediate: false,
      handler(newLocation) {
        if (newLocation) {
            this.callerStations()
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
    }
  },

  mounted() {
    this.createMap();
    this.geolocate();
    this.subwayStations();
  },

  methods: {
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
            let ticketOfficeImage = {
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
                    icon: ticketOfficeImage,
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
    }
  },

  beforeDestroy() {
    clearInterval(this.refreshStation);
  }
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
  color: white;
}

.custom-arrival-wrapper {
  align-self: center;
  justify-self: end;
  margin-right: 15px;
}

.card-info-time {
  font-size: 1rem;
  font-weight: 700;
  color: white;
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
  color: white;
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
  color: white;
}

.capacity-indicator-direction {
  font-weight: 700;
  font-size: 1rem !important;
  color: white;
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
  color: white;
}

.capacity-indicator-arrival-time {
  font-weight: 800;
  font-size: 1rem !important;
}

.capacity {
  height: 80%;
  background: url("../../../assets/capacityIndicator/train.svg") -1px -1px no-repeat,
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
</style>