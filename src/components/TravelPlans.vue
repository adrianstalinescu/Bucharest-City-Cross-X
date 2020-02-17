<template>
  <div class="plans-wrapper">
    <v-card v-if="card" class="custom-card-wrapper" width="53vw" outlined elevation="0">
      <div class="custom-card-grid">
        <v-icon size="40">mdi-credit-card-outline</v-icon>
        <span class="card-info">Card number **** **** **** 1234</span>
        <span class="card-info">Exp 07/21</span>
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
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-2">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>Daily Plan
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
      <div class="custom-plan-card-wrap ma-3">
        <span
          class="plan-info"
        >This plan is valid from the moment it is activated until the end of the day it was activated</span>
      </div>
    </v-card>
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-2">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>Weekly Plan
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
      <div class="custom-plan-card-wrap ma-3">
        <span
          class="plan-info"
        >This plan is valid from the moment it is activated until the end of the week it was activated</span>
      </div>
    </v-card>
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-2">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>Monthly Plan
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
      <div class="custom-plan-card-wrap ma-3">
        <span
          class="plan-info"
        >This plan is valid from the moment it is activated until the end of the month it was activated</span>
      </div>
    </v-card>
    <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
      <div class="custom-plan-card-wrap ma-2">
        <v-card-title class="custom-plan-title ml-3 mr-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>
          <v-icon left color="amber darken-4" size="30">mdi-currency-usd-off</v-icon>Monthly Student Plan
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
      <div class="custom-plan-card-wrap ma-3">
        <span class="plan-info">
          This plan is dedicated only to students that are eligible for a discount.
          The plan is valid from the moment it is activated until the end of the month it was activated
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
/* eslint-disable */
export default {
  name: "TravelPlans",
  data() {
    return {
      card: true,
      cardChange: false,
      student: false
    };
  },

  created() {},

  watch: {},

  computed: {},

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
  grid-template-columns: 1fr 7fr 2.5fr;
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