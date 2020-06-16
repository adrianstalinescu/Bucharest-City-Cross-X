<template>
  <div>
    <div class="scan-epass-button">
        <v-btn fab class="scan-button" elevation="0" @click="scanData()">
            <v-icon size="50" class="scan-icon">mdi-qrcode-scan</v-icon>
        </v-btn>
    </div>
    <div class="scan-epass-wrapper">
        <img v-if="scanImage === true" id="scan" src="" width="200px" height="200px"/>
        <span v-if="scanImage === false" class="scan-epass-description">PRESS <v-icon size="32" class="scan-icon-description">mdi-qrcode-scan</v-icon> TO LOAD</span>  
    </div>
    <router-link :to="'epass'" class="custom-router-link-transparency">
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
  name: "Scan",
  data() {
    return {
        scanImage: false,
        time: null
    };
  },

  mounted() {
      this.startTime();
  },

  methods: {
    scanData() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        let scanTime =  yyyy + '-' + mm + '-' + dd + "-" + this.time;
        let subscriptionKey = "ad74b81838msh36523b284fdcd6ap1bc786jsnccf670756ad5"; //microsoft face api key
        let uriBase =
            "https://qr-code8.p.rapidapi.com/qrcode/generate";

        const axios = require("axios");

        axios({
            "method":"POST",
            "url":"https://qr-code8.p.rapidapi.com/qrcode/generate",
            "headers":{
            "content-type":"application/json",
            "x-rapidapi-host":"qr-code8.p.rapidapi.com",
            "x-rapidapi-key":subscriptionKey,
            "accept":"application/json",
            "useQueryString":true
            },"data":{
            "logo":"",
            "text":scanTime + "-" + this.$store.getters.user.uid,
            "width":900
            }
            })
            .then((response)=>{
                this.scanImage = true
                setTimeout(() => { document.getElementById("scan").setAttribute('src', response.data.b64ImgUrl)}, 500)
            })
            .catch((error)=>{
            console.log(error)
            })
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
        if (i < 10) {
            i = "0" + i};  // add zero in front of numbers < 10
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

.scan-epass-button {
    width: 100%;
    position: absolute;
    display: flex;
    top: 65vh;
    justify-content: center;
}

.scan-button{
    height: 130px !important;
    width: 130px;
    border-radius: 1000px !important;
    border: 10px solid #D95033;
    font-size: 20px;
    font-weight: 500;
    color: #039BE5;
}

.scan-epass-wrapper {
    position: absolute;
    top: 7vh;
    left: 38vw;
    display: flex;
    width: 320px;
    height: 320px;
    padding-top: 7.5vh;
    justify-content: center;
    align-content: center;
    background-color: white;
    border-radius: 1000px;
    border: 12px solid #D95033;
}

.scan-epass-description {
    position: absolute;
    top: 20.2vh;
    font-size: 26px;
    font-weight: 600;
}

.scan-icon{
    position: absolute;
    color: #455A64;
}

.scan-icon-description{
    color: #039BE5;
    margin-bottom: 4px;
}
</style>