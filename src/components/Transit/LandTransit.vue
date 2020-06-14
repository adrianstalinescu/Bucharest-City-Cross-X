<template>
  <div class="transit-wrapper">
    <!-- back home button -->
    <router-link :to="'home'" class="custom-router-link-transparency">
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
    <!-- component navigation -->
    <div class="custom-navigation-buttons-wrapper">
      <router-link :to="'nearby'" class="custom-router-link-transparency">
        <v-btn 
          fab
          elevation="0" 
          class="custom-navigation-button"
          @mouseover="buttonsHover.nearby = true"
          @mouseleave="buttonsHover.nearby = false"
        >
          <transition name="fade-home-buttons" mode="out-in">
            <v-icon v-if="!buttonsHover.nearby" color="#D95033" size="60">mdi-map-marker-circle</v-icon>
            <span v-if="buttonsHover.nearby" style="font-size: 1.3rem; color: #D95033;">NEARBY</span>
          </transition>
        </v-btn>
      </router-link>
      <router-link :to="'route'" class="custom-router-link-transparency">
        <v-btn 
          fab 
          elevation="0" 
          class="custom-navigation-button"
          @mouseover="buttonsHover.route = true"
          @mouseleave="buttonsHover.route = false"
        >
          <transition name="fade-home-buttons" mode="out-in">
            <v-icon v-if="!buttonsHover.route" color="#D95033" size="60">mdi-map-marker-distance</v-icon>
            <span v-if="buttonsHover.route" style="font-size: 1.3rem; color: #D95033;">ROUTE</span>
          </transition>
        </v-btn>
      </router-link>
      <router-link :to="'info'" class="custom-router-link-transparency">
        <v-btn 
          fab 
          elevation="0" 
          class="custom-navigation-button"
          @mouseover="buttonsHover.info = true"
          @mouseleave="buttonsHover.info = false"
        >
          <transition name="fade-home-buttons" mode="out-in">
            <v-icon v-if="!buttonsHover.info" color="#D95033" size="60">mdi-information-outline</v-icon>
            <span v-if="buttonsHover.info" style="font-size: 1.3rem; color: #D95033;">INFO</span>
          </transition>
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Transit",
  data() {
    return {
      buttonsHover: {
        nearby: false,
        route: false,
        info: false
      }
    };
  },
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

.custom-navigation-buttons-wrapper {
  display:flex;
  width: 100%;
  position: absolute;
  bottom: 37.49vh;
  justify-content: space-around;
  background: url("../../assets/background/connector-line.svg") no-repeat;
  background-size: 100% 5vh;
  background-position: center;
}

.custom-navigation-button {
  align-self: center;
  width: 10.98vw !important;
  height: 23.62vh !important;
  padding: 0px !important;
  border: solid 1.9vh #D95033;
}

.transit-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(42,128,157,0.7399334733893557) 45%, rgba(30,109,135,1) 100%);
}

.fade-home-buttons-enter-active, .fade-home-buttons-leave-active {
  transition: opacity .15s;
}
.fade-home-buttons-enter, .fade-home-buttons-leave-to {
  opacity: 0;
}
</style>