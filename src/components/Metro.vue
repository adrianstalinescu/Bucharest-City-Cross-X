<template>
    <div class="metro-wrapper">
        <div class="text-center" style="height:100%;">
            <v-card 
            flat
            width="100%" 
            height="100%"
            >
                <v-card-title
                class="metro-top-bar ma-3 text-center"
                >
                    <div>
                        <router-link to="/menu" class="router-link-transparency">
                            <v-btn 
                            small
                            fab 
                            dark 
                            color="blue-grey lighten-1"
                            elevation="0"
                            >
                                <v-icon 
                                dark
                                size="25"
                                >
                                    mdi-arrow-left
                                </v-icon>
                            </v-btn>
                        </router-link>
                    </div>
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "Metro",
    data() {
        return {
        }
    },

    created() {
    },

    watch: {
    },
    
    computed: {
    },

    mounted () {
    },

    methods: {
    }
}

</script>

<style scoped>

.router-link-transparency {
  color: transparent;
}

.metro-wrapper {
    background-color:white; 
    width:100%; 
    height: 100%; 
    position: absolute; 
    top: 0; 
    z-index: 10;
}

.metro-top-bar {
    padding:0;
}
</style>