<template>
  <div class="stations-wrapper">
    <h4 style="display:none">{{ stationsLoader }}</h4>
    <v-card elevation="0" class="custom-select-wrapper mt-2 mb-2 pa-2">
      <v-select
        v-model="stationSelect"
        :items="selectItems"
        label="Select Station"
        hide-details
        color="#7595a6"
        prepend-icon="mdi-bus-stop-covered"
      ></v-select>
    </v-card>
    <div v-if="stationSelect" class="custom-info-wrapper">
      <v-card v-for="lk in lines.keys" :key="lk" elevation="0" class="custom-station-info">
        <div class="custom-card-grid">
          <v-icon
            v-if="lines.data[lk].type === 'BUS'"
            size="38"
            :color="lines.data[lk].color"
          >mdi-bus</v-icon>
          <v-icon
            v-if="lines.data[lk].type === 'CABLE_CAR'"
            size="38"
            :color="lines.data[lk].color"
          >mdi-bus</v-icon>
          <v-icon
            v-if="lines.data[lk].type === 'TRAM'"
            size="38"
            :color="lines.data[lk].color"
          >mdi-bus</v-icon>
          <div class="custom-line-details">
            <v-chip :color="lines.data[lk].color" class="ml-1" outlined>
              <span class="custom-line-number">{{lines.data[lk].name}}</span>
              <v-icon size="28" :color="lines.data[lk].color">mdi-chevron-right</v-icon>
              <span class="custom-line-number">{{lines.data[lk].direction_name}}</span>
            </v-chip>
          </div>
          <v-chip color="rgb(117, 149, 166)" class="custom-arrival-wrapper" outlined>
            <span class="card-info-time">{{ time(lines.data[lk].arriving_time) }}</span>
            <svg
              v-if="lines.data[lk].arriving_time !== null"
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
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "Stations",
  data() {
    return {
      stationSelect: "",
      selectItems: [],
      stations: null,
      lines: {
        keys: [],
        data: null
      }
    };
  },

  created() {},

  watch: {
    stationSelect: {
      handler(stationSelect) {
        this.autoRefresh(this.stations[stationSelect].ID);
      }
    }
  },

  computed: {
    stationsLoader() {
      firebase
        .database()
        .ref("Stations")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(myObj);
          this.stations = myObj;
          this.selectItems = keys;
        });
    }
  },

  mounted() {},

  methods: {
    autoRefresh(station) {
      this.callerSTB(station);
      clearInterval(this.refresh);
      this.refresh = setInterval(() => {
        const callSTB = new XMLHttpRequest();
        callSTB.open(
          "GET",
          "https://info.stbsa.ro/rp/api/lines/stops/" + station + "?lang=ro",
          true
        );
        callSTB.send();
        callSTB.onload = () => {
          let response = JSON.parse(callSTB.responseText);
          this.lines.data = response.lines;
        };
      }, 15000);
    },
    callerSTB(station) {
      let lines = [];
      const callSTB = new XMLHttpRequest();
      callSTB.open(
        "GET",
        "https://info.stbsa.ro/rp/api/lines/stops/" + station + "?lang=ro",
        true
      );
      callSTB.send();
      callSTB.onload = () => {
        let response = JSON.parse(callSTB.responseText);
        this.lines.keys = Object.keys(response.lines);
        this.lines.data = response.lines;
      };
    },
    time(arriving_time) {
      if (arriving_time !== null) {
        var h = Math.floor(arriving_time / 3600);
        var m = Math.floor((arriving_time % 3600) / 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " hrs ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "0 min";
        return hDisplay + mDisplay;
      } else {
        return "No Service";
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.refresh);
  }
};
</script>

<style scoped>
.stations-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  background: url("https://picsum.photos/1920/1080?random");
}

.custom-select-wrapper {
  width: 42vw;
  margin-left: auto;
  margin-right: auto;
}

.custom-info-wrapper {
  width: 100%;
  height: 100%;
}

.custom-station-info {
  width: 40vw;
  height: 60px;
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

.card-info-line {
  font-weight: 600;
  align-self: center;
  justify-self: start;
}

.custom-line-details {
  align-self: center;
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

.custom-arrival-wrapper {
  align-self: center;
  justify-self: end;
  margin-right: 15px;
}

.card-info-time {
  font-size: 1rem;
  font-weight: 700;
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
</style>