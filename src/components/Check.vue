<template>
    <div>
        <v-dialog fullscreen v-model="progress">
            <div class="check-wrapper">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    size="100"
                    class="loader"
                ></v-progress-circular>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import router from '../router/index'
import firebase from '@/firebase'
/* eslint-disable */
export default {
  name: "Check",
  data() {
    return {
        progress: true
    };
  },

    created() {
        this.user();
    },
    methods: {
        user() {
            this.progress = true
            firebase.auth().onAuthStateChanged((user) => {
                if (user === null) {
                    this.progress = false
                    router.replace({ path: '/entrance' }) 
                } else {
                    this.progress = false
                    router.replace({ path: '/home' })
                }
            })
        }
    }
};
</script>

<style scoped>
.check-wrapper {
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
}

.loader {
  align-self: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
