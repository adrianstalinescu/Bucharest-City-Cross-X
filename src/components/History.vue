<template>
  <div class="history-wrapper">
    <div class="history-wrapper">
      <v-card class="custom-card-wrapper" outlined elevation="0">
        <div class="custom-history-title-wrap ma-2">
          <v-card-title class="custom-history-title">
            <v-icon left color="green" size="30">mdi-progress-clock</v-icon>Purchased
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
            <v-icon left color="green" size="30">mdi-map-clock</v-icon>Searched
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
          text: "Title",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Date", sortable: false, value: "date" },
        { text: "Amount", sortable: false, value: "amount" }
      ],
      purchased: [
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
        }
      ],
      headerSearched: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "Date", sortable: false, value: "date" }
      ],
      searched: [
        {
          title: "Piata Unirii",
          date: "02-02-2020"
        },
        {
          title: "Universitatea Romano Americana",
          date: "15-02-2020"
        },
        {
          title: "Preciziei",
          date: "12-02-2020"
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