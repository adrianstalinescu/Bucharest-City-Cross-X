<template>
  <div class="lines-wrapper">
    <v-card class="custom-lines-menu-wrapper" outlined elevation="0">
      <v-expansion-panels multiple accordion class="custom-lines-menu">
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-2">
            <div class="custom-expansion-panel-header">
              <v-icon color="success" size="30">mdi-bus</v-icon>
              <v-chip small color="success ml-1" outlined>
                <span class="custom-line-number">Express BUS</span>
                <v-icon size="20">mdi-chevron-right</v-icon>
                <span class="custom-line-number">R141</span>
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="custom-expansion-panel-dropdown">
            <div class="custom-line ma-1">
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                >
                  <span class="custom-direction-text">Ghencea</span>
                </v-btn>
              </div>
              <div class="ma-1">
                <v-icon>mdi-arrow-up-down</v-icon>
              </div>
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                >
                  <span class="custom-direction-text">Aeroport Henri Coanda Plecari</span>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-2">
            <div class="custom-expansion-panel-header">
              <v-icon color="cyan" size="30">mdi-tram</v-icon>
              <v-chip small dark color="cyan ml-1" outlined>
                <span class="custom-line-number">TRAM</span>
                <v-icon size="20">mdi-chevron-right</v-icon>
                <span class="custom-line-number">41</span>
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="custom-expansion-panel-dropdown">
            <div class="custom-line ma-1">
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                >
                  <span class="custom-direction-text">Ghencea</span>
                </v-btn>
              </div>
              <div class="ma-1">
                <v-icon>mdi-arrow-up-down</v-icon>
              </div>
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                >
                  <span class="custom-direction-text">Aeroport Henri Coanda Plecari</span>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-2">
            <div class="custom-expansion-panel-header">
              <v-icon color="teal" size="30">mdi-bus</v-icon>
              <v-chip small dark outlined color="teal ml-1">
                <span class="custom-line-number">TROLLEYBUS</span>
                <v-icon size="20">mdi-chevron-right</v-icon>
                <span class="custom-line-number">90</span>
              </v-chip>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="custom-expansion-panel-dropdown">
            <div class="custom-line ma-1">
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                >
                  <span class="custom-direction-text">Ghencea</span>
                </v-btn>
              </div>
              <div class="ma-1">
                <v-icon>mdi-arrow-up-down</v-icon>
              </div>
              <div>
                <v-btn
                  rounded
                  dark
                  elevation="0"
                  outlined
                  color="rgb(117, 149, 166)"
                  class="custom-direction-button"
                >
                  <span class="custom-direction-text">Aeroport Henri Coanda Plecari</span>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <div>MAP goes HERE</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Lines",
  data() {
    return {};
  },

  created() {},

  watch: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>

<style scoped>
.lines-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  background: url("https://picsum.photos/1920/1080?random");
}

.custom-lines-menu-wrapper {
  align-self: center;
  overflow-y: auto;
  width: 20vw;
  height: 100%;
}

.custom-line {
  align-self: center;
  flex: none !important;
}

.custom-line-number {
  padding: 0px;
  margin-bottom: 0px !important;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
  font-size: 0.9rem;
  color: inherit;
}

.custom-expansion-panel-dropdown {
  text-align: -webkit-center;
}

.custom-expansion-panel-header {
  text-align: -webkit-left;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 0px;
}

.custom-direction-button {
  height: auto !important;
  max-width: 225px;
  min-height: 5vh;
}

.custom-direction-text {
  margin-bottom: 5px;
  margin-top: 5px;
  max-width: 205px;
  white-space: normal;
}
</style>