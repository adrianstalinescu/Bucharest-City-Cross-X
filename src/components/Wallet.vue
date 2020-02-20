<template>
  <div class="wallet-wrapper">
    <div class="plans-wrapper">
      <v-card class="custom-card-wrapper" width="53vw" outlined elevation="0">
        <div class="custom-card-grid">
          <v-icon size="40" color="amber darken-4">mdi-ticket-outline</v-icon>
          <span class="card-info">Monthly Student Plan</span>
          <span class="card-info">Valid untill 11/04</span>
          <v-btn
            rounded
            disabled
            color="teal darken-4"
            elevation="0"
            class="justify-center ma-3 white--text"
            @click="planActive = true"
          >
            Active
            <v-icon dark right size="20">mdi-checkbox-marked-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-card>
      <v-card class="custom-card-wrapper" width="53vw" outlined elevation="0">
        <div class="custom-card-grid">
          <v-icon size="40" color="amber darken-4">mdi-ticket-outline</v-icon>
          <span class="card-info">Monthly Plan</span>
          <span class="card-info">Inactive</span>
          <v-btn
            rounded
            color="teal darken-4"
            elevation="0"
            class="justify-center ma-3 white--text"
            @click="cardChange = true"
          >
            Activate
            <v-icon dark right size="20">mdi-checkbox-marked-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-card>
      <v-card class="custom-card-wrapper" width="40vw" outlined elevation="0">
        <div class="custom-plan-card-wrap ma-2">
          <v-card-title class="custom-plan-title ml-3 mr-3">
            <v-icon left color="amber darken-4" size="30">mdi-ticket</v-icon>Single Use Tickets (SUT)
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Wallet",
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
  margin-top: 5vh;
  margin-bottom: 5vh;
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

.card-info {
  font-weight: 600;
  font-size: 1.3rem;
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
</style>