<template>
    <div class="home-wrapper">
      <v-card class="custom-notification-card" width="55vw" min-height="65px" outlined elevation="1">
        <div class="custom-metro-card mt-2 metro-status-wrapper">
          <v-chip class="ma-2 metro-status-icon" color="amber accent-4" text-color="black">
            <span class="mr-2">M1</span>
            <v-chip color="white" outlined class="metro-status-text">
              <span>Suspended</span>
            </v-chip>
          </v-chip>
          <v-chip class="ma-2 metro-status-icon" color="blue darken-4" text-color="black">
            <span class="mr-2">M2</span>
            <div>
              <v-chip color="white" outlined class="metro-status-text">
                <span>Good Service</span>
              </v-chip>
            </div>
          </v-chip><v-chip class="ma-2 metro-status-icon" color="#ff2b1c" text-color="black">
            <span class="mr-2">M3</span>
            <v-chip color="white" outlined class="metro-status-text">
              <span>Partly Suspended</span>
            </v-chip>
          </v-chip><v-chip class="ma-2 metro-status-icon" color="green darken-3" text-color="black">
            <span class="mr-2">M4</span>
            <v-chip color="white" outlined class="metro-status-text">
              <span>Good Service</span>
            </v-chip>
          </v-chip>
        </div>
      </v-card>
      <v-card class="custom-notification-card" width="50vw" min-height="80px" outlined elevation="1">
        <div class="custom-notification-card-wrap mt-2">
          <v-avatar elevation="0" color="orange lighten-1" class="custom-notification-button ml-4">
            <v-icon color="orange darken-4" size="30">
              mdi-alert-outline
            </v-icon>
          </v-avatar>
          <input 
          value="Suspendarea liniilor 105 si 780 din motive de accident Suspendarea liniilor 105 si 780 din motive de accident" 
          class="custom-notification-title ml-3 mr-3" disabled>
          <v-btn fab small elevation="0" color="transparent" class="custom-notification-button mr-4">
            <v-icon color="red" size="30">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <div class="custom-notification-card-wrap ma-3">
          Suspendarea liniilor 105 si 780 din motive de accident
        </div>
      </v-card>
      <v-card class="custom-notification-card" width="50vw" min-height="80px" outlined elevation="1">
        <div class="custom-notification-card-wrap mt-2">
          <v-avatar elevation="0" color="light-blue lighten-3" class="custom-notification-button ml-4">
            <v-icon color="light-blue darken-1" size="30">
              mdi-exclamation-thick
            </v-icon>
          </v-avatar>
          <input
            value="Suspendarea liniilor 105 si 780 din motive de accident Suspendarea liniilor 105 si 780 din motive de accident"
            class="custom-notification-title ml-3 mr-3" disabled>
          <v-btn fab small elevation="0" color="transparent" class="custom-notification-button mr-4">
            <v-icon color="red" size="30">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
        <div class="custom-notification-card-wrap ma-3">
          Suspendarea liniilor 105 si 780 din motive de accident
        </div>
      </v-card>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "Home",
    data() {
        return {
        }
    },

    created() {
    },

    watch: {
    },
    
    computed: {
    },

    mounted () {
    },

    methods: {
    }
}

</script>

<style scoped>

.home-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url("https://picsum.photos/1920/1080?random");
}

.custom-notification-card {
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

.custom-notification-card-wrap {
  display: flex;
}

.custom-notification-button {
  align-self: center !important;
}

.custom-notification-title {
  margin-bottom: 0px !important;
  align-self: center;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
}

.metro-status-wrapper {
  font-weight: 800;
}

.metro-status-icon {
  padding-right: 0px;
}

.metro-status-text {
  width: 30vw;
  font-weight: 400;
  color: grey;
}

.custom-metro-card {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

</style>