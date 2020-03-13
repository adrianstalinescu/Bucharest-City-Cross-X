<template>
  <div class="history-wrapper">
    <div class="history-wrapper">
      <h4 style="display:none">{{ purchasedData }}</h4>
      <h4 style="display:none">{{ searchedData }}</h4>
      <v-card class="custom-card-wrapper" outlined elevation="0">
        <div class="custom-history-title-wrap ma-2">
          <v-card-title class="custom-history-title">
            <v-icon left color="rgb(117, 149, 166)" size="30">mdi-progress-clock</v-icon>Purchased
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
      <v-card class="custom-card-wrapper" outlined elevation="0">
        <div class="custom-history-title-wrap ma-2">
          <v-card-title class="custom-history-title">
            <v-icon left color="rgb(117, 149, 166)" size="30">mdi-map-clock</v-icon>Searched
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

  created() {},

  watch: {},

  computed: {
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
  },

  mounted() {},

  methods: {}
};
</script>

<style scoped>
.history-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  background: url("https://picsum.photos/1920/1080?random");
}

.custom-card-wrapper {
  margin-top: 5vh;
  margin-bottom: 5vh;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  width: 40vw;
  height: auto;
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