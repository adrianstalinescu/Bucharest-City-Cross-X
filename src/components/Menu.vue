<template>
    <div class="menu-wrapper">
        <div class="text-center ma-5">
            <router-link to="/" class="router-link-transparency">
                <v-btn 
                fab 
                dark 
                :ripple="false"
                color="blue-grey lighten-1"
                elevation="0"
                >
                    <v-icon 
                    dark
                    size="25"
                    >
                        mdi-close
                    </v-icon>
                </v-btn>
            </router-link>
        </div>
        <v-container class="mt-10">
            <v-row
            no-gutters
            >
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <v-avatar 
                        size="100"
                        >
                            <v-btn
                            width="100%"
                            height="100%"
                            color="green lighten-1"
                            fab
                            elevation="0"
                            v-on:click="profileDlg = true"
                            >
                                <v-avatar 
                                width="100px"
                                height="100px"
                                color="teal"
                                >
                                    <img
                                    src="https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg"
                                    >
                                </v-avatar>
                            </v-btn>
                        </v-avatar>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            Profile
                        </span>
                    </v-row>
                </v-col>
                <v-dialog
                persistent
                scrollable
                v-model="profileDlg"
                width="500"
                >
                    <v-card>
                        <v-card-title
                        class="headline"
                        >
                            Profile
                        </v-card-title>
                        <v-card-text style="height: 70vh;">
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
                        </v-card-text>
                        <v-card-actions class="ma-2">
                            <v-btn 
                            fab
                            small
                            dark
                            color="blue-grey lighten-1"
                            elevation="0"
                            @click="profileDlg = false"
                            >
                                <v-icon 
                                dark
                                size="25"
                                >
                                    mdi-close
                                </v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn 
                            fab
                            small
                            dark
                            color="success"
                            elevation="0"
                            @click="profileDlg = false"
                            >
                                <v-icon 
                                dark
                                size="25"
                                >
                                    mdi-arrow-right
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <router-link to="/plans" class="router-link-transparency">
                            <v-avatar 
                            size="100"
                            >
                                <v-btn
                                width="100%"
                                height="100%"
                                color="green lighten-1"
                                fab
                                elevation="0"
                                >
                                    <v-icon 
                                    color="white"
                                    size="70"
                                    >
                                        mdi-ticket
                                    </v-icon>
                                </v-btn>
                            </v-avatar>
                        </router-link>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            Travel Plans
                        </span>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <router-link to="/wallet" class="router-link-transparency">
                            <v-avatar 
                            size="100"
                            >
                                <v-btn
                                width="100%"
                                height="100%"
                                color="green lighten-1"
                                fab
                                elevation="0"
                                >
                                    <v-icon 
                                    color="white"
                                    size="70"
                                    >
                                        mdi-wallet
                                    </v-icon>
                                </v-btn>
                            </v-avatar>
                        </router-link>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            Wallet
                        </span>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <router-link to="/history" class="router-link-transparency">
                            <v-avatar 
                            size="100"
                            >
                                <v-btn
                                width="100%"
                                height="100%"
                                color="green lighten-1"
                                fab
                                elevation="0"
                                >
                                    <v-icon 
                                    color="white"
                                    size="70"
                                    >
                                        mdi-format-list-bulleted-square
                                    </v-icon>
                                </v-btn>
                            </v-avatar>
                        </router-link>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            History
                        </span>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="mt-10">
            <v-row
            no-gutters
            >
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                    <router-link to="/buses" class="router-link-transparency">
                        <v-avatar 
                        size="100"
                        >
                            <v-btn
                            width="100%"
                            height="100%"
                            color="green lighten-1"
                            fab
                            elevation="0"
                            >
                                <v-icon 
                                color="white"
                                size="70"
                                >
                                    mdi-bus
                                </v-icon>
                            </v-btn>
                        </v-avatar>
                    </router-link>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            Buses
                        </span>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <router-link to="/trams" class="router-link-transparency">
                            <v-avatar 
                            size="100"
                            >
                                <v-btn
                                width="100%"
                                height="100%"
                                color="green lighten-1"
                                fab
                                elevation="0"
                                >
                                    <v-icon 
                                    color="white"
                                    size="70"
                                    >
                                        mdi-tram
                                    </v-icon>
                                </v-btn>
                            </v-avatar>
                        </router-link>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            Trams
                        </span>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <router-link to="/metro" class="router-link-transparency">
                            <v-avatar 
                            size="100"
                            >
                                <v-btn
                                width="100%"
                                height="100%"
                                color="green lighten-1"
                                fab
                                elevation="0"
                                >
                                    <v-icon 
                                    color="white"
                                    size="70"
                                    >
                                        mdi-subway
                                    </v-icon>
                                </v-btn>
                            </v-avatar>
                        </router-link>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            Metro
                        </span>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <router-link to="/stations" class="router-link-transparency">
                            <v-avatar 
                            size="100"
                            >
                                <v-btn
                                width="100%"
                                height="100%"
                                color="green lighten-1"
                                fab
                                elevation="0"
                                >
                                    <v-icon 
                                    color="white"
                                    size="70"
                                    >
                                        mdi-bus-stop-covered
                                    </v-icon>
                                </v-btn>
                            </v-avatar>
                        </router-link>
                    </v-row>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <span class="menu-content-title">
                            Stations
                        </span>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="mt-10">
            <v-row
            no-gutters
            >
                <v-col>
                    <v-row
                    align="start"
                    justify="center"
                    >
                        <v-btn 
                        x-large 
                        rounded 
                        elevation="0"
                        color="error"
                        >
                            <v-icon left>
                                mdi-logout
                            </v-icon>
                            Log Out
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "Menu",

    data() {
        return {
            profileDlg: false,
        }
    },
}

</script>

<style scoped>

.router-link-transparency {
  color: transparent;
}

.menu-wrapper {
    background-color:white; 
    width:100%; 
    height: 100%; 
    position: absolute; 
    top: 0; 
    z-index: 10;
}

.menu-content-title {
    font-size: 20px;
    font-weight: bold;
}

</style>