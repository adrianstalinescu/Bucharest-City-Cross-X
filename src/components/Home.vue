<template>
  <div class="home-wrapper">
    <v-card class="custom-notification-card" width="55vw" min-height="65px" outlined elevation="0">
      <div class="custom-metro-card mt-2 metro-status-wrapper">
        <v-chip v-for="m in subway.keys" :key="m" class="ma-2" :color="subway.data[m].Color" outlined>
          <span class="metro-line-text">{{m}}</span>
          <v-icon>mdi-chevron-right</v-icon>
          <span class="metro-status-text-info">{{subway.data[m].Status}}</span>
        </v-chip>
      </div>
    </v-card>
      <v-card
        v-if="!notificationsKeys"
        class="custom-notification-card"
        width="25vw"
        outlined
        elevation="0"
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
        elevation="0"
      >
        <div class="custom-notification-card-wrap mt-2">
          <v-avatar
            v-if="notificationsData[n].Type === 'alert'"
            elevation="0"
            color="orange lighten-1"
            class="custom-notification-button ml-4"
          >
            <v-icon color="orange darken-4" size="30">mdi-alert-outline</v-icon>
          </v-avatar>
          <v-avatar
            v-if="notificationsData[n].Type === 'info'"
            elevation="0"
            color="light-blue lighten-3"
            class="custom-notification-button ml-4"
          >
            <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
          </v-avatar>
          <input
            :value="notificationsData[n].Title"
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
          <v-chip class="ma-1" color="#7595a6" outlined style="font-weight: 700">
            <v-icon size="20" class="mr-2">mdi-message-text-clock-outline</v-icon>
            {{notificationsData[n].Date}}
            <v-icon size="20">mdi-chevron-right</v-icon>
            {{notificationsData[n].Time}}
          </v-chip>
        </div>
        <div class="custom-notification-card-wrap ma-3">{{notificationsData[n].Content}}</div>
      </v-card>
      <v-snackbar v-model="snackbar" :timeout="2000" color="success">
        <span class="notification-delete">The notification has been deleted</span>
      </v-snackbar>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "Home",
  data() {
    return {
      subway: {
        keys: [],
        data: null
      },
      snackbar: false
    };
  },

  created() {},

  watch: {
  },

  computed: {
    notificationsKeys() {
      return this.$store.getters.notificationsCount;
    },
    notificationsData() {
      return this.$store.getters.notifications;
    }
  },

  mounted() {
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
          this.subway.keys = keys
          this.subway.data = myObj
        });
    },
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
  color: rgba(0, 0, 0, 0.87);
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
  color: rgba(0, 0, 0, 0.87);
}

.notification-delete {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.metro-status-wrapper {
  font-weight: 800;
}

.metro-line-text {
  font-size: 1rem;
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

</style>