<template>
  <div class="plans-wrapper">
    <div class="custom-back-button">
      <router-link :to="'home'" class="custom-router-link-transparency">
        <v-btn class="ma-2" rounded dark color="#D95033" elevation="0">
          <v-icon>mdi-arrow-left</v-icon>
          <span class="mr-1">HOME</span>
        </v-btn>
      </router-link>
    </div>
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
        <v-icon color="rgb(117, 149, 166)" size="40">mdi-credit-card-outline</v-icon>
        <span class="card-info">Card number **** **** **** {{cardLastDigits}}</span>
        <span class="card-info">Exp {{cardExpiry}}</span>
        <v-btn
          rounded
          dark
          color="teal darken-4"
          elevation="0"
          class="justify-center ma-1 mr-2 custom-card-button"
          @click="cardChange = true"
        >
          Change Card
          <v-icon dark right size="20">mdi-credit-card-settings-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-card v-if="!card" class="custom-card-wrapper" width="53vw" outlined elevation="0">
      <div class="custom-card-add-grid">
        <v-icon color="rgb(117, 149, 166)" size="40">mdi-credit-card-outline</v-icon>
        <span class="card-info">To buy a plan you must first add a Debit/Credit Card</span>
        <v-btn
          rounded
          dark
          color="teal darken-4"
          elevation="0"
          class="justify-center ma-1 mr-2 custom-card-button"
          @click="cardAdd = true"
        >
          Add Card
          <v-icon dark right size="20">mdi-credit-card-plus-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-card
      v-if="isStudent === false"
      class="custom-card-wrapper"
      width="53vw"
      outlined
      elevation="0"
    >
      <div class="custom-student-card-grid">
        <v-avatar elevation="0" color="light-blue lighten-3" size="34" class="center-item">
          <v-icon color="light-blue darken-1" size="28">mdi-exclamation-thick</v-icon>
        </v-avatar>
        <span class="student-card-info">No Student ID</span>
        <v-btn
          rounded
          dark
          color="teal darken-4"
          elevation="0"
          class="justify-center ma-1 mr-2"
          @click="studentCard = true"
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
        <v-avatar
          elevation="0"
          color="light-blue lighten-3"
          size="34"
          class="center-item ma-1 ml-2"
        >
          <v-icon color="light-blue darken-1" size="28">mdi-exclamation-thick</v-icon>
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
    <v-expansion-panels v-for="pr in planRegularKeys" :key="pr" class="custom-card-wrapper">
      <v-expansion-panel>
        <v-expansion-panel-header class="custom-plan-header">
          <div class="mt-1 mb-2">
            <div class="custom-plan-title-wrap">
              <v-card-title class="custom-plan-title" disabled>
                <v-icon left color="deep-orange lighten-2" size="30">mdi-ticket</v-icon>
                {{pr}} Plan
              </v-card-title>
            </div>
            <div class="custom-plan-chip-wrap">
              <v-chip color="rgb(117, 149, 166)" outlined>
                <span class="plan-info">Cost: {{planRegularDetails[pr].Cost}}</span>
              </v-chip>
              <v-chip color="rgb(117, 149, 166)" outlined class="mx-2">
                <span class="plan-info">Valid: {{planRegularDetails[pr].Validity}}</span>
              </v-chip>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <div>
              <span class="plan-info">{{planRegularDetails[pr].Description}}</span>
            </div>
            <div class="custom-plan-purchase-wrap">
              <v-btn
                rounded
                outlined
                color="#168834ba"
                elevation="0"
                @click="planPurchase(pr, planRegularDetails[pr].Cost)"
              >
                <span v-if="!planRegularPurchaseDisabled">Purchase</span>
                <v-icon v-if="!planRegularPurchaseDisabled" dark right size="20">mdi-cart-outline</v-icon>
                <span v-if="planRegularPurchaseDisabled">Attention Required</span>
                <v-icon
                  v-if="planRegularPurchaseDisabled"
                  dark
                  right
                  size="20"
                >mdi-alert-circle-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels v-for="pd in planDiscountKeys" :key="pd" class="custom-card-wrapper">
      <v-expansion-panel>
        <v-expansion-panel-header class="custom-plan-header">
          <div class="mt-1 mb-2">
            <div class="custom-plan-title-wrap">
              <v-card-title class="custom-plan-title" disabled>
                <v-icon left color="deep-orange lighten-2" size="30">mdi-ticket-percent</v-icon>
                {{pd}} Plan
              </v-card-title>
            </div>
            <div class="custom-plan-chip-wrap">
              <v-chip color="rgb(117, 149, 166)" outlined>
                <span class="plan-info">Cost: {{planDiscountDetails[pd].Cost}}</span>
              </v-chip>
              <v-chip color="rgb(117, 149, 166)" outlined class="mx-2">
                <span class="plan-info">Valid: {{planDiscountDetails[pd].Validity}}</span>
              </v-chip>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            <div>
              <span class="plan-info">{{planDiscountDetails[pd].Description}}</span>
            </div>
            <div class="custom-plan-purchase-wrap">
              <v-btn
                rounded
                outlined
                color="#168834ba"
                elevation="0"
                @click="planPurchase(pd, planDiscountDetails[pd].Cost)"
              >
                <span v-if="!planDiscountPurchaseDisabled">Purchase</span>
                <v-icon v-if="!planDiscountPurchaseDisabled" dark right size="20">mdi-cart-outline</v-icon>
                <span v-if="planDiscountPurchaseDisabled">Attention Required</span>
                <v-icon
                  v-if="planDiscountPurchaseDisabled"
                  dark
                  right
                  size="20"
                >mdi-alert-circle-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog persistent scrollable v-model="cardAdd" width="40vw">
      <v-card>
        <v-card-text class="pb-10">
          <v-row>
            <v-col cols="6">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARDHOLDERS NAME</v-subheader>
              <v-text-field
                single-line
                label="Name"
                v-model="cardAddData.Name"
                :rules="[rules.required]"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="6">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
              <v-text-field
                single-line
                outlined
                maxlength="16"
                mask="credit-card"
                label="Number"
                v-model="cardAddData.Number"
                hide-details
                :rules="[rules.required]"
                class="inputPrice"
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>
              <v-select
                :items="MonthList"
                label="Month"
                v-model="cardAddData.Month"
                outlined
                :rules="[rules.required]"
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
              <v-select
                :items="YearList"
                label="Year"
                v-model="cardAddData.Year"
                outlined
                :rules="[rules.required]"
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
              <v-text-field
                single-line
                label="CVV"
                v-model="cardAddData.CVV"
                :rules="[rules.required]"
                maxlength="3"
                outlined
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="ma-1">
          <v-btn fab small dark color="blue-grey lighten-1" elevation="0" @click="cardAdd = false">
            <v-icon dark size="25">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab small dark elevation="0" color="success" @click="addCard()">
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
              <v-text-field
                single-line
                label="Name"
                v-model="cardChangeData.Name"
                :rules="[rules.required]"
                outlined
                hide-details
              />
            </v-col>
            <v-col cols="6">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CARD NUMBER</v-subheader>
              <v-text-field
                single-line
                outlined
                maxlength="16"
                mask="credit-card"
                label="Number"
                :rules="[rules.required]"
                v-model="cardChangeData.Number"
                hide-details
                class="inputPrice"
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">EXPIRY DATE</v-subheader>
              <v-select
                :items="MonthList"
                label="Month"
                v-model="cardChangeData.Month"
                outlined
                :rules="[rules.required]"
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>
              <v-select
                :items="YearList"
                label="Year"
                v-model="cardChangeData.Year"
                outlined
                :rules="[rules.required]"
                append-icon="mdi-chevron-down"
                hide-details
              />
            </v-col>
            <v-col col="4">
              <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>
              <v-text-field
                single-line
                label="CVV"
                v-model="cardChangeData.CVV"
                :rules="[rules.required]"
                maxlength="3"
                outlined
                hide-details
              />
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
          <v-btn fab small dark elevation="0" color="success" @click="changeCard()">
            <v-icon dark>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent scrollable v-model="studentCard" width="40vw">
      <v-card>
        <v-card-text class="padding-zero">
          <v-stepper v-model="e6" vertical class="padding-zero">
            <v-stepper-step color="blue lighten-4" :complete="e6 > 1" step="1">
              <span class="custom-student-step-title">Upload ID Front Side</span>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card elevation="0" height="200px">
                <div class="student-upload-wrapper">
                  <img
                    v-if="studentFront"
                    :src="studentFront"
                    height="190px"
                  />
                  <div v-if="studentFront" class="student-image-wrapper"></div>
                  <input
                    type="file"
                    accept="image/*"
                    style="display:none"
                    ref="studentPicFront"
                    @change="pictureSelectFront"
                  />
                  <v-btn
                    :loading="loading"
                    @click.native="loader = 'loading'"
                    @click.exact="studentUploadFront()"
                    elevation="0"
                    fab
                    color="blue-grey"
                    small
                    dark
                    class="student-upload-button"
                  >
                    <v-icon>mdi-upload</v-icon>
                  </v-btn>
                </div>
              </v-card>
              <v-btn rounded outlined color="rgb(117, 149, 166)" @click="e6 = 2">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-step color="blue lighten-4" :complete="e6 > 2" step="2">
              <span class="custom-student-step-title">Upload ID Back Side</span>
            </v-stepper-step>
            <v-stepper-content step="2">
              <v-card elevation="0" height="200px">
                <div class="student-upload-wrapper">
                  <img
                    v-if="studentBack"
                    :src="studentBack"
                    height="190px"
                  />
                  <div v-if="studentBack" class="student-image-wrapper"></div>
                  <input
                    type="file"
                    accept="image/*"
                    style="display:none"
                    ref="studentPicBack"
                    @change="pictureSelectBack"
                  />
                  <v-btn
                    :loading="loading"
                    @click.native="loader = 'loading'"
                    @click.exact="studentUploadBack()"
                    elevation="0"
                    fab
                    color="blue-grey"
                    small
                    dark
                    class="student-upload-button"
                  >
                    <v-icon>mdi-upload</v-icon>
                  </v-btn>
                </div>
              </v-card>
              <v-btn rounded outlined color="rgb(117, 149, 166)" @click="e6 = 1" class="mr-4">Return</v-btn>
              <v-btn rounded outlined color="rgb(117, 149, 166)" @click="e6 = 3">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-step color="blue lighten-4" :complete="e6 > 3" step="3">
              <span class="custom-student-step-title">Upload ID Selfie</span>
              <small style="font-weight:400 !important;">Upload a Selfie holding the ID</small>
            </v-stepper-step>
            <v-stepper-content step="3">
              <v-card elevation="0" height="200px">
                <div class="student-upload-wrapper">
                  <img
                    v-if="studentSelfie"
                    :src="studentSelfie"
                    height="190px"
                  />
                  <div v-if="studentSelfie" class="student-image-wrapper"></div>
                  <input
                    type="file"
                    accept="image/*"
                    style="display:none"
                    ref="studentPicSelfie"
                    @change="pictureSelectSelfie"
                  />
                  <v-btn
                    :loading="loading"
                    @click.native="loader = 'loading'"
                    @click.exact="studentUploadSelfie()"
                    elevation="0"
                    fab
                    color="blue-grey"
                    small
                    dark
                    class="student-upload-button"
                  >
                    <v-icon>mdi-upload</v-icon>
                  </v-btn>
                </div>
              </v-card>
              <v-btn rounded outlined color="rgb(117, 149, 166)" @click="e6 = 2" class="mb-4">Return</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="ma-1">
          <v-btn
            fab
            small
            dark
            color="blue-grey lighten-1"
            elevation="0"
            @click="studentCard = false"
          >
            <v-icon dark size="25">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            fab
            small
            elevation="0"
            color="success"
            @click="studentSubmit()"
            :disabled="studentSubmitDisabled"
          >
            <v-icon dark>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="studentNotification" :timeout="4000" color="success">
      <span class="card-modify">Your Student ID has been uploaded</span>
    </v-snackbar>
    <v-snackbar v-model="purchaseNotification" :timeout="1500" color="success">
      <span class="card-modify">The plan was added to your wallet</span>
    </v-snackbar>
    <v-snackbar v-model="purchaseError.status" :timeout="3000" color="error">
      <span class="card-modify">{{purchaseError.reason}}</span>
    </v-snackbar>
    <v-snackbar v-model="cardAddNotification" :timeout="2000" color="success">
      <span class="card-modify">The Card has been added</span>
    </v-snackbar>
    <v-snackbar v-model="cardChangeNotification" :timeout="2000" color="success">
      <span class="card-modify">The Card has been changed</span>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "TravelPlans",
  data() {
    return {
      e6: 1,
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
      planRegularPurchaseDisabled: false,
      planDiscountPurchaseDisabled: false,
      card: false,
      cardChange: false,
      cardAdd: false,
      cardAddData: {
        Name: null,
        Number: null,
        Year: null,
        Month: null,
        CVV: null
      },
      cardAddNotification: false,
      cardChangeData: {
        Name: null,
        Number: null,
        Year: null,
        Month: null,
        CVV: null
      },
      cardChangeNotification: false,
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
      purchaseNotification: false,
      purchaseError: {
        status: false,
        reason: null
      },
      walletData: {
        status: false,
        length: false,
        plan: null
      },
      studentPictures: {
        front: null,
        back: null,
        selfie: null
      },
      studentCard: false,
      studentSubmitDisabled: true,
      studentNotification: false,
      studentPicFront: null,
      studentPicBack: null,
      studentPicSelfie: null,
      studentFront: null,
      studentBack: null,
      studentSelfie: null,
      loading: false,
      isStudent: false,
      studentID: null,
      studentValid: null,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },

  created() {
    this.cardDetail();
    this.plansSUT();
    this.walletDataCheck();
    this.studentData();
    this.plansRegular();
    this.plansDiscount();
    this.years();
    this.studentSubmitDisable();
  },

  watch: {},

  computed: {
    studentSubmitDisable() {
      if (this.studentFront !== null) {
        if (this.studentBack !== null) {
          if (this.studentSelfie !== null) {
            this.studentSubmitDisabled = false;
          } else {
            this.studentSubmitDisabled = true;
          }
        } else {
          this.studentSubmitDisabled = true;
        }
      } else {
        this.studentSubmitDisabled = true;
      }
    }
  },

  mounted() {},

  methods: {
    curday(sp) {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      return dd + sp + mm + sp + yyyy;
    },
    curtime() {
      let today = new Date();
      let hh = today.getHours();
      let mm = today.getMinutes();
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      let time = hh + ":" + mm;
      return time;
    },
    addCard() {
      let digits = this.cardAddData.Year.toString();
      let year = digits.substr(digits.length - 2);
      let expiry = this.cardAddData.Month + "/" + year;
      firebase
        .database()
        .ref("CardDetails/" + this.$store.getters.user.uid)
        .set({
          CardHolder: this.cardAddData.Name,
          CardNumber: this.cardAddData.Number,
          CVV: this.cardAddData.CVV,
          Expiry: expiry
        });
      this.cardAddNotification = true;
      this.cardAdd = false;
    },
    changeCard() {
      let digits = this.cardChangeData.Year.toString();
      let year = digits.substr(digits.length - 2);
      let expiry = this.cardChangeData.Month + "/" + year;
      firebase
        .database()
        .ref("CardDetails/" + this.$store.getters.user.uid)
        .update({
          CardHolder: this.cardChangeData.Name,
          CardNumber: this.cardChangeData.Number,
          CVV: this.cardChangeData.CVV,
          Expiry: expiry
        });
      this.cardChangeNotification = true;
      this.cardChange = false;
    },
    studentUploadFront() {
      this.$refs.studentPicFront.click();
    },
    pictureSelectFront(payload) {
      const selectedFile = payload.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.imageUrl = selectedFile;
      this.studentPictures.front = this.imageUrl
      this.studentFront = URL.createObjectURL(selectedFile)
    },
    studentUploadBack() {
      this.$refs.studentPicBack.click();
    },
    pictureSelectBack(payload) {
      const selectedFile = payload.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.imageUrl = selectedFile;
      this.studentPictures.back = this.imageUrl
      this.studentBack = URL.createObjectURL(selectedFile)
    },
    studentUploadSelfie() {
      this.$refs.studentPicSelfie.click();
    },
    pictureSelectSelfie(payload) {
      const selectedFile = payload.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.imageUrl = selectedFile
      this.studentPictures.selfie= this.imageUrl
      this.studentSelfie = URL.createObjectURL(selectedFile)
    },
    studentSubmit() {
      firebase.storage().ref("/" + this.$store.getters.user.uid + "/studentID/front").put(this.studentPictures.front)
      firebase.storage().ref("/" + this.$store.getters.user.uid + "/studentID/back").put(this.studentPictures.back)
      firebase.storage().ref("/" + this.$store.getters.user.uid + "/studentID/selfie").put(this.studentPictures.selfie)
      firebase
        .database()
        .ref("Users/" + this.$store.getters.user.uid + "/Student")
        .set({
          Status: "pending"
        });
      firebase
        .database()
        .ref("StudentValidation/" + this.$store.getters.user.uid)
        .set({
          Name: this.$store.getters.userName
        });
      this.studentNotification = true;
      this.studentCard = false;
    },
    planPurchase(plan, cost) {
      let card = this.card;
      let student = this.isStudent;
      let wallet = this.walletData.status;
      let walletKeys = this.walletData.length;
      let walletPlan = this.walletData.plan;
      this.purchaseError.status = false;
      this.purchaseError.message = null;
      if (wallet === true) {
        if (walletKeys === true) {
          this.purchaseError.status = true;
          this.purchaseError.reason =
            "You reached the limit of Plans in the Wallet";
        } else {
          if (card === true) {
            if (walletPlan === plan) {
              this.purchaseError.status = true;
              this.purchaseError.reason =
                "Can't have 2 Plans of the same Type in the Wallet";
            } else {
              if (plan === "Monthly Student") {
                if (student === "approved") {
                  this.purchaseNotification = false;
                  firebase
                    .database()
                    .ref("Wallet/" + this.$store.getters.user.uid + "/" + plan)
                    .set({
                      Activated: "false",
                      Purchased: this.curday("-")
                    });
                  firebase
                    .database()
                    .ref(
                      "History/Purchase/" + this.$store.getters.user.uid + "/"
                    )
                    .push({
                      Type: plan,
                      Time: this.curtime(),
                      Date: this.curday("-"),
                      Cost: cost
                    });
                  this.purchaseNotification = true;
                } else {
                  this.purchaseError.status = true;
                  this.purchaseError.reason =
                    "You don't have an approved student ID";
                }
              } else {
                this.purchaseNotification = false;
                firebase
                  .database()
                  .ref("Wallet/" + this.$store.getters.user.uid + "/" + plan)
                  .set({
                    Activated: "false",
                    Purchased: this.curday("-")
                  });
                firebase
                  .database()
                  .ref("History/Purchase/" + this.$store.getters.user.uid + "/")
                  .push({
                    Type: plan,
                    Time: this.curtime(),
                    Date: this.curday("-"),
                    Cost: cost
                  });
                this.purchaseNotification = true;
              }
            }
          } else {
            this.purchaseError.status = true;
            this.purchaseError.reason =
              "You don't have a Card linked to your Account";
          }
        }
      } else {
        if (card === true) {
          if (plan === "Monthly Student") {
            if (student === "approved") {
              this.purchaseNotification = false;
              firebase
                .database()
                .ref("Wallet/" + this.$store.getters.user.uid + "/" + plan)
                .set({
                  Activated: "false",
                  Purchased: this.curday("-")
                });
              firebase
                .database()
                .ref("History/Purchase/" + this.$store.getters.user.uid + "/")
                .push({
                  Type: plan,
                  Time: this.curtime(),
                  Date: this.curday("-"),
                  Cost: cost
                });
              this.purchaseNotification = true;
            } else {
              this.purchaseError.status = true;
              this.purchaseError.reason =
                "You don't have an approved student ID";
            }
          } else {
            this.purchaseNotification = false;
            firebase
              .database()
              .ref("Wallet/" + this.$store.getters.user.uid + "/" + plan)
              .set({
                Activated: "false",
                Purchased: this.curday("-")
              });
            firebase
              .database()
              .ref("History/Purchase/" + this.$store.getters.user.uid + "/")
              .push({
                Type: plan,
                Time: this.curtime(),
                Date: this.curday("-"),
                Cost: cost
              });
            this.purchaseNotification = true;
          }
        } else {
          this.purchaseError.status = true;
          this.purchaseError.reason =
            "You don't have a Card linked to your Account";
        }
      }
    },
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
          if (snap.val() == null) {
            this.card = false;
          } else {
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
          }
        });
    },
    studentData() {
      firebase
        .database()
        .ref("Users/" + this.$store.getters.user.uid + "/Student")
        .on("value", snap => {
          let myObj = snap.val();
          if (myObj !== null) {
            this.isStudent = myObj.Status;
            this.studentID = myObj.ID;
            this.studentValid = myObj.Valid;
          } else {
            this.isStudent = false;
            this.stundetID = null;
            this.studentValid = null;
          }
        });
    },
    years() {
      const year = new Date().getFullYear();
      let years = Array.from(
        { length: year - 2010 },
        (value, index) => 2020 + index
      );
      this.YearList = years.reverse();
    },
    walletDataCheck() {
      firebase
        .database()
        .ref("Wallet/" + this.$store.getters.user.uid)
        .on("value", snap => {
          let myObj = snap.val();
          if (myObj !== null) {
            this.walletData.status = true;
            let keys = Object.keys(snap.val());
            if (keys.length >= 2) {
              this.walletData.length = true;
            } else {
              this.walletData.length = false;
              this.walletData.plan = keys[0];
            }
          } else {
            this.walletData.status = false;
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

.custom-back-button {
  position: absolute;
  left: 0.5vw;
  top: 0vh;
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
  width: 40vw;
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
.custom-plan-header {
  min-height: 45px;
  padding: 0px 13px 0px 11px;
}
.custom-card-button {
  align-self: center;
  justify-self: end;
}
.card-info {
  font-weight: 600;
  font-size: 1.1rem;
  align-self: center;
  justify-self: center;
}
.custom-plan-chip-wrap {
  margin-top: 5px;
}
.custom-plan-purchase-wrap {
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
  grid-template-columns: 0.9fr 8fr 2fr;
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
.card-modify {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}
.student-upload-wrapper {
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: center;
}

.student-image-wrapper {
  position: absolute;
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.2);
}

.student-upload-button {
  display: flex;
  align-self: center;
  position: absolute;
}

.padding-zero {
  padding: 0px !important;
}

.custom-student-step-title {
  font-weight: 500;
  font-size: 1rem;
}
</style>