<template>
  <div class="history-wrapper">
    <!-- Back button -->
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
    <!-- History -->
    <div class="custom-center-wrapper">
      <v-card class="custom-history-card-wrapper ml-6" outlined elevation="0">
        <div class="custom-history-title-wrap ma-2">
          <v-card-title class="custom-history-title">
            <v-icon left color="deep-orange lighten-2" size="30">mdi-ticket</v-icon>Single Use Ticket (SUT) history
          </v-card-title>
        </div>
        <div class="custom-plan-card-wrap ma-3">
          <v-data-table
            :footer-props="footer_props"
            :headers="headers"
            :items="SUT"
            :items-per-page="5"
            class="custom-wallet-sut-table"
            disable-sort
          ></v-data-table>
        </div>
      </v-card>
      <v-card class="custom-history-card-wrapper mx-6" outlined elevation="0">
        <div class="custom-history-title-wrap ma-2">
          <v-card-title class="custom-history-title">
            <v-icon left color="rgb(117, 149, 166)" size="30">mdi-progress-clock</v-icon>Purchase History
          </v-card-title>
        </div>
        <div class="custom-history-table-wrap ma-3">
          <v-data-table
            :footer-props="footer_props"
            :headers="headerPurchased"
            :items="purchased"
            class="custom-history-table"
            disable-sort
          ></v-data-table>
        </div>
      </v-card>
      <v-card class="custom-history-card-wrapper mr-6" outlined elevation="0">
        <div class="custom-history-title-wrap ma-2">
          <v-card-title class="custom-history-title">
            <v-icon left color="rgb(117, 149, 166)" size="30">mdi-map-clock</v-icon>Search History
          </v-card-title>
        </div>
        <div class="custom-history-table-wrap ma-3">
          <v-data-table
            :footer-props="footer_props"
            :headers="headerSearched"
            :items="searched"
            class="custom-history-table"
            disable-sort
          ></v-data-table>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "History",
  data() {
    return {
      footer_props: {
        "items-per-page-options": [5],
        "items-per-page-text": null,
        "disable-items-per-page": true
      },
      headers: [
        {
          text: "Usage",
          align: "left",
          sortable: false,
          value: "type"
        },
        {
          text: "Line",
          align: "left",
          sortable: false,
          value: "line"
        },
        { text: "Date", sortable: false, value: "date" },
        { text: "Time", sortable: false, value: "time" },
        { text: "Amount", sortable: false, value: "amount" }
      ],
      SUT: [
      ],
      headerPurchased: [
        {
          text: "Type",
          align: "left",
          sortable: false,
          value: "type"
        },
        { text: "Date", sortable: false, value: "date" },
        { text: "Time", sortable: true, value: "time" },
        { text: "Amount", sortable: false, value: "amount" }
      ],
      purchased: [],
      headerSearched: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "Date", sortable: false, value: "date" },
        { text: "Time", sortable: true, value: "time" },
      ],
      searched: []
    };
  },

  mounted() {
    this.purchasedData()
    this.searchedData()
    this.SUTData()
  },

  methods: {
    SUTData() {
      firebase
        .database()
        .ref("SUT/" + this.$store.getters.user.uid)
        .on("value", snap => {
          let myObj = snap.val();
          if (myObj !== null) {
            this.SUT = []
            let keys = Object.keys(snap.val());
            keys.forEach(key => {
              this.SUT.push({
                type: myObj[key].Type,
                line: myObj[key].Line,
                date: myObj[key].Date,
                time: myObj[key].Time,
                amount: myObj[key].Cost
              })
            });
          }
        });
    },
    purchasedData() {
      firebase
        .database()
        .ref("History/Purchase/" + this.$store.getters.user.uid)
        .on("value", snap => {
          let myObj = snap.val();
          if (myObj !== null) {
            this.purchased = []
            let keys = Object.keys(snap.val());
            keys.forEach(key => {
              this.purchased.unshift({
                type: myObj[key].Type,
                date: myObj[key].Date,
                time: myObj[key].Time,
                amount: myObj[key].Cost
              })
            });
          }
        });
    },
    searchedData() {
      firebase
        .database()
        .ref("History/Search/" + this.$store.getters.user.uid)
        .on("value", snap => {
          let myObj = snap.val();
          if (myObj !== null) {
            this.searched = []
            let keys = Object.keys(snap.val());
            keys.forEach(key => {
              this.searched.unshift({
                title: myObj[key].Title,
                date: myObj[key].Date,
                time: myObj[key].Time
              })
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.custom-router-link-transparency {
  color: transparent;
  height: 25vh !important;
  align-self: center;
}

.custom-center-wrapper {
  display:flex;
  margin-top: 18vh;
}

.custom-back-button {
  position: absolute;
  top: 2vh;
  left: 1.5vw;
}

.plans-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
}

.custom-card-grid {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 3.5fr 4fr 2.5fr;
}

.custom-card-add-grid {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 7fr 2.5fr;
}

.custom-card-wrapper {
  position: relative;
  margin-top: 2vh;
  margin-bottom: 2vh;
  height: auto;
}

.custom-history-card-wrapper {
  margin-top: 2vh;
  margin-bottom: 2vh;
  width: 100%;
  height: auto;
}

.plan-title-1 {
  position: absolute;
  left: 7.5vw;
  top: 7vh;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-size: 20px;
  font-weight: 600;
}

.plan-title-2 {
  position: absolute;
  left: 4.8vw;
  top: 7vh;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-size: 20px;
  font-weight: 600;
}

.plan-status-1 {
  position: absolute;
  display: flex;
  top: 14vh;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-size: 20px;
  font-weight: 600;
  justify-content: center;
}

.card-info {
  font-size: 20px;
}

.plan-activate-1{
  position: absolute;
  left: 5.4vw;
  top: 21vh;
}

.plan-button-activate{
  height: 130px !important;
  width: 130px;
  border-radius: 1000px !important;
}

.custom-wallet-card-wrapper {
  position:absolute;
  width: 68vw;
  height: 95vh;
  top: 3vh;
  left: 8vw;
}

.custom-plan-rounded-wrapper-1{
  width: 300px;
  height: 300px;
  display: flex;
  position: absolute;
  left: 10vw;
  top: 17vh;
  border: 1.5vh solid #D95033;
  background-color: white;
  border-radius: 1000px;
}

.custom-plan-rounded-wrapper-2{
  width: 300px;
  height: 300px;
  display: flex;
  position: absolute;
  left: 50vw;
  top: 17vh;
  border: 1.5vh solid #D95033;
  background-color: white;
  border-radius: 1000px;
}

.custom-plan-icon{
  position: absolute;
  left: 8.5vw;
  top: 1vh;
}

.custom-plan-button {
  align-self: center !important;
}

.custom-plan-title {
  padding: 0px;
  margin-bottom: 0px !important;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
}

.custom-plan-button {
  align-self: center !important;
}

.plan-info {
  font-weight: 500;
  font-size: 1.1rem;
  align-self: center;
  justify-self: center;
}

.custom-wallet-sut-table {
  width: 100%;
  height: 100%;
}

.plan-activate {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.display-flex {
  display: flex;
}

.custom-history-title-wrap {
  display: flex;
  height: auto;
}

.custom-history-table-wrap {
  display: flex;
  height: auto;
}

.custom-history-title {
  padding: 0px;
  margin-bottom: 0px !important;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  font-weight: 600;
}

.custom-history-table {
  width: 100%;
  height: 100%;
}
</style>