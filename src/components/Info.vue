<template>
  <div class="map-wrapper">
    <div id="map" />
    <div v-if="this.linesReturn" class="transit-background"></div>
    <div v-if="this.linesReturn" class="custom-subway-wrapper">
        <div class="custom-subway-card">
            <v-chip
            v-for="m in subway.keys"
            :key="m"
            class="ma-2 custom-subway-chip"
            :color="subway.data[m].Color"
            outlined
            >
            <div class="custom-chip-content-wrapper">
                <span class="custom-subway-text">{{m}}</span>
                <v-icon class="custom-subway-text">mdi-chevron-right</v-icon>
                <span class="custom-subway-text-status">{{subway.data[m].Status}}</span>
            </div>
            </v-chip>
        </div>
    </div>
    <div v-if="this.linesReturn" class="custom-lines-menu-wrapper">
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
    </div>
    <div v-if="!this.linesReturn" class="custom-line-info-window-wrap">
      <div class="mt-2">
        <v-chip :color="selectedLineDetails.color" close class="px-5" dark @click:close="close">
          <v-icon left size="30" class="mr-1">{{selectedLineDetails.icon}}</v-icon>
          <span class="custom-line-number mr-2">{{selectedLineDetails.type}}:</span>
          <span class="custom-line-number">{{selectedLineDetails.number}}</span>
          <v-icon size="19">mdi-chevron-right</v-icon>
          <span class="custom-line-number">{{selectedLineDetails.direction}}</span>
        </v-chip>
      </div>
    </div>
    <router-link  v-if="this.linesReturn" :to="'transit'" class="custom-router-link-transparency">
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
export default {
  name: "Info",
  data() {
    return {
        linesReturn: true,
        defaultLocation: {
            lat: 44.4268006,
            lng: 26.1025036
        },
        zoom: 16,
        map: null,
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

  mounted() {
    this.linesLoader();
    this.metroStatus();
  },

  methods: {
    metroStatus() {
      firebase
        .database()
        .ref("MetroLine")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.subway.keys = keys;
          this.subway.data = myObj;
        });
    },
    initialize(data) {
      this.map = data.map;
      this.google = data.google;
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
      this.linesReturn = false
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
    close() {
      this.vehicleList = []
      this.stopsList = []
      clearInterval(this.refreshLines)
      this.linesReturn = true
      this.map = null
      this.selectedLineDetails.number = null
      this.selectedLineDetails.direction = null
      this.selectedLineDetails.color = null
      this.selectedLineDetails.icon = null
      this.selectedLineDetails.type = null
      this.zoom = 16
    }
  },

  beforeDestroy() {
    clearInterval(this.refreshLines);
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
    background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(42,128,157,0.7399334733893557) 45%, rgba(30,109,135,1) 100%);
  top: 0;
}
#map {
  height: 100%;
  width: 100%;
}

.transit-background{
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #27aae1 0%, rgb(42,128,157) 45%, rgb(30,109,135) 100%);
    position:absolute;
    top: 0;
}

.custom-subway-wrapper {
    position: absolute;
    top: 0;
    left: 20vw;
  display: flex;
  height: 9vh;
  justify-content: center;
}

.custom-subway-card {
  align-self: flex-end;
  height: auto;
  display: flex;
  font-weight: 800;
  background: rgba(255,255,255, 0.9);
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  border-radius: 50px;
}

.custom-subway-chip {
  height: 5vh !important;
  width: 13.5vw !important;
  padding: 0px !important;
}

.custom-chip-content-wrapper {
  width: 13vw;
  justify-content: center;
  display: flex;
}

.custom-subway-text {
  font-size: 2.5vh;
}

.custom-subway-text-status {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87) !important;
  font-size: 2.5vh;
}

.custom-back-button {
  position: absolute;
  top: 2vh;
  left: 1.5vw;
}

.custom-line-info-window-wrap {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
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

.custom-lines-menu-wrapper {
  position:absolute;
  top: 11vh;
  align-self: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
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