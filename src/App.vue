<template>
  <v-app id="app">
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

  created() {
    this.$store.dispatch("AuthChange");
  }
};
</script>

<style scoped>
#app {
  background: #27aae1;
}

.fade-enter-active{
  transition: all 0.2s;
}

.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>