<template>
  <div>
    <div class="home-wrapper">
      <v-card
        class="custom-notification-card"
        width="55vw"
        min-height="65px"
        outlined
        elevation="1"
      >
        <div class="custom-metro-card mt-2 metro-status-wrapper">
          <v-chip class="ma-2 metro-status-icon" color="amber accent-4" text-color="black">
            <span class="mr-2">M1</span>
            <v-chip color="white" outlined class="metro-status-text">
              <span>{{metroStatus1}}</span>
            </v-chip>
          </v-chip>
          <v-chip class="ma-2 metro-status-icon" color="blue darken-4" text-color="black">
            <span class="mr-2">M2</span>
            <v-chip color="white" outlined class="metro-status-text">
              <span>{{metroStatus2}}</span>
            </v-chip>
          </v-chip>
          <v-chip class="ma-2 metro-status-icon" color="#ff2b1c" text-color="black">
            <span class="mr-2">M3</span>
            <v-chip color="white" outlined class="metro-status-text">
              <span>{{metroStatus3}}</span>
            </v-chip>
          </v-chip>
          <v-chip class="ma-2 metro-status-icon" color="green darken-3" text-color="black">
            <span class="mr-2">M4</span>
            <v-chip color="white" outlined class="metro-status-text">
              <span>{{metroStatus4}}</span>
            </v-chip>
          </v-chip>
        </div>
        <h4 style="display:none">{{ metroStatus }}</h4>
      </v-card>
      <h4 style="display:none">{{ notificationsKeys }}</h4>
      <h4 style="display:none">{{ notifications }}</h4>
      <v-card v-if="!notificationsKeys" class="custom-notification-card" width="25vw" outlined elevation="1">
        <div class="custom-notification-empty-card-wrap ma-2">
          <v-avatar elevation="0" color="light-blue lighten-3" class="mr-4 ml-2">
            <v-icon color="light-blue darken-1" size="30">
              mdi-exclamation-thick
            </v-icon>
          </v-avatar>
          <v-card-title class="custom-notification-empty-title" disabled>
            There are no notifications
          </v-card-title>
        </div>
      </v-card>
      <div>
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
          <input :value="notifications[n].Title" disabled class="custom-notification-title ml-3 mr-3"/>
          <v-btn
            fab
            small
            elevation="0"
            color="transparent"
            class="custom-notification-button mr-4"
          >
            <v-icon color="red" size="30">mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="custom-notification-card-wrap ma-3">{{notifications[n].Content}}</div>
      </v-card>
      </div>
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
    };
  },

  created() {},

  watch: {},

  computed: {
    notificationsKeys() {
      return this.$store.getters.notificationsCount
    },
    notifications() {
      return this.$store.getters.notifications
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
    }
  },

  mounted() {},

  methods: {}
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