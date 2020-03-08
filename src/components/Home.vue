<template>
  <div class="home-wrapper">
    <v-card class="custom-notification-card" width="55vw" min-height="65px" outlined elevation="1">
      <div class="custom-metro-card mt-2 metro-status-wrapper">
        <v-chip class="ma-2 metro-status-icon" color="amber accent-4" outlined>
          <span class="mr-2 metro-line-text">M1</span>
          <v-chip color="amber accent-4" outlined class="metro-status-text">
            <span class="metro-status-text-info">{{metroStatus1}}</span>
          </v-chip>
        </v-chip>
        <v-chip class="ma-2 metro-status-icon" color="blue darken-4" outlined>
          <span class="mr-2 metro-line-text">M2</span>
          <v-chip color="blue darken-4" outlined class="metro-status-text">
            <span class="metro-status-text-info">{{metroStatus2}}</span>
          </v-chip>
        </v-chip>
        <v-chip class="ma-2 metro-status-icon" color="#ff2b1c" outlined>
          <span class="mr-2 metro-line-text">M3</span>
          <v-chip color="#ff2b1c" outlined class="metro-status-text">
            <span class="metro-status-text-info">{{metroStatus3}}</span>
          </v-chip>
        </v-chip>
        <v-chip class="ma-2 metro-status-icon" color="green darken-3" outlined>
          <span class="mr-2 metro-line-text">M4</span>
          <v-chip color="green darken-3" outlined class="metro-status-text">
            <span class="metro-status-text-info">{{metroStatus4}}</span>
          </v-chip>
        </v-chip>
      </div>
      <h4 style="display:none">{{ metroStatus }}</h4>
      <div class="custom-notification-capacity-switch mb-1">
        <div class="custom-capacity-wrapper">
          <span class="custom-notification-switch mr-3">Notifications</span>
          <v-switch inset v-model="switcher" class="custom-switcher"></v-switch>
          <span class="custom-capacity-switch ml-3">Capacity Indicator</span>
        </div>
      </div>
      <v-card v-if="switcher === true" elevation="0" class="custom-select-wrapper">
        <h4 style="display:none">{{ metroStations }}</h4>
        <v-select
          v-model="stationSelect"
          :items="stations"
          label="Select Station"
          hide-details
          color="#7595a6"
          prepend-icon="mdi-subway"
        ></v-select>
      </v-card>
    </v-card>
    <div v-if="switcher === false">
      <h4 style="display:none">{{ notificationsKeys }}</h4>
      <h4 style="display:none">{{ notifications }}</h4>
      <v-card
        v-if="!notificationsKeys"
        class="custom-notification-card"
        width="25vw"
        outlined
        elevation="1"
      >
        <div class="custom-notification-empty-card-wrap ma-2">
          <v-avatar elevation="0" color="light-blue lighten-3" class="mr-4 ml-2">
            <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
          </v-avatar>
          <v-card-title class="custom-notification-empty-title" disabled>There are no notifications</v-card-title>
        </div>
      </v-card>
      <v-card
        v-for="n in notificationsKeys"
        :key="n"
        class="custom-notification-card"
        width="50vw"
        min-height="80px"
        outlined
        elevation="1"
      >
        <div class="custom-notification-card-wrap mt-2">
          <v-avatar
            v-if="notifications[n].Type === 'alert'"
            elevation="0"
            color="orange lighten-1"
            class="custom-notification-button ml-4"
          >
            <v-icon color="orange darken-4" size="30">mdi-alert-outline</v-icon>
          </v-avatar>
          <v-avatar
            v-if="notifications[n].Type === 'info'"
            elevation="0"
            color="light-blue lighten-3"
            class="custom-notification-button ml-4"
          >
            <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
          </v-avatar>
          <input
            :value="notifications[n].Title"
            disabled
            class="custom-notification-title ml-3 mr-3"
          />
          <v-btn
            fab
            small
            elevation="0"
            color="transparent"
            class="custom-notification-button mr-4"
            @click="deleteNotification(n)"
          >
            <v-icon color="red" size="30">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="custom-notification-card-wrap ma-1">
          <v-chip
            class="ma-1"
            color="#7595a6"
            outlined
            style="font-weight: 700"
          >{{notifications[n].Date}}</v-chip>
          <v-chip
            class="ma-1"
            color="#7595a6"
            outlined
            style="font-weight: 700"
          >{{notifications[n].Time}}</v-chip>
        </div>
        <div class="custom-notification-card-wrap ma-3">{{notifications[n].Content}}</div>
      </v-card>
      <v-snackbar v-model="snackbar" :timeout="2000" color="success">
        <span class="notification-delete">The notification has been deleted</span>
      </v-snackbar>
    </div>
    <div v-if="switcher === true">
      <v-card v-for="s in stationKeys" :key="s" class="custom-capacity-indicator-card">
        <div class="custom-capacity-indicator-title-grid">
          <v-chip :color="stationsData[stationSelect][s].Color" class="capacity-indicator-line">
            {{stationsData[stationSelect][s].Line}}
            <v-icon>mdi-chevron-right</v-icon>
            <v-chip color="white" outlined>
              <span class="capacity-indicator-direction">{{s}}</span>
            </v-chip>
          </v-chip>
          <v-chip color="rgb(117, 149, 166)" outlined class="capacity-indicator-arrival-wrapper">
            <span class="capacity-indicator-arrival">Arrival</span>
            <v-chip color="rgb(117, 149, 166)" outlined>
              <span
                class="capacity-indicator-arrival-time"
              >{{stationsData[stationSelect][s].Arrival}} min</span>
            </v-chip>
          </v-chip>
        </div>
        <div class="custom-capacity-indicator-content-wrapper">
          <div class="capacity">
            <span v-for="c in Object.keys(stationsData[stationSelect][s].Capacity)" :key="c">
              <img
                v-if="stationsData[stationSelect][s].Capacity[c] === 'low'"
                class="carriage low"
                src="http://shoreditch.opencapacity.co/components/dashboard-page/capacity-low.svg"
              />
              <img
                v-if="stationsData[stationSelect][s].Capacity[c] === 'medium'"
                class="carriage medium"
                src="http://shoreditch.opencapacity.co/components/dashboard-page/capacity-medium.svg"
              />
              <img
                v-if="stationsData[stationSelect][s].Capacity[c] === 'high'"
                class="carriage high"
                src="http://shoreditch.opencapacity.co/components/dashboard-page/capacity-high.svg"
              />
            </span>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "Home",
  data() {
    return {
      metroStatus1: null,
      metroStatus2: null,
      metroStatus3: null,
      metroStatus4: null,
      snackbar: false,
      switcher: false,
      stationSelect: "",
      stations: [],
      stationKeys: [],
      stationsData: null
    };
  },

  created() {},

  watch: {
    stationSelect: {
      handler(stationSelect) {
        this.stationKeys = Object.keys(this.stationsData[stationSelect]);
      }
    }
  },

  computed: {
    notificationsKeys() {
      return this.$store.getters.notificationsCount;
    },
    notifications() {
      return this.$store.getters.notifications;
    },
    metroStatus() {
      firebase
        .database()
        .ref("MetroLine")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          keys.forEach(key => {
            switch (key) {
              case "M1":
                this.metroStatus1 = myObj[key].Status;
                break;
              case "M2":
                this.metroStatus2 = myObj[key].Status;
                break;
              case "M3":
                this.metroStatus3 = myObj[key].Status;
                break;
              case "M4":
                this.metroStatus4 = myObj[key].Status;
            }
          });
        });
    },
    metroStations() {
      firebase
        .database()
        .ref("MetroStation")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.stations = keys;
          this.stationsData = myObj;
        });
    }
  },

  mounted() {},

  methods: {
    deleteNotification(notification) {
      firebase
        .database()
        .ref(
          "Users/" +
            this.$store.getters.user.uid +
            "/Notifications/" +
            notification
        )
        .remove();
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
.home-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  background: url("https://picsum.photos/1920/1080?random");
}

.custom-notification-card {
  margin-top: 2vh;
  margin-bottom: 2vh;
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

.custom-notification-empty-card-wrap {
  display: flex;
  height: auto;
}

.custom-notification-empty-title {
  padding: 0px;
  margin-bottom: 0px !important;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
}

.notification-delete {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.custom-notification-switch {
  align-self: center;
  justify-self: end;
  font-weight: 500;
}

.custom-switcher {
  width: 40px;
  height: 35px;
  margin-top: 0px;
}

.custom-capacity-switch {
  align-self: center;
  justify-self: baseline;
  font-weight: 500;
}

.metro-status-wrapper {
  font-weight: 800;
}

.metro-status-icon {
  padding-right: 0px;
}

.metro-line-text {
  font-size: 1rem;
}

.metro-status-text {
  width: 30vw;
}

.metro-status-text-info {
  font-weight: 600;
  color: black !important;
}

.custom-metro-card {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.custom-notification-capacity-switch {
  justify-content: center;
  display: flex;
}

.custom-capacity-wrapper {
  width: 100%;
  height: 100%;
  padding-left: 40px;
  display: flex;
  justify-content: center;
}

.custom-capacity-indicator-card {
  width: 60vw;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2vh;
}

.custom-capacity-indicator-title-grid {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2vh;
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
  background: url(http://shoreditch.opencapacity.co/components/dashboard-page/train.svg) -1px -1px
      no-repeat,
    #23282d;
  background-size: auto calc(100% + 2px);
  text-align: right;
  animation: slide 2s 0s linear 1;
  margin-left: 1rem;
}

.carriage {
  display: inline;
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

.custom-select-wrapper {
  width: 95%;
  margin-bottom: 2vh;
  margin-left: auto;
  margin-right: auto;
}
</style>