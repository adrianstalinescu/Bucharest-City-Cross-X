<template>
    <div class="plans-wrapper">
      <h4 style="display:none">{{ plansData }}</h4>
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
      <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
        <div class="custom-plan-card-wrap ma-2">
          <v-card-title class="custom-plan-title ml-3 mr-3">
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
      <v-snackbar v-model="plansActivateError" :timeout="1500" color="success">
        <span class="plan-activate-error">Only 1 plan can be Active</span>
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
          value: "name"
        },
        { text: "Date", sortable: false, value: "date" },
        { text: "Amount", sortable: false, value: "amount" }
      ],
      SUT: [
        {
          name: "Bus 335",
          date: "02-02-2020",
          amount: 1.3
        },
        {
          name: "Metro Dristor 2",
          date: "15-02-2020",
          amount: 2.5
        },
        {
          name: "Tram 44",
          date: "12-02-2020",
          amount: 1.3
        },
        {
          name: "Bus 335",
          date: "02-02-2020",
          amount: 1.3
        },
        {
          name: "Metro Dristor 2",
          date: "15-02-2020",
          amount: 2.5
        },
        {
          name: "Bus 335",
          date: "02-02-2020",
          amount: 1.3
        },
        {
          name: "Metro Dristor 2",
          date: "15-02-2020",
          amount: 2.5
        }
      ]
    };
  },

  created() {},

  watch: {},

  computed: {
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
    }
  },

  mounted() {},

  methods: {
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
        console.log(counter)
        if(counter < 1)
        {
          let validity
          switch(plan) {
            case 'Daily':
              validity = (new Date().getDate()+1) +"/"+ (new Date().getMonth()+1)
              break;
            case 'Weekly':
              validity = (new Date().getDate()+7) +"/"+ new Date().getMonth()
              break;
            case 'Monthly':
              validity = new Date().getDate() +"/"+ (new Date().getMonth() + 2)
              break;
            case 'Monthly Student':
              validity = new Date().getDate() +"/"+ (new Date().getMonth() + 2)
          }
          firebase
            .database()
            .ref("Wallet/" + this.$store.getters.user.uid + "/" + plan)
            .update({
              Activated: 'true',
              Valid: validity
            });
        } else {
          this.plansActivateError = true
        }
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
  background: url("https://picsum.photos/1920/1080?random");
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

.plan-activate-error {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}
</style>