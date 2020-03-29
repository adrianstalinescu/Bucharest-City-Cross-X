<template>
    <div class="plans-wrapper">
      <v-card
        v-for="pk in plansKeys"
        :key="pk"
        class="custom-card-wrapper"
        width="53vw"
        outlined
        elevation="0"
      >
        <div class="custom-card-grid">
          <v-icon v-if="pk !== 'Monthly Student'" size="36" color="deep-orange lighten-2">mdi-ticket</v-icon>
          <v-icon
            v-if="pk === 'Monthly Student'"
            size="36"
            color="deep-orange lighten-2"
          >mdi-ticket-percent</v-icon>
          <span class="card-info">{{pk}} Plan</span>
          <span v-if="plansDetails[pk].Activated === 'true'" class="card-info">Valid untill {{plansDetails[pk].Valid}}</span>
          <span v-if="plansDetails[pk].Activated === 'false'" class="card-info"></span>
          <v-btn
            rounded
            :disabled="plansDetails[pk].Activated === 'true'"
            color="teal darken-4"
            elevation="0"
            class="justify-center ma-1 mr-2 white--text"
            @click="activatePlan(pk)"
          >
            <span v-if="plansDetails[pk].Activated === 'true'">Active</span>
            <v-icon
              v-if="plansDetails[pk].Activated === 'true'"
              dark
              right
              size="20"
            >mdi-checkbox-marked-circle-outline</v-icon>
            <span v-if="plansDetails[pk].Activated === 'false'">Activate</span>
            <v-icon
              v-if="plansDetails[pk].Activated === 'false'"
              dark
              right
              size="20"
            >mdi-plus-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-card>
      <div class="display-flex">
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
      <v-snackbar v-model="plansActivateSuccess" :timeout="1500" color="success">
        <span class="plan-activate">The plan was activated</span>
      </v-snackbar>
      <v-snackbar v-model="plansActivateError" :timeout="1500" color="error">
        <span class="plan-activate">Only 1 plan can be Active</span>
      </v-snackbar>
    </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "Wallet",
  data() {
    return {
      plansKeys: [],
      plansDetails: null,
      plansActivateError: false,
      plansActivateSuccess: false,
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

  created() {},

  watch: {},

  computed: {},

  mounted() {
    this.plansData()
    this.purchasedData()
    this.searchedData()
    this.SUTData()
  },

  methods: {
    curday(sp, day, month) {
      let today = new Date()
      let dd = today.getDate()+day
      let mm = today.getMonth()+1+month

      if(dd<10) dd='0'+dd
      if(mm<10) mm='0'+mm
      return (dd+sp+mm)
    },
    activatePlan(plan) {
      this.plansActivateError = false
      let counter = 0
      firebase
        .database()
        .ref("Wallet/" + this.$store.getters.user.uid)
        .on("value", snap => {
          let myObj = snap.val();
          if(myObj)
          {
            let keys = Object.keys(snap.val());
            keys.forEach(key => {
              if(myObj[key].Activated === 'true')
              {
                counter++
              }
            });
          }
        });
        if(counter < 1)
        {
          let validity
          switch(plan) {
            case 'Daily':
              validity = this.curday('/',1,0)
              break;
            case 'Weekly':
              validity = this.curday('/',7,0)
              break;
            case 'Monthly':
              validity = this.curday('/',0,1)
              break;
            case 'Monthly Student':
              validity = this.curday('/',0,1)
          }
          firebase
            .database()
            .ref("Wallet/" + this.$store.getters.user.uid + "/" + plan)
            .update({
              Activated: 'true',
              Valid: validity
            });
          this.plansActivateSuccess = true
        } else {
          this.plansActivateError = true
        }
    },
    plansData() {
      firebase
        .database()
        .ref("Wallet/" + this.$store.getters.user.uid)
        .on("value", snap => {
          let myObj = snap.val();
          this.plansDetails = myObj;
          if (myObj !== null) {
            let keys = Object.keys(snap.val());
            this.plansKeys = keys;
          }
        });
    },
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
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

.custom-history-card-wrapper {
  margin-top: 2vh;
  margin-bottom: 2vh;
  width: 100%;
  height: auto;
}

.card-info {
  font-weight: 600;
  font-size: 1.2rem;
  align-self: center;
  justify-self: start;
}

.custom-plan-card-wrap {
  display: flex;
  height: auto;
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