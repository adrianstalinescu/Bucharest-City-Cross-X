<template>
  <div class="home-wrapper">
    <div class="home-background-wrapper"></div>
    <!-- profile button -->
    <div class="custom-profile-info-window-wrapper">
      <div class="custom-profile-wrapper">
        <svg id="rope-profile" height="31.5vh" width="0.7vw" class="home-profile-rope">
          <line x1="0" y1="0" x2="0" y2="16vh" style="stroke:#D95033;stroke-width:1.2vw" />
        </svg>
        <div class="home-user-welcome-message-wrapper">
          <span> Welcome {{welcomeEmoji}} <br>{{this.$store.getters.userName}}</span>
        </div>
        <div class="home-weather-wrapper">
          <img
            v-if="weather.icon"
            class="custom-weather-icon"
            :src="require('../assets/weather/' + weather.icon + '.png')"
          />
          <span
            v-if="weather.temperature"
            class="custom-weather-temperature"
          >{{ this.weather.temperature }}°C</span>
        </div>
        <div class="home-airquality-wrapper">
          <v-chip :color="this.airQualityParams.color" class="mr-1">
            <v-icon v-if="this.airQualityParams.level === 'VERY_LOW'" class="margin-air-icon">mdi-emoticon-happy-outline</v-icon>
            <v-icon v-if="this.airQualityParams.level === 'MEDIUM'" class="margin-air-icon">mdi-emoticon-neutral-outline</v-icon>
            <v-icon v-if="this.airQualityParams.level === 'HIGH'" class="margin-air-icon">mdi-emoticon-sad-outline</v-icon>
            <span>{{this.airQualityParams.value}} </span>
            <span class="font-size-caqi"> CAQI</span>
          </v-chip>
        </div>
        <div class="home-airquality-message">
          <span>{{this.airQualityParams.description}}</span>
        </div>
        <div class="home-weather-empty-wrapper">
          <span
            v-if="!weather.icon || !weather.temperature"
            class="custom-weather-empty"
          >No Weather</span>
        </div>
        <div class="align-self-center">
          <div class="ma-0 display-flex justify-content-center">
            <v-btn
              fab
              elevation="0"
              class="custom-profile-avatar"
              @click="profile = true"
              @mouseover="profileHover = true"
              @mouseleave="profileHover = false"
            >
              <v-overlay
                :absolute="true"
                :value="profileHover"
                opacity="0.6"
                class="custom-profile-overlay"
              >
                <v-icon v-if="profileHover" color="rgba(217, 80, 51, 0.9)" class="rotating" size="60">mdi-cog</v-icon>
              </v-overlay>
              <div v-if="!this.$store.getters.profilePicture" class="custom-profile-icon-empty">
                <v-icon class="font-size-profile-icon">mdi-account-circle</v-icon>
              </div>
              <img
                v-if="this.$store.getters.profilePicture"
                :src="this.$store.getters.profilePicture"
                class="custom-profile-button-picture"
              />
            </v-btn>
          </div>
          <div class="ma-0 display-flex justify-content-center">
            <v-btn
              rounded
              dark
              color="#d95033"
              elevation="0"
              class="custom-notification-button"
              @click="notificationDrawer = true"
            >
              <v-icon class="custom-notification-button-icon">mdi-bell</v-icon>
              <span v-if="this.$store.getters.notificationsCount" class="custom-notification-button-text">{{this.$store.getters.notificationsCount.length}}</span>
              <span v-if="!this.$store.getters.notificationsCount" class="custom-notification-button-text">0</span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <!-- component navigation -->
    <div class="custom-navigation-buttons-wrapper">
      <router-link :to="'transit'" class="custom-router-link-transparency">
        <v-btn 
          fab
          elevation="0" 
          class="custom-navigation-button"
          @mouseover="buttonsHover.transit = true"
          @mouseleave="buttonsHover.transit = false"
        >
          <transition name="fade-home-buttons" mode="out-in">
            <v-icon v-if="!buttonsHover.transit" color="#D95033" size="60">mdi-map</v-icon>
            <span v-if="buttonsHover.transit" style="font-size: 1.3rem; color: #D95033;">TRANSIT</span>
          </transition>
        </v-btn>
      </router-link>
      <router-link :to="'store'" class="custom-router-link-transparency">
        <v-btn 
          fab 
          elevation="0" 
          class="custom-navigation-button"
          @mouseover="buttonsHover.store = true"
          @mouseleave="buttonsHover.store = false"
        >
          <transition name="fade-home-buttons" mode="out-in">
            <v-icon v-if="!buttonsHover.store" color="#D95033" size="60">mdi-cart-outline</v-icon>
            <span v-if="buttonsHover.store" style="font-size: 1.3rem; color: #D95033;">STORE</span>
          </transition>
        </v-btn>
      </router-link>
      <router-link :to="'wallet'" class="custom-router-link-transparency">
        <v-btn 
          fab 
          elevation="0" 
          class="custom-navigation-button"
          @mouseover="buttonsHover.epass = true"
          @mouseleave="buttonsHover.epass = false"
        >
          <transition name="fade-home-buttons" mode="out-in">
            <v-icon v-if="!buttonsHover.epass" color="#D95033" size="60">mdi-passport-biometric</v-icon>
            <span v-if="buttonsHover.epass" style="font-size: 1.3rem; color: #D95033;">E-PASS</span>
          </transition>
        </v-btn>
      </router-link>
      <router-link v-if="this.$store.getters.userRole === 'admin'" :to="'admin'" class="custom-router-link-transparency">
        <v-btn 
          fab 
          elevation="0" 
          class="custom-navigation-button"
          @mouseover="buttonsHover.admin = true"
          @mouseleave="buttonsHover.admin = false"
        >
          <transition name="fade-home-buttons" mode="out-in">
            <v-icon v-if="!buttonsHover.admin" color="#D95033" size="60">mdi-view-dashboard-variant</v-icon>
            <span v-if="buttonsHover.admin" style="font-size: 1.3rem; color: #D95033;">ADMIN</span>
          </transition>
        </v-btn>
      </router-link>
    </div>
    <!-- notifications dialog -->
    <v-dialog persistent scrollable v-model="notificationDrawer" width="50vw">
      <v-card>
        <v-card-text class="min-height-50">
          <v-card
            v-if="!notificationsKeys"
            class="custom-notification-card"
            width="25vw"
            outlined
            elevation="0"
          >
            <div class="custom-notification-empty-card-wrap ma-2">
              <v-avatar elevation="0" color="success" class="mr-4 ml-2">
                <v-icon dark size="30">mdi-check</v-icon>
              </v-avatar>
              <v-card-title class="custom-notification-empty-title" disabled>There are no notifications</v-card-title>
            </div>
          </v-card>
          <v-card
            v-for="n in notificationsKeys"
            :key="n"
            class="custom-notification-card"
            width="50vw"
            min-height="80px"
            outlined
            elevation="0"
          >
            <div class="custom-notification-card-wrap mt-2">
              <v-avatar
                v-if="notificationsData[n].Type === 'alert'"
                elevation="0"
                color="orange lighten-1"
                class="custom-notification-avatar ml-4"
              >
                <v-icon color="orange darken-4" size="30">mdi-alert-outline</v-icon>
              </v-avatar>
              <v-avatar
                v-if="notificationsData[n].Type === 'info'"
                elevation="0"
                color="light-blue lighten-3"
                class="custom-notification-avatar ml-4"
              >
                <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
              </v-avatar>
              <input
                :value="notificationsData[n].Title"
                disabled
                class="custom-notification-title ml-3 mr-3"
              />
              <v-btn
                fab
                small
                elevation="0"
                color="transparent"
                class="custom-notification-avatar mr-4"
                @click="deleteNotification(n)"
              >
                <v-icon color="red" size="30">mdi-delete</v-icon>
              </v-btn>
            </div>
            <div class="custom-notification-card-wrap ma-1">
              <v-chip class="ma-1" color="#7595a6" outlined style="font-weight: 700">
                <v-icon size="20" class="mr-2">mdi-message-text-clock-outline</v-icon>
                {{notificationsData[n].Date}}
                <v-icon size="20">mdi-chevron-right</v-icon>
                {{notificationsData[n].Time}}
              </v-chip>
            </div>
            <div class="custom-notification-card-wrap ma-3">{{notificationsData[n].Content}}</div>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center" class="ma-1">
            <v-btn
              rounded
              small
              dark
              color="#D95033"
              elevation="0"
              @click="notificationDrawer = false"
            >
              <v-icon dark size="25">mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- profile dialog -->
    <v-dialog persistent scrollable v-model="profile" width="35vw">
      <v-card>
        <v-card-text class="min-height-50">
          <v-row justify="space-around" class="mt-3">
            <input
              type="file"
              accept="image/*"
              style="display:none"
              ref="profilePicture"
              @change="pictureSelect"
            />
            <v-btn
              :loading="loading"
              @click.native="loader = 'loading'"
              @click.exact="profilePictureUpdate()"
              @mouseover="uploadHover = true"
              @mouseleave="uploadHover = false"
              elevation="0"
              fab
              outlined
              color="white"
              class="custom-profile-upload-button"
            >
              <v-overlay
                :absolute="true"
                :value="uploadHover"
                opacity="0.6"
                class="custom-profile-overlay"
              >
                <v-icon v-if="uploadHover" color="rgba(217, 80, 51, 0.9)" size="60">mdi-upload</v-icon>
              </v-overlay>
              <v-avatar
                v-if="!this.$store.getters.profilePicture"
                width="150px"
                height="150px"
                color="rgba(217, 80, 51, 0.9)"
              >
                <v-icon dark size="85">mdi-account-circle</v-icon>
              </v-avatar>
              <v-avatar
                v-if="this.$store.getters.profilePicture"
                width="150px"
                height="150px"
                color="white"
              >
                <img width="151px" height="151px" :src="this.$store.getters.profilePicture" />
              </v-avatar>
            </v-btn>
          </v-row>
          <v-row justify="space-around">
            <v-switch inset v-model="switcher" class="custom-switcher mt-3" label="Edit data"></v-switch>
          </v-row>
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="user.name"
                label="Name"
                type="text"
                prepend-icon="mdi-account"
                color="green"
                class="ma-0"
                :disabled="switcher === false"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="user.phone"
                label="Phone"
                type="text"
                prepend-icon="mdi-phone"
                color="green"
                class="ma-0"
                :disabled="switcher === false"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="switcher === true" justify="space-around">
            <v-btn
              fab
              elevation="0"
              color="success"
              class="ma-1 white--text"
              outlined
              @click="profileSave()"
            >
              <v-icon dark>mdi-content-save-outline</v-icon>
            </v-btn>
          </v-row>
          <v-row v-if="switcher === true" justify="space-around">
            <v-btn
              rounded
              elevation="0"
              color="red"
              class="ma-2"
              outlined
              @click="profileCancelSave()"
            >
              <span>Cancel</span>
            </v-btn>
          </v-row>
          <v-row justify="space-around">
            <v-btn
              elevation="0"
              color="grey darken-1"
              rounded
              @click="gdpr = true"
              outlined
              class="white--text mt-2"
            >
              <span>GDPR and Privacy Policy</span>
              <v-icon right dark size="20">mdi-file-multiple</v-icon>
            </v-btn>
          </v-row>
          <v-row justify="space-around">
            <v-btn
              rounded
              dark
              color="#D95033"
              elevation="0"
              class="custom-log-out-button"
              @click="SignOut()"
            >
              <span class="font-size-logout-text">LogOut</span>
            </v-btn>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="space-around" class="ma-1">
            <v-btn
              rounded
              small
              dark
              color="#D95033"
              elevation="0"
              @click="profile = false"
            >
              <v-icon dark size="25">mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent scrollable v-model="gdpr" v-if="profile" width="50vw">
      <v-card>
        <v-card-text style="height: 70vh;" class="pt-2 pb-2">
          <h1>Terms and Conditions</h1>
          <p>Last updated: March 18, 2020</p>
          <p>Please read these terms and conditions carefully before using Our Service.</p>
          <h1>Interpretation and Definitions</h1>
          <h2>Interpretation</h2>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions.</p>
          <p>The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          <h2>Definitions</h2>
          <p>For the purposes of these Terms and Conditions:</p>
          <ul>
            <li>
              <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where \"control\" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
            </li>
            <li>
              <strong>Company</strong> (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to Bucharest City Cross.
            </li>
            <li>
              <strong>Country</strong> refers to: Romania
            </li>
            <li>
              <strong>Service</strong> refers to the Website.
            </li>
            <li>
              <strong>Terms and Conditions</strong> (also referred as \"Terms\") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement as been created with the help of
              <a
                href="https://www.termsfeed.com/terms-conditions-generator/\"
              >Terms and Conditions Generator</a>.
            </li>
            <li>
              <strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.
            </li>
            <li>
              <strong>Website</strong> refers to Bucharest City Cross, accessible from www.city-cross-x.firebaseapp.com
            </li>
            <li>
              <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </li>
          </ul>
          <h1>Acknowledgement</h1>
          <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
          <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
          <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
          <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>
          <h1>Links to Other Websites</h1>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
          <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
          <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
          <h1>Termination</h1>
          <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
          <p>Upon termination, Your right to use the Service will cease immediately.</p>
          <h1>Limitation of Liability</h1>
          <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
          <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
          <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
          <h1>\"AS IS\" and \"AS AVAILABLE\" Disclaimer</h1>
          <p>The Service is provided to You \"AS IS\" and \"AS AVAILABLE\" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
          <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
          <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
          <h1>Governing Law</h1>
          <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
          <h1>Disputes Resolution</h1>
          <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
          <h1>For European Union (EU) Users</h1>
          <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.</p>
          <h1>United States Legal Compliance</h1>
          <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a “terrorist supporting” country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
          <h1>Severability and Waiver</h1>
          <h2>Severability</h2>
          <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
          <h2>Waiver</h2>
          <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.</p>
          <h1>Translation Interpretation</h1>
          <p>These Terms and Conditions may have been translated if We have made them available to You on our Service.</p>
          <p>You agree that the original English text shall prevail in the case of a dispute.</p>
          <h1>Changes to These Terms and Conditions</h1>
          <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
          <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
          <h1>Contact Us</h1>
          <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
          <ul>
            <li>By visiting this page on our website: www.city-cross-x.firebaseapp.com/home</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-row justify="space-around" class="ma-1">
             <v-btn
              rounded
              small
              dark
              color="#D95033"
              elevation="0"
              @click="gdpr = false"
            >
              <v-icon dark size="25">mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- notifications-snackbar -->
    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      <span class="notification-delete">The notification has been deleted</span>
    </v-snackbar>
    <v-snackbar v-model="profilePictureNotification" :timeout="2000" color="success">
      <span class="data-modify">The Profile picture was updated</span>
    </v-snackbar>
    <v-snackbar v-model="profileUpdate" :timeout="2000" color="success">
      <span class="data-modify">The Data has been updated</span>
    </v-snackbar>
    <v-snackbar v-model="profileUpdateError" :timeout="2000" color="error">
      <span class="data-modify">All required data must be completed</span>
    </v-snackbar>
  </div>
</template>

<script>
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import firebase from "@/firebase";
Vue.use(VueAxios, Axios);
/* eslint-disable */
export default {
  name: "Home",
  data() {
    return {
      welcomeEmoji: null,
      emojiList: [
        '0x1F91F',
        '0x1F973',
        '0x1F496',
        '0x2728'
      ],
      weather: {
        icon: null,
        temperature: null
      },
      airQualityParams: {
        description: null,
        value: null,
        level: null,
        color: null
      },
      profile: false,
      profileHover: false,
      uploadHover: false,
      notificationDrawer: false,
      user: {
        profilePicture: null,
        mail: null,
        phone: null,
        name: null
      },
      profilePicture: null,
      loading: false,
      gdpr: false,
      rules: {
        required: value => !!value || "Required"
      },
      switcher: false,
      profilePictureNotification: false,
      profileUpdate: false,
      profileUpdateError: false,
      subway: {
        keys: [],
        data: null
      },
      snackbar: false,
      buttonsHover: {
        transit: false,
        store: false,
        epass: false,
        admin: false
      }
    };
  },

  created() {
    this.randomEmoji();
  },

  watch: {
    profile: {
      handler(profile) {
        if (profile === true) {
          this.user.name = this.$store.getters.userName;
          this.user.phone = this.$store.getters.userPhone;
        }
      }
    }
  },

  computed: {
    notificationsKeys() {
      return this.$store.getters.notificationsCount;
    },
    notificationsData() {
      return this.$store.getters.notifications;
    }
  },

  mounted() {
    this.weatherLoad();
    this.airQuality();
  },

  methods: {
    randomEmoji() {
      this.welcomeEmoji = String.fromCodePoint(this.emojiList[Math.floor((Math.random() * 3))])
    },
    weatherLoad() {
      var apikey = "VSbxFwm7S4kz8tyvaBiFAVxCbsBlnvtm";
      const latlong = "44.4268006,26.1025036";
      const vremea = new XMLHttpRequest();
      vremea.open(
        "GET",
        "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" +
          apikey +
          "&q=" +
          latlong +
          "&details=true",
        true
      );
      vremea.onload = () => {
        const locationKey = JSON.parse(vremea.responseText);
        const key1 = locationKey.Key;
        const vremeaStatus = new XMLHttpRequest();
        vremeaStatus.open(
          "GET",
          "https://dataservice.accuweather.com/currentconditions/v1/" +
            key1 +
            "?apikey=" +
            apikey +
            "&details=true",
          true
        );
        vremeaStatus.send();
        vremeaStatus.onload = () => {
          const stareVreme = JSON.parse(vremeaStatus.responseText);
          const iconVreme = stareVreme[0].WeatherIcon;
          switch (iconVreme) {
            case 1:
              this.weather.icon = "sun";
              break;
            case 2:
              this.weather.icon = "sun";
              break;
            case 3:
              this.weather.icon = "cloud-2";
              break;
            case 4:
              this.weather.icon = "cloud-2";
              break;
            case 5:
              this.weather.icon = "cloud-2";
              break;
            case 6:
              this.weather.icon = "cloud-2";
              break;
            case 7:
              this.weather.icon = "cloud-1";
              break;
            case 8:
              this.weather.icon = "cloud-1";
              break;
            case 9:
              this.weather.icon = "cloud-1";
              break;
            case 11:
              this.weather.icon = "cloud-1";
              break;
            case 12:
              this.weather.icon = "rain-3";
              break;
            case 13:
              this.weather.icon = "rain-3";
              break;
            case 14:
              this.weather.icon = "rain-3";
              break;
            case 15:
              this.weather.icon = "storm";
              break;
            case 16:
              this.weather.icon = "rain-3";
              break;
            case 17:
              this.weather.icon = "rain-3";
              break;
            case 18:
              this.weather.icon = "rain";
              break;
            case 19:
              this.weather.icon = "cloud-2";
              break;
            case 20:
              this.weather.icon = "cloud-2";
              break;
            case 21:
              this.weather.icon = "cloud-2";
              break;
            case 22:
              this.weather.icon = "snow";
              break;
            case 23:
              this.weather.icon = "snow";
              break;
            case 24:
              this.weather.icon = "snow-1";
              break;
            case 25:
              this.weather.icon = "cloud-1";
              break;
            case 26:
              this.weather.icon = "cloud-1";
              break;
            case 27:
              this.weather.icon = "cloud-1";
              break;
            case 28:
              this.weather.icon = "cloud-1";
              break;
            case 29:
              this.weather.icon = "cloud-1";
              break;
            case 30:
              this.weather.icon = "sun";
              break;
            case 31:
              this.weather.icon = "snow-1";
              break;
            case 32:
              this.weather.icon = "cloud-1";
              break;
            case 33:
              this.weather.icon = "moon";
              break;
            case 34:
              this.weather.icon = "moon";
              break;
            case 35:
              this.weather.icon = "moon";
              break;
            case 36:
              this.weather.icon = "moon";
              break;
            case 37:
              this.weather.icon = "moon";
              break;
            case 38:
              this.weather.icon = "cloud";
              break;
            case 39:
              this.weather.icon = "rain-2";
              break;
            case 40:
              this.weather.icon = "rain-2";
              break;
            case 41:
              this.weather.icon = "storm";
              break;
            case 42:
              this.weather.icon = "storm";
              break;
            case 43:
              this.weather.icon = "cloud";
              break;
            case 44:
              this.weather.icon = "snow";
          }
          const tempVreme = stareVreme[0].Temperature.Metric.Value;
          this.weather.temperature = tempVreme.toFixed(0);
        };
      };
      vremea.send();
    },
    airQuality() {
      let subscriptionKey = "wJ4rphAqplH9dsGMIs0vpm7vHlB7wq7x";
      let uriBase =
        "https://airapi.airly.eu/v2/measurements/point?lat=44.4268006&lng=26.1025036";

      Axios.get(
        uriBase,
        {
          headers: {
            "Accept": "application/json",
            "apikey": subscriptionKey,
          },
        }
      )
        .then((response) => {
          this.airQualityParams.description = response.data.current.indexes[0].description
          this.airQualityParams.value = Math.round(response.data.current.indexes[0].value)
          this.airQualityParams.level = response.data.current.indexes[0].level
          this.airQualityParams.color = response.data.current.indexes[0].color
          console.log(response)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    deleteNotification(notification) {
      firebase
        .database()
        .ref(
          "Users/" +
            this.$store.getters.user.uid +
            "/Notifications/" +
            notification
        )
        .remove();
      this.snackbar = true;
    },
    pictureSelect(payload) {
      this.profilePictureNotification = false;
      const selectedFile = payload.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.imageUrl = selectedFile;
      const uploadTask = firebase
        .storage()
        .ref("/" + this.$store.getters.user.uid + "/profile/profile")
        .put(selectedFile);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          var downloadURL = uploadTask.snapshot.ref.getDownloadURL();
          downloadURL.then(downloadURL => {
            this.$store.dispatch("profilePicture", {
              url: downloadURL
            });
            this.profilePictureNotification = true;
          });
        }
      );
    },
    profilePictureUpdate() {
      this.$refs.profilePicture.click();
    },
    profileSave() {
      this.profileUpdate = false;
      this.profileUpdateError = false;
      let validateName = false;
      let validatePhone = false;
      if (this.user.name) {
        validateName = true;
      } else {
        validateName = false;
      }
      if (this.user.phone) {
        validatePhone = true;
      } else {
        validatePhone = false;
      }
      if (validateName + validatePhone === 2) {
        firebase
          .database()
          .ref("Users/" + this.$store.getters.user.uid + "/")
          .update({
            Name: this.user.name,
            Phone: this.user.phone
          });
        this.switcher = false;
        this.profileUpdate = true;
      } else {
        this.profileUpdateError = true;
      }
    },
    profileCancelSave() {
      this.switcher = false;
      this.user.name = this.$store.getters.userName;
      this.user.phone = this.$store.getters.userPhone;
    },
    SignOut() {
      this.profile = false;
      this.$store.dispatch("signOut");
    }
  }
};
</script>

<style scoped>
.custom-router-link-transparency {
  color: transparent;
  height: 25vh !important;
  align-self: center;
}

.display-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.align-self-center {
  align-self: center;
}

.custom-weather-icon {
  height: 14.17vh;
  width: 6.58vw;
  margin-right: 0.2vw;
}

.custom-weather-temperature {
  font-weight: 600;
  font-size: 2.3rem;
  color: white;
}

.custom-weather-empty {
  font-weight: 600;
  font-size: 1.7rem;
  color: white;
}

.home-weather-empty-wrapper {
  display: flex;
  position: absolute;
  top: 13vh;
  right: 18vw;
}

.home-weather-wrapper {
  display: flex;
  position: absolute;
  top: 7vh;
  right: 18vw;
}

.home-weather-wrapper span{
  align-self: center;
}

.home-airquality-wrapper {
  display: flex;
  position: absolute;
  top: 24vh;
  right: 18vw;
}

.home-airquality-wrapper span {
  align-self: center;
  font-size: 3vh;
  font-weight: 500;
  color: white;
}

.home-airquality-message {
  display: flex;
  position: absolute;
  top: 18.5vh;
  right: 16.1vw;
}

.home-airquality-message span{
  align-self: center;
  font-size: 3vh;
  font-weight: 500;
  color: white;
}

.font-size-caqi {
  font-size: 2vh !important;
  margin-top: 0.6vh;
  margin-left: 0.3vw;
}

.margin-air-icon {
  margin-right: 0.5vw;
}

.custom-navigation-buttons-wrapper {
  display:flex;
  width: 100%;
  height: 45vh;
  position: absolute;
  bottom: 10vh;
  justify-content: space-around;
  background: url("../assets/background/connector-line.svg") no-repeat;
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

.custom-log-out-button {
  margin-top: 2vh;
  width: 8vw !important;
  height: 6vh !important;
  padding: 0px !important;
}

.font-size-profile-icon {
  font-size: 14vh !important;
  color: #D95033 !important;
}

.font-size-logout-text {
  font-size: 2.3vh !important;
}

.font-size-logout-icon {
  margin-left: 0.4vw !important;
  font-size: 3.1vh !important;
}

.min-height-50 {
  min-height: 33vh;
  height:auto;
}

.custom-notification-dialog-wrapper {
  z-index: 999;
  /* width: 50vw;
  height: 80vh; */
  /* background: white; */
  /* display: flex; */
}

.home-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  /* background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(42,128,157,0.7399334733893557) 45%, rgba(30,109,135,1) 100%); */
  /* background: url('../assets/background/map-home.svg') no-repeat;
  background-size: 120% 210%;
  background-position: 50%; */
}

.home-background-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  background: url('../assets/background/home-background.svg') no-repeat;
  background-size: 100% 100%;
  background-position: 0px 0px;
}

.custom-notification-card {
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

.custom-notification-card-wrap {
  display: flex;
}

.custom-notification-button{
  width: 3vw !important;
  height: 5vh !important;
}

.custom-notification-button-icon{
  font-size: 2.8vh !important;
}

.custom-notification-button-text{
  font-size: 2.5vh !important;
  margin-left: 0.2vw;
}

.custom-notification-avatar {
  align-self: center !important;
}

.custom-notification-title {
  margin-bottom: 0px !important;
  align-self: center;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
}

.custom-notification-empty-card-wrap {
  display: flex;
  height: auto;
}

.custom-notification-empty-title {
  padding: 0px;
  margin-bottom: 0px !important;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.notification-delete {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.custom-subway-text {
  font-size: 2.5vh;
}

.custom-subway-text-status {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87) !important;
  font-size: 2.5vh;
}

.custom-subway-wrapper {
  display: flex;
  height: 9vh;
  justify-content: center;
}

.custom-subway-card {
  align-self: flex-end;
  height: auto;
  display: flex;
  font-weight: 800;
  background: rgba(255,255,255, 0.9);
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  border-radius: 50px;
}

.custom-subway-chip {
  height: 5vh !important;
  width: 13.5vw !important;
  padding: 0px !important;
}

.custom-chip-content-wrapper {
  width: 13vw;
  justify-content: center;
  display: flex;
}

/* clase din app vue */
.custom-switcher {
  width: 120px;
  height: 35px;
  margin-top: 0px;
  font-weight: 700;
}

.custom-profile-wrapper {
  height: 42vh;
  width: 100%;
  justify-content: center;
  display: flex;
}

.custom-profile-info-window-wrapper {
  width: 100%;
  height: 70vh;
  position: absolute;
  top: 0;
  background: url('../assets/background/user-welcome-info-window.svg') no-repeat;
  background-position: 50% 4vh;
  background-size: auto 40vh;
}

.custom-profile-avatar {
  height: 23.6vh !important;
  width: 11vw !important;
  margin-bottom: 3vh;
  align-self: center;
  justify-self: center;
}

.custom-profile-upload-button {
  height: 23.6vh !important;
  width: 11vw !important;
  align-self: center;
  justify-self: center;
  background-color: white !important;
}

.custom-profile-icon-empty {
  width: 100%;
  height: 23.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-profile-button-picture {
  border-radius: 50%;
  height: 23.6vh !important;
  width: 11vw !important;
  border: solid 1.4vh #D95033;
}

.custom-welcome-message {
  display: flex;
  justify-self: center;
  font-size: 4vh;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}

.data-modify {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.gdpr-info {
  font-weight: 500;
  font-size: 0.9rem;
  align-self: center;
  justify-self: center;
}

.home-user-welcome-message-wrapper {
  position: absolute;
  top: 12vh;
  left: 15vw;
}

.home-user-welcome-message-wrapper span{
  font-size: 1.7rem;
  color: white;
  font-weight: 500;
}

.home-profile-rope {
  position: absolute !important;
  top: 0vh !important;
  left: 49.8vw !important;
}

.fade-home-buttons-enter-active, .fade-home-buttons-leave-active {
  transition: opacity .15s;
}
.fade-home-buttons-enter, .fade-home-buttons-leave-to {
  opacity: 0;
}

.custom-profile-overlay {
  border-radius: 500px !important;
  border: solid 1.4vh #D95033;
  height: 100%;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 3s linear infinite;
  -moz-animation: rotating 3s linear infinite;
  -ms-animation: rotating 3s linear infinite;
  -o-animation: rotating 3s linear infinite;
  animation: rotating 3s linear infinite;
}
</style>