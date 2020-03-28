<template>
  <v-app id="app">
    <v-app-bar app color="#424242" dense flat dark>
      <div class="custom-app-toolbar">
        <v-tabs fixed-tabs>
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
          <v-divider inset vertical></v-divider>
          <v-tab to="/history">
            History
            <v-icon color="white" size="20" class="ma-2">mdi-history</v-icon>
          </v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab to="/lines">
            Lines
            <v-icon color="white" size="20" class="ma-2">mdi-transit-connection-variant</v-icon>
          </v-tab>
        </v-tabs>
        <v-divider class="mr-2" vertical></v-divider>
        <div class="custom-badges">
          <v-chip color="rgba(255, 255, 255, 0.7)" text-color="black" class="mr-2 custom-weather">
            <h4 style="display:none">{{ weatherLoad }}</h4>
            <img
              v-if="weather.icon"
              height="40px"
              width="40px"
              style="margin-left: 5px;"
              :src="require('./assets/weather/' + weather.icon + '.png')"
            />
            <span
              v-if="weather.temperature"
              class="custom-weather-temperature"
            >{{ this.weather.temperature }}°C</span>
            <span
              v-if="!weather.icon || !weather.temperature"
              class="mx-2"
              style="font-weight: 500;"
            >No Weather</span>
          </v-chip>
          <v-btn
            fab
            dark
            color="blue-grey"
            elevation="0"
            class="custom-profile-avatar"
            @click="profile = true"
          >
            <v-icon v-if="!this.$store.getters.profilePicture" dark size="25">mdi-account-circle</v-icon>
            <img
              v-if="this.$store.getters.profilePicture"
              :src="this.$store.getters.profilePicture"
              style="border-radius: 50%;"
              width="38px"
              height="38px"
            />
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-content>
      <v-dialog persistent scrollable v-model="profile" width="35vw">
        <v-card>
          <v-card-text style="height: 80vh;">
            <v-row justify="space-around" class="mt-3">
              <v-avatar
                v-if="!this.$store.getters.profilePicture"
                width="150px"
                height="150px"
                color="blue-grey"
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
            </v-row>
            <v-row justify="space-around">
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
                elevation="0"
                rounded
                outlined
                color="blue-grey"
                class="ma-4 white--text"
              >
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="space-around">
              <v-switch inset v-model="switcher" class="custom-switcher" label="Edit data"></v-switch>
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
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row justify="space-around" class="ma-1">
              <v-btn
                fab
                small
                dark
                color="blue-grey lighten-1"
                elevation="0"
                @click="profile = false"
              >
                <v-icon dark size="25">mdi-close</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                rounded
                dark
                color="error"
                elevation="0"
                class="justify-center"
                @click="SignOut()"
              >
                <div class="ml-1">
                  <span>Log Out</span>
                  <v-icon dark right size="20">mdi-logout</v-icon>
                </div>
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
          <v-divider></v-divider>
          <v-card-actions>
            <v-row justify="space-around" class="ma-1">
              <v-btn fab small dark color="blue-grey lighten-1" elevation="0" @click="gdpr = false">
                <v-icon dark size="25">mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <v-snackbar v-model="profilePictureNotification" :timeout="2000" color="success">
        <span class="data-modify">The Profile picture was updated</span>
      </v-snackbar>
      <v-snackbar v-model="profileUpdate" :timeout="2000" color="success">
        <span class="data-modify">The Data has been updated</span>
      </v-snackbar>
      <v-snackbar v-model="profileUpdateError" :timeout="2000" color="error">
        <span class="data-modify">All required data must be completed</span>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "App",

  data() {
    return {
      switcher: false,
      profilePictureNotification: false,
      profileUpdate: false,
      profileUpdateError: false,
      weather: {
        icon: null,
        temperature: null
      },
      profile: false,
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
      }
    };
  },

  created() {
    this.$store.dispatch("AuthChange");
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
    }
  },

  mounted() {},

  methods: {
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
.router-link-transparency {
  color: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.custom-switcher {
  width: 120px;
  height: 35px;
  margin-top: 0px;
  font-weight: 700;
}

.custom-badges {
  height: 100%;
  width: 140px;
  margin-left: 5px;
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.custom-profile-avatar {
  height: 38px !important;
  width: 38px !important;
  align-self: center;
  justify-self: center;
}

.custom-app-toolbar {
  width: 100%;
  height: 100%;
  display: -webkit-box;
}

.custom-weather {
  align-self: center;
  justify-self: center;
  padding: 0px !important;
}

.custom-weather-temperature {
  margin-right: 10px;
  font-weight: 500;
  font-size: 1rem;
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
</style>