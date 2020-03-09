<template>
  <div class="plans-wrapper">
    <h4 style="display:none">{{ cardDetail }}</h4>
    <h4 style="display:none">{{ plansSUT }}</h4>
    <v-expansion-panels class="custom-sut-wrapper">
      <v-expansion-panel>
        <v-expansion-panel-header class="custom-sut-header">
          <v-card-title class="custom-sut-title" disabled>
            <v-icon left color="#039be5" size="35">mdi-information-outline</v-icon>
            {{SUT.Title}}
            <v-chip color="rgb(117, 149, 166)" outlined class="mx-3">Cost: {{SUT.Cost}}/validation</v-chip>
          </v-card-title>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <span class="plan-info">{{ SUT.Description }}</span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
          @click="cardAdd = true"
        >
          Add Card
          <v-icon dark right size="20">mdi-credit-card-plus-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <h4 style="display:none">{{ studentData }}</h4>
    <v-card
      v-if="isStudent === false"
      class="custom-card-wrapper"
      width="53vw"
      outlined
      elevation="0"
    >
      <div class="custom-student-card-grid">
        <v-avatar elevation="0" color="light-blue lighten-3" size="40" class="center-item">
          <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
        </v-avatar>
        <span class="student-card-info">No Student ID</span>
        <v-btn
          rounded
          dark
          color="teal darken-4"
          elevation="0"
          class="justify-center ma-1"
          @click="student = true"
        >
          Add ID
          <v-icon dark right size="20">mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-card
      v-if="isStudent === 'pending'"
      class="custom-card-wrapper"
      width="40vw"
      outlined
      elevation="0"
    >
      <div class="custom-student-card-pending-grid">
        <v-avatar elevation="0" color="light-blue lighten-3" size="40" class="center-item ma-1">
          <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
        </v-avatar>
        <span class="student-card-info">
          Your ID is being reviewed
          <v-icon size="25" color="black" class="ml-1 mb-1">mdi-file-search-outline</v-icon>
        </span>
      </div>
    </v-card>
    <v-card
      v-if="isStudent === 'approved'"
      class="custom-card-wrapper"
      width="40vw"
      outlined
      elevation="0"
    >
      <div class="custom-student-card-approved-grid">
        <v-avatar elevation="0" color="rgb(117, 149, 166)" size="35" class="center-item ma-2">
          <v-icon color="white" size="25">mdi-account-check-outline</v-icon>
        </v-avatar>
        <span class="student-card-details">Student ID: {{studentID}}</span>
        <span class="student-card-details">Valid until {{studentValid}}</span>
      </div>
    </v-card>
    <h4 style="display:none">{{ plansRegular }}</h4>
    <v-card
      v-for="pr in planRegularKeys"
      :key="pr"
      class="custom-card-wrapper"
      width="40vw"
      outlined
      elevation="0"
    >
      <div class="custom-plan-card-wrap ma-1">
        <v-card-title class="custom-plan-title mx-2" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-outline</v-icon>
          {{pr}} Plan
        </v-card-title>
        <v-btn
          rounded
          outlined
          color="amber darken-4"
          elevation="0"
          class="justify-center ma-1"
          @click="onSignOut()"
          :disabled="card == false"
        >
          Purchase
          <v-icon dark right size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </div>
      <div class="custom-plan-card-wrap ml-3">
        <v-chip color="rgb(117, 149, 166)" outlined>
          <span class="plan-info">Cost: {{planRegularDetails[pr].Cost}}</span>
        </v-chip>
      </div>
      <div class="custom-plan-card-wrap ma-3">
        <span class="plan-info">{{planRegularDetails[pr].Description}}</span>
      </div>
    </v-card>
    <h4 style="display:none">{{ plansDiscount }}</h4>
    <v-card
      v-for="pd in planDiscountKeys"
      :key="pd"
      class="custom-card-wrapper"
      width="40vw"
      outlined
      elevation="0"
    >
      <div class="custom-plan-card-wrap ma-1">
        <v-card-title class="custom-plan-title mx-3" disabled>
          <v-icon left color="amber darken-4" size="30">mdi-ticket-percent</v-icon>
          {{pd}} Plan
        </v-card-title>
        <v-btn
          rounded
          outlined
          color="amber darken-4"
          elevation="0"
          class="justify-center ma-1"
          @click="student = true"
          :disabled="card === true && isStudent != 'approved'"
        >
          Purchase
          <v-icon dark right size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </div>
      <div class="custom-plan-card-wrap ml-3">
        <v-chip color="rgb(117, 149, 166)" outlined>
          <span class="plan-info">Cost: {{planDiscountDetails[pd].Cost}}</span>
        </v-chip>
      </div>
      <div class="custom-plan-card-wrap ma-3">
        <span class="plan-info">{{planDiscountDetails[pd].Description}}</span>
      </div>
    </v-card>
    <h4 style="display:none">{{years}}</h4>
    <v-dialog persistent scrollable v-model="cardAdd" width="40vw">
      <v-card>
        <v-card-text class="pb-10">
          <v-row>
            <v-col cols="6">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARDHOLDERS NAME</v-subheader>
              <v-text-field single-line label="Name" outlined hide-details />
            </v-col>
            <v-col cols="6">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
              <v-text-field
                single-line
                outlined
                maxlength="16"
                mask="credit-card"
                label="Number"
                v-model="valueOfCardNumber"
                hide-details
                class="inputPrice"
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>
              <v-select
                :items="MonthList"
                label="Month"
                outlined
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
              <v-select
                :items="YearList"
                label="Year"
                outlined
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
              <v-text-field single-line label="CVV" maxlength="3" outlined hide-details />
            </v-col>
          </v-row>
        </v-card-text>
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
    <v-dialog persistent scrollable v-model="cardChange" width="40vw">
      <v-card>
        <v-card-text class="pb-10">
          <v-row>
            <v-col cols="6">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARDHOLDERS NAME</v-subheader>
              <v-text-field single-line label="Name" outlined hide-details />
            </v-col>
            <v-col cols="6">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
              <v-text-field
                single-line
                outlined
                maxlength="16"
                mask="credit-card"
                label="Number"
                v-model="valueOfCardNumber"
                hide-details
                class="inputPrice"
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>
              <v-select
                :items="MonthList"
                label="Month"
                outlined
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
              <v-select
                :items="YearList"
                label="Year"
                outlined
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
              <v-text-field single-line label="CVV" maxlength="3" outlined hide-details />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="ma-1">
          <v-btn
            fab
            small
            dark
            color="rgb(117, 149, 166)"
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
    <v-dialog persistent scrollable v-model="studentCard" width="40vw">
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
      SUT: {
        Title: null,
        Description: null,
        Cost: null
      },
      planRegularKeys: [],
      planRegularDetails: null,
      planDiscountKeys: [],
      planDiscountDetails: null,
      card: false,
      cardChange: false,
      cardAdd: false,
      valueOfCardNumber: null,
      YearList: [],
      MonthList: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      studentCard: false,
      isStudent: false,
      studentID: null,
      studentValid: null
    };
  },

  created() {},

  watch: {},

  computed: {
    plansRegular() {
      firebase
        .database()
        .ref("TravelPlans/Regular")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.planRegularKeys = keys;
          this.planRegularDetails = myObj;
        });
    },
    plansDiscount() {
      firebase
        .database()
        .ref("TravelPlans/Discount")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.planDiscountKeys = keys;
          this.planDiscountDetails = myObj;
        });
    },
    plansSUT() {
      firebase
        .database()
        .ref("TravelPlans/SUT")
        .on("value", snap => {
          let myObj = snap.val();
          this.SUT.Description = myObj.Description;
          this.SUT.Title = myObj.Title;
          this.SUT.Cost = myObj.Cost;
        });
    },
    cardDetail() {
      firebase
        .database()
        .ref("CardDetails/" + this.$store.getters.user.uid)
        .on("value", snap => {
          this.card = true;
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          keys.forEach(key => {
            switch (key) {
              case "CardNumber":
                let digits = myObj[key].toString();
                this.cardLastDigits = digits.substr(digits.length - 4);
                break;
              case "Expiry":
                this.cardExpiry = myObj[key];
            }
          });
        });
    },
    studentData() {
      firebase
        .database()
        .ref("Users/" + this.$store.getters.user.uid + "/Student")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.isStudent = myObj.Status;
          this.studentID = myObj.ID;
          this.studentValid = myObj.Valid;
        });
    },
    years() {
      const year = new Date().getFullYear();
      let years = Array.from(
        { length: year - 2010 },
        (value, index) => 2020 + index
      );
      this.YearList = years.reverse();
    }
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

.custom-sut-wrapper {
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: auto;
  margin-right: auto;
  width: 53vw;
  height: auto;
}

.custom-sut-header {
  min-height: 45px;
  padding: 0px 13px 0px 11px;
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

.custom-sut-title {
  padding: 0px;
  margin-bottom: 0px;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 600;
  font-size: 1.2rem;
}

.plan-info {
  font-weight: 500;
  font-size: 0.9rem;
  align-self: center;
  justify-self: center;
}

.custom-student-card-grid {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 8fr 2fr;
}

.custom-student-card-pending-grid {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 10fr;
}

.custom-student-card-approved-grid {
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 5fr 5fr;
}

.custom-student-card-sut {
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

.student-card-info {
  font-weight: 600;
  font-size: 1.3rem;
  align-self: center;
  justify-self: center;
}

.student-card-details {
  font-weight: 600;
  font-size: 1.2rem;
  align-self: center;
  justify-self: center;
}

.center-item {
  align-self: center;
  justify-self: center;
}

.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>