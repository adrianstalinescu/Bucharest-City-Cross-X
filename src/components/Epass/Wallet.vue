<template>
    <div class="plans-wrapper">
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
      <!-- Plans -->
      <div class="custom-wallet-card-wrapper">
        <div class="custom-plan-rounded-wrapper-1">
          <div>
            <v-icon v-if="plansKeys[0] !== 'Monthly Student'" size="45" color="deep-orange lighten-2" class="custom-plan-icon">mdi-ticket</v-icon>
            <v-icon
              v-if="plansKeys[0] === 'Monthly Student'"
              size="45"
              color="deep-orange lighten-2"
              class="custom-plan-icon"
            >mdi-ticket-percent</v-icon>
            <span v-if="plansKeys[0] !== 'Monthly Student'" class="plan-title-1">{{plansKeys[0]}}</span>
            <span v-if="plansKeys[0] === 'Monthly Student'" class="plan-title-2">{{plansKeys[1]}}</span>
          </div>
          <div class="plan-status-1">
            <v-chip color="rgb(117, 149, 166)" outlined>
              <span v-if="plansDetails[plansKeys[0]].Activated === 'true'" class="card-info">Valid untill {{plansDetails[plansKeys[0]].Valid}}</span>
              <span v-if="plansDetails[plansKeys[0]].Activated === 'false'" class="card-info">Inactive</span>
            </v-chip>
          </div>
          <div class="plan-activate-1">
            <v-btn
              rounded
              :disabled="plansDetails[plansKeys[0]].Activated === 'true'"
              color="teal darken-4"
              elevation="0"
              class="justify-center plan-button-activate white--text"
              @click="activatePlan(plansKeys[0])"
            >
              <span v-if="plansDetails[plansKeys[0]].Activated === 'true'">Active</span>
              <v-icon
                v-if="plansDetails[plansKeys[0]].Activated === 'true'"
                dark
                right
                size="20"
              >mdi-checkbox-marked-circle-outline</v-icon>
              <span v-if="plansDetails[plansKeys[0]].Activated === 'false'">Activate</span>
              <v-icon
                v-if="plansDetails[plansKeys[0]].Activated === 'false'"
                dark
                right
                size="20"
              >mdi-plus-circle-outline</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="custom-plan-rounded-wrapper-2">
          <div>
            <v-icon v-if="plansKeys[1] !== 'Monthly Student'" size="45" color="deep-orange lighten-2" class="custom-plan-icon">mdi-ticket</v-icon>
            <v-icon
              v-if="plansKeys[1] === 'Monthly Student'"
              size="45"
              color="deep-orange lighten-2"
              class="custom-plan-icon"
            >mdi-ticket-percent</v-icon>
            <span v-if="plansKeys[1] !== 'Monthly Student'" class="plan-title-1">{{plansKeys[1]}}</span>
            <span v-if="plansKeys[1] === 'Monthly Student'" class="plan-title-2">{{plansKeys[1]}}</span>
          </div>
          <div class="plan-status-1">
            <v-chip color="rgb(117, 149, 166)" outlined>
              <span v-if="plansDetails[plansKeys[1]].Activated === 'true'" class="card-info">Valid untill {{plansDetails[plansKeys[1]].Valid}}</span>
              <span v-if="plansDetails[plansKeys[1]].Activated === 'false'" class="card-info">Inactive</span>
            </v-chip>
          </div>
          <div class="plan-activate-1">
            <v-btn
              rounded
              :disabled="plansDetails[plansKeys[1]].Activated === 'true'"
              color="green darken-1"
              elevation="0"
              class="justify-center plan-button-activate white--text"
              @click="activatePlan(plansKeys[1])"
            >
              <span v-if="plansDetails[plansKeys[1]].Activated === 'true'">Active</span>
              <v-icon
                v-if="plansDetails[plansKeys[1]].Activated === 'true'"
                dark
                right
                size="20"
              >mdi-checkbox-marked-circle-outline</v-icon>
              <span v-if="plansDetails[plansKeys[1]].Activated === 'false'">Activate</span>
              <v-icon
                v-if="plansDetails[plansKeys[1]].Activated === 'false'"
                dark
                right
                size="20"
              >mdi-plus-circle-outline</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <!-- Alerts -->
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