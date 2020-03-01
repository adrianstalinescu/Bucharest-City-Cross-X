<template>
  <div class="plans-wrapper">
    <v-card v-if="card" class="custom-card-wrapper" width="53vw" outlined elevation="0">
      <div class="custom-card-grid">
        <v-icon size="40">mdi-credit-card-outline</v-icon>
        <span class="card-info">Card number **** **** **** {{cardLastDigits}}</span>
        <span class="card-info">Exp {{cardExpiry}}</span>
        <v-btn
          rounded
          dark
          color="teal darken-4"
          elevation="0"
          class="justify-center ma-1 custom-card-button"
          @click="cardChange = true"
        >
          Change Card
          <v-icon dark right size="20">mdi-credit-card-settings-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-card v-if="!card" class="custom-card-wrapper" width="53vw" outlined elevation="0">
      <div class="custom-card-add-grid">
        <v-icon size="40">mdi-credit-card-outline</v-icon>
        <span class="card-info">To buy a plan you must first add a Debit/Credit Card</span>
        <v-btn
          rounded
          dark
          color="teal darken-4"
          elevation="0"
          class="justify-center ma-1 custom-card-button"
          @click="cardChange = true"
        >
          Add Card
          <v-icon dark right size="20">mdi-credit-card-plus-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <h4 style="display:none">{{ plans }}</h4>
    <h4 style="display:none">{{ cardDetail }}</h4>
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-1">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>{{plan1}} Plan
        </v-card-title>
        <v-btn
          rounded
          outlined
          color="amber darken-4"
          elevation="0"
          class="justify-center ma-3"
          @click="onSignOut()"
          :disabled="card == false"
        >
          Purchase
          <v-icon dark right size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </div>
      <div class="custom-plan-card-wrap ml-3">
        <v-chip color="success" outlined>
        <span
          class="plan-info"
        >Cost: {{planCost1}}</span>
        </v-chip>
      </div>
      <div class="custom-plan-card-wrap ma-3">
        <span
          class="plan-info"
        >{{planDescription1}}</span>
      </div>
    </v-card>
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-1">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>{{plan2}} Plan
        </v-card-title>
        <v-btn
          rounded
          outlined
          color="amber darken-4"
          elevation="0"
          class="justify-center ma-3"
          @click="onSignOut()"
          :disabled="card == false"
        >
          Purchase
          <v-icon dark right size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </div>
      <div class="custom-plan-card-wrap ml-3">
        <v-chip color="success" outlined>
        <span
          class="plan-info"
        >Cost: {{planCost2}}</span>
        </v-chip>
      </div>
      <div class="custom-plan-card-wrap ma-3">
        <span
          class="plan-info"
        >{{planDescription2}}</span>
      </div>
    </v-card>
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-1">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>{{plan3}} Plan
        </v-card-title>
        <v-btn
          rounded
          outlined
          color="amber darken-4"
          elevation="0"
          class="justify-center ma-3"
          @click="onSignOut()"
          :disabled="card == false"
        >
          Purchase
          <v-icon dark right size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </div>
      <div class="custom-plan-card-wrap ml-3">
        <v-chip color="success" outlined>
        <span
          class="plan-info"
        >Cost: {{planCost3}}</span>
        </v-chip>
      </div>
      <div class="custom-plan-card-wrap ma-3">
        <span
          class="plan-info"
        >{{planDescription3}}</span>
      </div>
    </v-card>
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-1">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-percent</v-icon>{{plan4}} Plan
        </v-card-title>
        <v-btn
          rounded
          outlined
          color="amber darken-4"
          elevation="0"
          class="justify-center ma-3"
          @click="student = true"
          :disabled="card == false"
        >
          Purchase
          <v-icon dark right size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </div>
      <div class="custom-plan-card-wrap ml-3">
        <v-chip color="success" outlined>
        <span
          class="plan-info"
        >Cost: {{planCost4}}</span>
        </v-chip>
      </div>
      <div class="custom-plan-card-wrap ma-3">
        <span class="plan-info">
          {{planDescription4}}
        </span>
      </div>
    </v-card>
    <v-dialog persistent scrollable v-model="cardChange" width="40vw">
      <v-card>
        <v-card-text style="height: 70vh;"></v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="ma-1">
          <v-btn
            fab
            small
            dark
            color="blue-grey lighten-1"
            elevation="0"
            @click="cardChange = false"
          >
            <v-icon dark size="25">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab small dark elevation="0" color="success">
            <v-icon dark>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent scrollable v-model="student" width="40vw">
      <v-card>
        <v-card-text style="height: 70vh;"></v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="ma-1">
          <v-btn fab small dark color="blue-grey lighten-1" elevation="0" @click="student = false">
            <v-icon dark size="25">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab small dark elevation="0" color="success">
            <v-icon dark>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "TravelPlans",
  data() {
    return {
      cardLastDigits: null,
      cardExpiry: null,
      plan1: null,
      planCost1: null,
      planDescription1: null,
      plan2: null,
      planCost2: null,
      planDescription2: null,
      plan3: null,
      planCost3: null,
      planDescription3: null,
      plan4: null,
      planCost4: null,
      planDescription4: null,
      card: false,
      cardChange: false,
      student: false
    };
  },

  created() {},

  watch: {},

  computed: {
    plans() {
      firebase
        .database()
        .ref("TravelPlans")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          keys.forEach(key => {
            switch (key) {
              case "Daily":
                this.plan1 = key;
                this.planCost1 = myObj[key].Cost;
                this.planDescription1 = myObj[key].Description;
                break;
              case "Weekly":
                this.plan2 = key;
                this.planCost2 = myObj[key].Cost;
                this.planDescription2 = myObj[key].Description;
                break;
              case "Monthly":
                this.plan3 = key;
                this.planCost3 = myObj[key].Cost;
                this.planDescription3 = myObj[key].Description;
                break;
              case "Monthly Student":
                this.plan4 = key;
                this.planCost4 = myObj[key].Cost;
                this.planDescription4 = myObj[key].Description;
            }
          });
        });
    },
    cardDetail() {
      firebase
        .database()
        .ref("CardDetails/" + this.$store.getters.user.uid)
        .on("value", snap => {
          this.card = true
          let myObj = snap.val()
          let keys = Object.keys(snap.val())
          keys.forEach(key => {
            switch (key) {
              case "CardNumber":
                let digits = myObj[key].toString()
                this.cardLastDigits = digits.substr(digits.length -4)
                break;
              case "Expiry":
                this.cardExpiry = myObj[key]
            }
          });
        });
    },
  },

  mounted() {},

  methods: {}
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
  grid-template-columns: 1fr 5fr 3fr 3.5fr;
}

.custom-card-add-grid {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 8fr 3.5fr;
}

.custom-card-wrapper {
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

.custom-card-button {
  align-self: center;
  justify-self: center;
}

.card-info {
  font-weight: 600;
  font-size: 1.1rem;
  align-self: center;
  justify-self: center;
}

.custom-plan-card-wrap {
  display: flex;
  height: auto;
}

.custom-plan-button {
  align-self: center;
}

.custom-plan-title {
  padding: 0px;
  margin-bottom: 0px;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
}

.plan-info {
  font-weight: 500;
  font-size: 0.9rem;
  align-self: center;
  justify-self: center;
}
</style>