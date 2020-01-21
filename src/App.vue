<template>
  <v-app id="app">
    <v-content>
      <div class="custom-wrap">
        <v-card elevation="2" class="search-card-custom">
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
            full-width
            class="search-field-custom"
          ></v-text-field>
        </v-card>
        <v-card elevation="2" class="service-status-card-custom">
          <v-navigation-drawer floating permanent>
            <v-list dense rounded color="white" class="service-status">
              <v-row style="margin-bottom: -1.6vh;">
                <v-col cols="6" md="3">
                  <v-avatar size="35" color="#ffce00">
                    <strong>M1</strong>
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="8">
                  <div class="service-status-info">
                    <v-chip color="success" outlined>
                      <h4 id="MetroStatus1"></h4>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -1.6vh;">
                <v-col cols="6" md="3">
                  <v-avatar size="35" color="blue">
                    <strong>M2</strong>
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="8">
                  <div class="service-status-info">
                    <v-chip color="warning" outlined>
                      <h4 id="MetroStatus2"></h4>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -1.6vh;">
                <v-col cols="6" md="3">
                  <v-avatar size="35" color="red">
                    <strong>M3</strong>
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="8">
                  <div class="service-status-info">
                    <v-chip color="error" outlined>
                      <h4 id="MetroStatus3"></h4>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" md="3">
                  <v-avatar size="35" color="#05a841">
                    <strong>M4</strong>
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="8">
                  <div class="service-status-info">
                    <v-chip color="error" outlined>
                      <h4 id="MetroStatus4"></h4>
                      <h4 style="display:none"> {{ metroStatus }} </h4>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <v-card elevation="2" class="navigation-buttons-card-custom">
          <v-navigation-drawer floating permanent style="margin-left:auto; margin-right:auto;">
            <v-dialog v-model="dialogLogin" persistent max-width="40vw">
              <template v-slot:activator="{ on }">
                <v-card-actions class="justify-center" style="margin-top:5px;">
                  <v-btn color="#4bbd6a" v-on="on">
                    <v-icon style="margin-right:7px;">mdi-tram-side</v-icon>Join Transit
                  </v-btn>
                </v-card-actions>
              </template>
              <v-card>
                <v-card-title class="justify-center" style="color:green;">
                  <span class="headline" centered>Transit the City</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="Email*" required color="green"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Password*" type="password" required color="green"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row class="justify-center">
                      <v-dialog v-model="dialogRegister" persistent max-width="40vw">
                        <template v-slot:activator="{ on }">
                          <v-card-actions class="justify-center" style="margin-top:5px;">
                            <v-btn
                              color="#4bbd6a"
                              @click=" dialogRegister = true, dialogLogin = false"
                            >
                              <v-icon style="margin-right:7px;">mdi-account-plus</v-icon>Create Account
                            </v-btn>
                          </v-card-actions>
                        </template>
                        <v-card>
                          <v-card-title class="justify-center" style="color:green;">
                            <span class="headline">Let's create a new account</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Email*"
                                    type="email"
                                    required
                                    prepend-icon="mdi-email"
                                    color="green"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Password*"
                                    type="password"
                                    required
                                    prepend-icon="mdi-key"
                                    color="green"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Name"
                                    type="text"
                                    required
                                    prepend-icon="mdi-account-card-details-outline"
                                    color="green"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Surname"
                                    type="text"
                                    required
                                    prepend-icon="mdi-account-card-details-outline"
                                    color="green"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-select
                                    :items="gender"
                                    label="Gender"
                                    outlined
                                    color="green"
                                    prepend-icon="mdi-account-card-details-outline"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Phone"
                                    type="text"
                                    required
                                    prepend-icon="mdi-phone"
                                    color="green"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        v-model="date"
                                        label="Birthday date"
                                        readonly
                                        prepend-icon="mdi-calendar"
                                        v-on="on"
                                        color="green"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      ref="picker"
                                      v-model="date"
                                      :max="new Date().toISOString().substr(0, 10)"
                                      min="1950-01-01"
                                      color="green lighten-1"
                                      @change="save"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                              color="grey"
                              width="5vw"
                              @click="dialogRegister = false, dialogLogin = true"
                            >Close</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="#4bbd6a"
                              width="5vw"
                              @click="dialogRegister = false"
                            >Sign up</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </v-container>
                  <v-container>
                    <v-row class="justify-center">
                      <a
                        href="#"
                        style="font-size:1.1em;"
                        @click="dialogResetPassword = true, dialogLogin = false"
                      >Forgot your password?</a>
                      <v-dialog v-model="dialogResetPassword" persistent max-width="40vw">
                        <v-card>
                          <v-card-title class="justify-center" style="color:green;">
                            <span class="headline">Lost midway transit? Let's fix this</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Email*"
                                    type="email"
                                    required
                                    prepend-icon="mdi-email"
                                    color="green"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                              color="grey"
                              width="5vw"
                              @click="dialogResetPassword = false, dialogLogin = true"
                            >Close</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="#4bbd6a"
                              width="5vw"
                              @click="dialogResetPassword = false"
                            >Login</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="grey" width="5vw" @click="dialogLogin = false">Close</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="#4bbd6a" width="5vw" @click="dialogLogin = false">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-list dense rounded color="white">
              <div v-for="item in items" :key="item.title" class="text-center">
                <v-btn
                  v-if="!item.isUserLoggedIn"
                  rounded
                  large
                  depressed
                  text
                  color="#8fc9b0"
                  width="10vw"
                  style="padding-top:0.2vh; margin-bottom: 1vh;"
                  @click="navigationDrawer(item)"
                >
                  <v-list-item style="margin-left:-10px;">
                    <v-list-item-icon>
                      <v-icon style="font-size:2.2em;">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content style="text-align: left">
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-btn>
              </div>
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <!--Navigation Drawer-->
        <v-dialog v-model="dialogStations" persistent max-width="25vw">
          <v-card>
            <v-card-title>
              <span class="headline">Stations</span>
            </v-card-title>
            <div>
              <v-col cols="10" class="center">
                <v-select :items="stations" label="Station" outlined></v-select>
              </v-col>
            </div>
            <div style="height: 40vh;">
              <div style="max-height: 100%; position:relative; overflow:auto;">
                <div style="height: 12vh; margin-bottom:1vh;">
                  <v-card class="mx-auto" max-width="380" outlined style="margin-bottom:1vh;">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Tram 41</v-list-item-title>
                        <v-list-item-subtitle style="font-size:1em;">Piata Presei - Ghencea</v-list-item-subtitle>
                        <v-list-item-subtitle style="font-size:1.4em; color: #29a11b;">
                          3 min
                          <sup>
                            <v-icon size="18" color="#f5a02a">mdi-rss</v-icon>
                          </sup>
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar size="80">
                        <v-icon size="70" color="red">mdi-tram</v-icon>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </div>
                <div style="height: 12vh; margin-bottom:1vh;">
                  <v-card class="mx-auto" max-width="380" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Bus 335</v-list-item-title>
                        <v-list-item-subtitle style="font-size:1em;">Baneasa - Faur</v-list-item-subtitle>
                        <v-list-item-subtitle style="font-size:1.4em; color: #29a11b;">
                          1 min
                          <sup>
                            <v-icon size="18" color="#f5a02a">mdi-rss</v-icon>
                          </sup>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-avatar size="80">
                        <v-icon size="70" color="red">mdi-bus</v-icon>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </div>
                <div style="height: 12vh; margin-bottom:1vh;">
                  <v-card class="mx-auto" max-width="380" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Trolleybus 69</v-list-item-title>
                        <v-list-item-subtitle style="font-size:1em;">Gara de Nord - Vatra Luminoasa</v-list-item-subtitle>
                        <v-list-item-subtitle style="font-size:1.4em; color: #29a11b;">
                          10 min
                          <sup>
                            <v-icon size="18" color="#f5a02a">mdi-rss</v-icon>
                          </sup>
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar size="80">
                        <v-icon size="70" color="red">mdi-bus</v-icon>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </div>
              </div>
            </div>
            <v-card-actions>
              <v-btn color="grey" width="5vw" @click="dialogStations = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogLines" persistent max-width="40vw">
          <v-card>
            <v-card-title>
              <span class="headline">Lines</span>
            </v-card-title>
            <!-- wip -->
            <v-card-actions>
              <v-btn color="grey" width="5vw" @click="dialogLines = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div id="map"></div>
      <div class="gps-custom-button" @click="geolocate()">
        <v-btn class="mx-2" fab dark color="#269e46">
          <v-icon dark>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "@/firebase"
/* eslint-disable */
export default {
  name: "App",
  data() {
    return {
      defaultLocation: {},
      drawer: 0,
      dialogLogin: false,
      dialogRegister: false,
      dialogStations: false,
      dialogLines: false,
      dialogResetPassword: false,
      searchInput: "",
      valueDeterminate: 100,
      stations: [
        {
          text: "Piata Unirii"
        },
        {
          text: "Piata Victoriei"
        },
        {
          text: "Piata Romana"
        }
        ],
        gender: [
          {
            text: "Male"
          },
          {
            text: "Female"
          }
        ],
      items: [
        {
          icon: "mdi-account-circle",
          text: "My Account",
          isUserLoggedIn: true
        },
        { icon: "mdi-subway", text: "Stations", isUserLoggedIn: false },
        {
          icon: "mdi-map-marker-distance",
          text: "Lines",
          isUserLoggedIn: false
        },
        { icon: "mdi-credit-card-scan", text: "Wallet", isUserLoggedIn: true },
        {
          icon: "mdi-credit-card-outline",
          text: "Payments",
          isUserLoggedIn: true
        },
        // { icon: 'mdi-settings' , text: 'Settings' },
        { icon: "mdi-logout", text: "Sign Out", isUserLoggedIn: true }
      ],
      date: null,
      menu: false,
    };
  },
  created() {
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    defaultLocation: {
        deep: true,
        immediate: true,
        handler (newLocation) {
          if (newLocation && this.defaultLocation) {
            this.createMap();
          }
        }
    }
  },
  computed: {
    metroStatus () {
      setInterval(()=> {
         firebase.database().ref('MetroStatus')
         .on('value', snap => {
            document.getElementById("MetroStatus1").innerHTML = snap.val()[Math.floor((Math.random() * 4))]
            document.getElementById("MetroStatus2").innerHTML = snap.val()[Math.floor((Math.random() * 4))]
            document.getElementById("MetroStatus3").innerHTML = snap.val()[Math.floor((Math.random() * 4))]
            document.getElementById("MetroStatus4").innerHTML = snap.val()[Math.floor((Math.random() * 4))]
          })
        
        }, 10000);
      return true
    }
  },
  mounted () {
    this.geolocate();
    this.createMap();
  },
  methods: {
    initialize(data) {
        this.map = data.map
        this.google = data.google

        this.askGeolocation()
      },
    navigationDrawer(item) {
      switch (item.text) {
        case "Stations":
          this.dialogStations = true;
          break;
        case "Lines":
          this.dialogLines = true;
          break;
      }
    },
    save (date) {
      this.$refs.menu.save(date)
    },
     geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.defaultLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
     },
     createMap: function(){
      let myLatLng = {lat: this.defaultLocation.lat, lng: this.defaultLocation.lng};
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 16,
        options: { 
      disableDefaultUI: true,
      enableHighAccuracy: true,
      styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
     ]
     }
    }
    )
    var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Your Position'
  })
  }
  //new method insert here
  }
}
</script>
<style scoped>
.custom-wrap {
  position: fixed;
  z-index: 100;
}
#map {
  height: 100%;
  width: 100%;
}
.search-card-custom {
  width: 450px;
  margin-left: 1vw;
  margin-top: 2vh;
}
.service-status-card-custom {
  width: 220px;
  margin-left: 1vw;
  margin-top: 1.5vh;
}
.service-status {
  margin-left: 0.4vw;
}
.navigation-buttons-card-custom {
  width: 220px;
  margin-left: 1vw;
  margin-top: 1.5vh;
}
.search-field-custom {
  font-size: 1.2em;
}
.service-status-info {
  font-size: 1em;
  padding-top: 0.1em;
}
.gps-custom-button {
  position: absolute;
  right: 0.5vw;
  bottom: 3vh;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.stations-information-wrapper {
  height: 35vh;
}
</style>