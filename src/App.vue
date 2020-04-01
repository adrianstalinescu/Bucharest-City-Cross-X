<template>
  <v-app id="app">
    <!-- <v-app-bar v-if="this.$store.getters.user" app color="rgba(0, 0, 0, 0.26)" dense flat dark>
      <div class="custom-app-toolbar">
        <v-tabs class="custom-toolbar-buttons" fixed-tabs background-color="transparent">
          <v-tab to="/home">
            Home
            <v-icon color="white" size="20" class="ma-2">mdi-home</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab v-if="this.$store.getters.userRole === 'admin'" to="/admin">
            Admin
            <v-icon color="white" size="20" class="ma-2">mdi-view-dashboard-variant</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/map">
            Transit
            <v-icon color="white" size="20" class="ma-2">mdi-map</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/plans">
            Plans
            <v-icon color="white" size="20" class="ma-2">mdi-ticket</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/wallet">
            Wallet
            <v-icon color="white" size="20" class="ma-2">mdi-wallet</v-icon>
          </v-tab>
        </v-tabs>
        <div class="custom-badges">
          
          
        </div>
      </div>
    </v-app-bar> -->
    <v-content >
     
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      
    </v-content>
  </v-app>
</template>

<script>

/* eslint-disable */
export default {
  name: "App",

  data() {
    return {
      
     
      
    };
  },

  created() {
    this.$store.dispatch("AuthChange");
  },

  watch: {
    
  },

  computed: {},

  mounted() {
    
  },

  methods: {
    
    
  }
};
</script>

<style scoped>
#app {
  background: #27aae1;
}

.router-link-transparency {
  color: transparent;
}

.fade-enter-active{
  transition: all 0.2s;
}

.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter {
  opacity: 0;
  /* transform: translateY(-10%) */
}
.fade-leave-to {
  opacity: 0;
  /* transform: translateY(10%) */
}



.custom-toolbar-buttons {
  width: 87.6vw;
  height: 100%;
}

.custom-badges {
  height: 100%;
  width: 11vw;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.custom-app-toolbar {
  width: 100%;
  height: 100%;
  display: -webkit-box;
}


</style>