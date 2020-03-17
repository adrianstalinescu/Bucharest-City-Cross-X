<template>
  <div class="lines-wrapper">
    <h4 style="display:none">{{ linesLoader }}</h4>
    <v-card class="custom-lines-menu-wrapper" outlined elevation="0">
      <v-expansion-panels multiple accordion class="custom-lines-menu">
        <v-expansion-panel
          v-for="lk in linesKeys"
          :key="lk"
          >
          <v-expansion-panel-header class="pa-2">
            <div class="custom-expansion-panel-header">
              <v-icon :color="lines[lk].Color" size="30">{{lines[lk].Icon}}</v-icon>
              <v-chip small :color="lines[lk].Color" class="ml-1" outlined>
                <span class="custom-line-number">{{lines[lk].Type}}</span>
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
                  @click="autoRefresh(lines[lk].ID, 0, lines[lk].CenterLat, lines[lk].CenterLng, lines[lk].CenterZoom, lines[lk].Color)"
                >
                  <span class="custom-direction-text">{{lines[lk].T1}}</span>
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
                  @click="autoRefresh(lines[lk].ID, 1, lines[lk].CenterLat, lines[lk].CenterLng, lines[lk].CenterZoom, lines[lk].Color)"
                >
                  <span class="custom-direction-text">{{lines[lk].T2}}</span>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <div class="custom-map-wrapper">
      <div id="map" />
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "Lines",
  data() {
    return {
      refresh: '',
      linesKeys: [],
      lines: null,
      defaultLocation: {
        lat: 44.4268006,
        lng: 26.1025036,
        zoom: 16
      },
      map: null,
      markers: [],
      stations: []
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

  mounted() {
    this.createMap();
  },

  computed: {
    linesLoader() {
      firebase
        .database()
        .ref("Lines/")
        .on("value", snap => {
          let myObj = snap.val();
          this.lines = myObj
          let keys = Object.keys(snap.val());
          this.linesKeys = keys
        });
    } 
  },

  methods: {
    initialize(data) {
      this.map = data.map;
      this.google = data.google;
    },
    createMap() {
      let myLatLng = new window.google.maps.LatLng(
        this.defaultLocation.lat,
        this.defaultLocation.lng
      );
      let z = this.defaultLocation.zoom
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
    autoRefresh (id, direction, centerLat, centerLng, centerZoom, lineColor) {
      this.defaultLocation = {
        lat: centerLat,
        lng: centerLng,
        zoom: centerZoom
      }
      this.callerSTB(id,direction,lineColor)
      clearInterval(this.refresh)
      this.refresh = setInterval(() => {
      let vehicles = []
      const callSTB = new XMLHttpRequest();
      callSTB.open("GET", "https://info.stbsa.ro/rp/api/lines/"+id+"/vehicles/"+direction+"?lang=ro", true);
      callSTB.send()
      callSTB.onload = () => {
        vehicles = JSON.parse(callSTB.responseText)
        if(vehicles !== null)
        {
          for(i=0; i<this.markers.length; i++){
            this.markers[i].setMap(null);
          }
          this.markers = []
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
            this.markers.push(marker)
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
    callerSTB(id, direction, lineColor) {
      let vehicles = []
      const callSTB = new XMLHttpRequest();
      callSTB.open("GET", "https://info.stbsa.ro/rp/api/lines/"+id+"/vehicles/"+direction+"?lang=ro", true);
      callSTB.send()
      callSTB.onload = () => {
        vehicles = JSON.parse(callSTB.responseText);
        if(vehicles !== null)
        {
          for(i=0; i<this.markers.length; i++){
            this.markers[i].setMap(null);
          }
          this.markers = []
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
            this.markers.push(marker)
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
          for(i=0; i<this.stations.length; i++){
            this.stations[i].setMap(null);
          }
          this.stations = []
          let infowindow = new google.maps.InfoWindow();
          let i;
          var image = {
            url: require('@/assets/vehicles/station.png'),
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
            this.stations.push(marker)
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<span style="font-weight: 500;">' + stops[i].name + '</span>');
                infowindow.open(this.map, marker);
              }
            })(marker, i));
          }
        }
      }
    }
  },

  beforeDestroy () {
    clearInterval(this.refresh)
  },

};
</script>

<style scoped>
.custom-map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
}

#map {
  height: 100%;
  width: 100%;
}

.lines-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  background: url("https://picsum.photos/1920/1080?random");
}

.custom-lines-menu-wrapper {
  align-self: center;
  overflow-y: auto;
  width: 28vw;
  height: 100%;
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

.custom-expansion-panel-dropdown {
  text-align: -webkit-center;
}

.custom-expansion-panel-header {
  text-align: -webkit-left;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 0px;
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