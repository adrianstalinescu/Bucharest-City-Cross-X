<template>
    <div class="travel-plans-wrapper">
        <div class="text-center" style="height:100%;">
            <v-card 
            flat
            width="100%" 
            height="100%"
            >
                <v-card-title
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
                </v-card-title>
                <v-card-text class="scroll" style="height: 90vh;">
                    <v-row justify="space-around">
                        <v-avatar 
                        width="150px"
                        height="150px"
                        color="teal"
                        >
                            <img
                            src="https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg"
                            >
                        </v-avatar>
                    </v-row>
                    <v-row justify="space-around">
                        <v-btn
                        color="blue-grey"
                        class="ma-2 white--text"
                        >
                            Upload
                                <v-icon 
                                right 
                                dark
                                >
                                    mdi-cloud-upload
                                </v-icon>
                        </v-btn>
                    </v-row>
                    <v-row justify="space-around" class="ml-3 mr-3 mt-3">
                        <v-text-field
                        value=""
                        label="Name"
                        outlined
                        disabled
                        ></v-text-field>
                    </v-row>
                    <v-row justify="space-around" class="ml-3 mr-3">
                        <v-text-field
                        value=""
                        label="Email"
                        outlined
                        disabled
                        ></v-text-field>
                    </v-row>
                    <v-row justify="space-around" class="ml-3 mr-3">
                        <v-text-field
                        value=""
                        label="Phone"
                        outlined
                        disabled
                        ></v-text-field>
                    </v-row>
                    <v-row justify="space-around" class="ml-3 mr-3">
                        <v-text-field
                        value=""
                        label="Phone"
                        outlined
                        disabled
                        ></v-text-field>
                    </v-row>
                    <v-row justify="space-around" class="ml-3 mr-3">
                        <v-text-field
                        value=""
                        label="Phone"
                        outlined
                        disabled
                        ></v-text-field>
                    </v-row>
                </v-card-text>
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
</style>