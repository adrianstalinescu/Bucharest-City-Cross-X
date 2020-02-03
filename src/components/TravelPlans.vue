<template>
    <div class="travel-plans-wrapper">
        <div class="text-center" style="height:100%;">
            <v-card 
            flat
            width="100%" 
            height="100%"
            >
                <v-toolbar
                flat
                class="travel-plans-top-bar ma-3 text-center"
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
                    <v-toolbar-title 
                    class="margin-L-R"
                    >
                        Travel Plans
                    </v-toolbar-title>
                </v-toolbar>
            </v-card>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "TravelPlans",
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

.scroll {
    overflow-y: auto;
}

.router-link-transparency {
  color: transparent;
}

.travel-plans-wrapper {
    background-color:white; 
    width:100%; 
    height: 100%; 
    position: absolute; 
    top: 0; 
    z-index: 10;
}

.travel-plans-top-bar {
    padding:0;
}

.margin-L-R {
    margin-right: auto;
    margin-left: auto;
    font-weight: 400;
    font-size: 1.7em;
}
</style>