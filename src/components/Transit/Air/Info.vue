<template>
  <div>
    <div class="custom-clock-wrapper">
        <span class="custom-clock">{{this.time}}</span>
    </div>
    <div class="custom-arrival-title-wrapper">
        <v-chip outlined class="custom-arrival-title" color="#D95033">Arrivals</v-chip>
    </div>
    <div class="custom-departures-title-wrapper">
        <v-chip outlined class="custom-departures-title" color="success">Departures</v-chip>
    </div>
    <div class="custom-arrival-table">
        <v-data-table
            :headers="headersArrivals"
            :items="arrivals"
            :items-per-page="9"
            :footer-props="footer_props"
            class="elevation-1 table-width"
        >
        <template v-slot:item.airline="{ item }">
            <v-chip v-if="item.airline === 'Wizz Air'" color="#c8007c" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Lufthansa'" color="#f9ba00" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Ryanair'" color="#2B4779" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Aeroflot'" color="#c2cae3" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'TAROM'" color="#CE1126" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Blue Air'" color="#4D6BA5" dark>{{ item.airline }}</v-chip>
            <v-chip v-else color="#a6a6a6" dark>{{ item.airline }}</v-chip>
        </template>
        </v-data-table>
    </div>
    <div class="custom-departures-table">
        <v-data-table
            :headers="headersDepartures"
            :items="departures"
            :items-per-page="9"
            :footer-props="footer_props"
            class="elevation-1 table-width"
        >
        <template v-slot:item.airline="{ item }">
            <v-chip v-if="item.airline === 'Wizz Air'" color="#c8007c" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Lufthansa'" color="#f9ba00" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Ryanair'" color="#2B4779" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Aeroflot'" color="#c2cae3" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'TAROM'" color="#CE1126" dark>{{ item.airline }}</v-chip>
            <v-chip v-else-if="item.airline === 'Blue Air'" color="#4D6BA5" dark>{{ item.airline }}</v-chip>
            <v-chip v-else color="#a6a6a6" dark>{{ item.airline }}</v-chip>
        </template>
        </v-data-table>
    </div>
    <router-link :to="'transit-air'" class="custom-router-link-transparency">
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
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import firebase from "@/firebase";
Vue.use(VueAxios, Axios);
export default {
  name: "Info",
  data() {
    return {
        footer_props: {
            "items-per-page-options": [9],
            "items-per-page-text": null,
            "disable-items-per-page": true
        },
        headersArrivals: [
            {
            text: 'Flight',
            align: 'start',
            sortable: false,
            value: 'flight',
            },
            { text: 'Time', value: 'time' },
            { text: 'Airline', value: 'airline' },
            { text: 'Origin', value: 'origin' },
            { text: 'Status', value: 'status' },
        ],
        headersDepartures: [
            {
            text: 'Flight',
            align: 'start',
            sortable: false,
            value: 'flight',
            },
            { text: 'Time', value: 'time' },
            { text: 'Airline', value: 'airline' },
            { text: 'Destination', value: 'destination' },
            { text: 'Status', value: 'status' },
        ],
        arrivals: [],
        departures: [],
        time: null
    };
  },

  mounted() {
      this.airportData();
      this.startTime();
  },

  methods: {
    airportData() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let hs = today.getHours()-12;
        let he = today.getHours();
        let mi = today.getMinutes();
        mi = this.checkTime(mi);
        hs = this.checkTime(hs);
        he = this.checkTime(he);
      
        let loadFrom =  yyyy + '-' + mm + '-' + dd + 'T' + hs + ':' + mi;
        let loadTo =  yyyy + '-' + mm + '-' + dd + 'T' + he + ':' + mi;
        console.log (loadFrom +"  --  " + loadTo)
      let subscriptionKey = "ad74b81838msh36523b284fdcd6ap1bc786jsnccf670756ad5"; //microsoft face api key
      let uriBase =
        "https://aerodatabox.p.rapidapi.com/flights/airports/icao/LROP/" + loadFrom + "/" + loadTo;

      Axios.get(
        uriBase,
        {
          headers: {
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"aerodatabox.p.rapidapi.com",
            "x-rapidapi-key":subscriptionKey,
            "useQueryString":true
          },
        }
      )
        .then((response) => {
            console.log(response)
            response.data.arrivals.forEach(key => {
                this.arrivals.push({
                    flight: key.number,
                    time: key.movement.scheduledTimeUtc.split(" ")[1].slice(0, -1),
                    airline: key.airline.name,
                    origin: key.movement.airport.name,
                    status: key.status
                })
            });
            response.data.departures.forEach(key => {
                this.departures.push({
                    flight: key.number,
                    time: key.movement.scheduledTimeUtc.split(" ")[1].slice(0, -1),
                    airline: key.airline.name,
                    destination: key.movement.airport.name,
                    status: key.status
                })
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    startTime() {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        this.time =
        h + ":" + m + ":" + s;
        this.refresh = setInterval(() => {
            let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = this.checkTime(m);
        s = this.checkTime(s);
        this.time =
        h + ":" + m + ":" + s;
        }, 1000);
    },
    checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
  },
  beforeDestroy() {
    clearInterval(this.refresh);
  }
};
</script>

<style scoped>
.custom-router-link-transparency {
  color: transparent;
  height: 25vh !important;
  align-self: center;
}

.custom-back-button {
  position: absolute;
  top: 2vh;
  left: 1.5vw;
}

.custom-arrival-table{
    position: absolute;
    left: 2vw;
    display: flex;
    height: 100%;
    width: 48vw;
    padding-top: 10vh;
    padding-bottom: 5vh;
    align-content: center;
    justify-content: center;
}

.custom-departures-table{
    position: absolute;
    right: 2vw;
    display: flex;
    height: 100%;
    width: 48vw;
    padding-top: 10vh;
    padding-bottom: 5vh;
    align-content: center;
    justify-content: center;
}

.table-width {
    width: 46vw;
    border-radius: 30px;
}

.custom-arrival-title-wrapper{
    width: 190px;
    height: 170px;
    border-radius: 1000px;
    position:absolute;
    left: 19vw;
    top: 3vh;
    background-color: white;
    display: flex;
    justify-content: center;
}

.custom-arrival-title{
    font-size: 16px;
    font-weight: 500;
    top: 2vh;
}

.custom-departures-title-wrapper{
    width: 190px;
    height: 170px;
    border-radius: 1000px;
    position:absolute;
    right: 19vw;
    top: 3vh;
    background-color: white;
    display: flex;
    justify-content: center;
}

.custom-departures-title{
    font-size: 16px;
    font-weight: 500;
    top: 2vh;
}

.custom-clock-wrapper{
    width: 200px;
    height: 170px;
    border-radius: 1000px;
    position:absolute;
    right: 42.8vw;
    top: -20vh;
    background-color: white;
    display: flex;
    justify-content: center;
}

.custom-clock{
    position: absolute;
    font-size: 23px;
    font-weight: 500;
    bottom: 1.2vh;
    color: #223177;
}
</style>