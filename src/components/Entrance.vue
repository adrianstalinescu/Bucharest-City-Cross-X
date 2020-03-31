<template>
  <div v-if="entrance" class="fullscreen">
    <section>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
    </section>
    <div class="entrance-wrapper" v-if="entranceWrap">
      <img class="train" src="../assets/background/train.svg">
      <transition appear name="fade">
        <div class="entrance-buttons-wrapper">
          <svg height="31.5vh" width="0.7vw" class="entrance-buttons-line-1">
            <line x1="0" y1="0" x2="0" y2="31.5vh" style="stroke:rgb(247, 236, 199);stroke-width:0.7vw" />
          </svg>
          <svg height="31.5vh" width="0.7vw" class="entrance-buttons-line-2">
            <line x1="0" y1="0" x2="0" y2="31.5vh" style="stroke:rgb(247, 236, 199);stroke-width:0.7vw" />
          </svg>
          <svg height="31.5vh" width="0.7vw" class="entrance-buttons-line-3">
            <line x1="0" y1="0" x2="0" y2="31.5vh" style="stroke:rgb(247, 236, 199);stroke-width:0.7vw" />
          </svg>
          <v-btn
            fab
            dark
            elevation="0"
            color="#2a809d"
            class="entrance-buttons entrance-button-position-1"
            @click="signupWrapper()"
            @mouseover="hover.register = true"
            @mouseleave="hover.register = false"
          >
          <transition name="fade-entrance-buttons" mode="out-in">
            <span v-if="hover.register === true" class="entrance-buttons-text-register">Join</span>
            <v-icon v-if="hover.register === false" class="entrance-buttons-icon">mdi-plus-circle-outline</v-icon>
          </transition>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            fab
            dark
            color="#2a809d"
            elevation="0"
            @click="recoverWrapper()"
            @mouseover="hover.recover = true"
            @mouseleave="hover.recover = false"
            class="entrance-buttons entrance-button-position-2"
          >
          <transition name="fade-entrance-buttons" mode="out-in">
            <span v-if="hover.recover === true" class="entrance-buttons-text-recover">Recover<br>password</span>
            <v-icon v-if="hover.recover === false" class="entrance-buttons-icon">mdi-backup-restore</v-icon>
          </transition>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            fab
            dark
            elevation="0"
            color="#2a809d"
            class="entrance-buttons entrance-button-position-3"
            @click="loginWrapper()"
            @mouseover="hover.login = true"
            @mouseleave="hover.login = false"
          >
          <transition name="fade-entrance-buttons" mode="out-in">
            <span v-if="hover.login === true" class="entrance-buttons-text-login">Login</span>
            <v-icon v-if="hover.login === false" class="entrance-buttons-icon">mdi-location-enter</v-icon>
          </transition>
          </v-btn>
        </div>
      </transition>
    </div>
    <transition appear name="slide-up">
    <div v-if="recover" class="login-wrapper">
      <v-card width="25vw" height="70vh" elevation="0" class="margin-L-R align-self-center display-flex">
        <div class="align-self-center width-100">
          <v-card-title class="pa-0 justify-align-center">
            <div class="margin-L-R">
              <span>Recover Password</span>
              <v-icon color="rgb(42, 128, 157)" right>mdi-lock-reset</v-icon>
            </div>
          </v-card-title>
          <v-container grid-list-sm class="pa-0 justify-align-center">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  label="Email"
                  v-model="recoverEmail"
                  color="rgb(42, 128, 157)"
                  :rules="[rules.requiredRecover, rules.emailRecover]"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions justify-align-center>
            <v-btn fab dark color="rgb(42, 128, 157)" elevation="0" @click="entranceBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              fab
              dark
              color="rgb(42, 128, 157)"
              elevation="0"
              type="submit"
              @click="recoverPassword()"
            >
              <v-icon>mdi-location-enter</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
    </transition>
    <transition appear name="slide-left">
    <div v-if="login" class="login-wrapper">
      <v-card width="25vw" height="100%" elevation="0" class="margin-L-R align-self-center display-flex">
        <div class="align-self-center width-100">
          <v-card-title class="pa-0 justify-align-center">
            <div class="margin-L-R">
              <span>TRANSIT</span>
              <v-icon color="rgb(42, 128, 157)" right>mdi-tram-side</v-icon>
            </div>
          </v-card-title>
          <v-container grid-list-sm class="pa-0 justify-align-center">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  label="Email"
                  v-model="email"
                  color="rgb(42, 128, 157)"
                  :rules="[rules.requiredLogin, rules.emailLogin]"
                ></v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock-outline"
                  name="input-10-1"
                  label="Password"
                  v-model="password"
                  min="8"
                  color="rgb(42, 128, 157)"
                  :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="[rules.requiredLogin]"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions justify-align-center>
            <v-btn fab dark color="rgb(42, 128, 157)" elevation="0" @click="entranceBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab dark color="rgb(42, 128, 157)" elevation="0" type="submit" @click="userSignin()">
              <v-icon>mdi-location-enter</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
    </transition>
    <transition appear name="slide-right">
    <div v-if="register" class="register-wrapper">
      <v-card width="70vw" height="100%" elevation="0" class="margin-L-R align-self-center display-flex">
        <div class="align-self-center width-100">
          <v-card-title class="padding-zero">
            <div class="margin-L-R">
              <span>Join</span>
              <v-icon color="rgb(42, 128, 157)" right>mdi-plus-circle-outline</v-icon>
            </div>
          </v-card-title>
          <v-container grid-list-sm class="padding-zero">
            <v-layout wrap>
              <v-flex v-if="this.image" xs12>
                <v-row justify="space-around">
                  <img width="100px" height="100px" style="border-radius: 50%;" :src="this.image"/>
                </v-row>
              </v-flex>
              <v-flex xs12>
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
                    <v-icon dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                </v-row>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-inner-icon="mdi-card-account-details-outline" label="Name" v-model="name" color="rgb(42, 128, 157)" class="padding-zero"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-inner-icon="mdi-phone" label="Phone" color="rgb(42, 128, 157)" v-model="phone" class="padding-zero"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select prepend-inner-icon="mdi-account-circle-outline" :items="genderSelect" v-model="gender" color="rgb(42, 128, 157)" label="Gender"></v-select>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Birthday date"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-on="on"
                      color="rgb(42, 128, 157)"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    color="rgb(42, 128, 157)"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  label="Email"
                  v-model="registerEmail"
                  color="rgb(42, 128, 157)"
                  :rules="[rules.requiredRegister, rules.emailRegister]"
                  class="padding-zero"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  prepend-inner-icon="mdi-lock-outline"
                  name="input-10-1"
                  label="Password"
                  color="rgb(42, 128, 157)"
                  hint="Minimum 8 characters"
                  v-model="registerPassword"
                  min="8"
                  :append-icon="e2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (e2 = !e2)"
                  :type="e2 ? 'password' : 'text'"
                  :rules="[rules.requiredRegister]"
                  counter
                  class="padding-zero"
                ></v-text-field>
              </v-flex>
              <v-btn
                rounded
                elevation="0"
                outlined
                color="grey darken-1"
                @click="gdpr = true"
                class="white--text justify-center margin-L-R mt-2"
              >
                <span>GDPR and Privacy Policy</span>
                <v-icon right dark>mdi-file-multiple</v-icon>
              </v-btn>
              <v-flex xs12>
                <v-checkbox
                  class="justify-center margin-L-R mt-2"
                  label="I agree to the terms and conditions"
                  color="success"
                  v-model="agreements"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions class="padding-zero">
            <v-btn fab dark color="rgb(42, 128, 157)" elevation="0" @click="entranceBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              fab
              dark
              color="rgb(42, 128, 157)"
              elevation="0"
              type="submit"
              :disabled="agreements === false"
              @click="userRegister()"
            >
              <v-icon>mdi-location-enter</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
        <v-dialog persistent scrollable v-model="gdpr" width="50vw">
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
                  <li><strong>Company</strong> (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to Bucharest City Cross.</li>       
                  <li><strong>Country</strong> refers to: Romania</li>                     
                  <li><strong>Service</strong> refers to the Website.</li>           
                  <li><strong>Terms and Conditions</strong> (also referred as \"Terms\") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement as been created with the help of 
                  <a href="https://www.termsfeed.com/terms-conditions-generator/\">Terms and Conditions Generator</a>.</li>     
                  <li><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</li>   
                  <li><strong>Website</strong> refers to Bucharest City Cross, accessible from www.city-cross-x.firebaseapp.com</li>    
                  <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li> 
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
                <v-btn
                  fab
                  small
                  dark
                  color="rgb(42, 128, 157)"
                  elevation="0"
                  @click="gdpr = false"
                >
                  <v-icon dark size="25">mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
    </transition>
  </div>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "Entrance",
  data() {
    return {
      hover: {
        register: false,
        recover: false,
        login: false
      },
      profilePicture: null,
      image: null,
      loading: false,
      name: null,
      email: null,
      registerEmail: null,
      recoverEmail: null,
      date: null,
      phone: null,
      password: null,
      registerPassword: null,
      menu: false,
      agreements: false,
      gdpr: false,
      genderSelect: ["Male", "Female"],
      gender: null,
      entrance: true,
      entranceWrap: true,
      login: false,
      register: false,
      recover: false,
      e1: true,
      e2: true,
      rules: {
        requiredLogin: value => !!value || "Required.",
        requiredRegister: value => !!value || "Required.",
        requiredRecover: value => !!value || "Required.",
        emailRegister: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        },
        emailLogin: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        },
        emailRecover: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        }
      }
    };
  },

  created() {
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  },

  mounted() {},

  methods: {
    curday(sp) {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      return dd + sp + mm + sp + yyyy;
    },
    birthFormat(bd) {
      let date = bd.split('-')
      let final = new Date(date[0], date[1] - 1, date[2]).toLocaleDateString('en-GB')
      return final
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    pictureSelect(payload) {
      this.profilePictureNotification = false
      const selectedFile = payload.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(selectedFile);
      this.imageUrl = selectedFile
      this.profilePicture = this.imageUrl
      this.image = URL.createObjectURL(selectedFile)
    },
    profilePictureUpdate() {
      this.$refs.profilePicture.click();
    },
    loginWrapper() {
      this.login = true;
      this.entranceWrap = false;
      this.hover.login = false
      this.hover.register = false
      this.hover.recover = false
      this.register = false;
      this.recover = false;
    },
    signupWrapper() {
      this.register = true;
      this.entranceWrap = false;
      this.hover.login = false
      this.hover.register = false
      this.hover.recover = false
      this.login = false;
      this.recover = false;
    },
    recoverWrapper() {
      this.recover = true;
      this.login = false;
      this.hover.login = false
      this.hover.register = false
      this.hover.recover = false
      this.register = false;
      this.entranceWrap = false;
    },
    entranceBack() {
      this.login = false;
      this.register = false;
      this.recover = false;
      this.hover.login = false
      this.hover.register = false
      this.hover.recover = false
      this.entranceWrap = true;
    },
    userSignin() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password
      });
    },
    userRegister() {
      let email = this.registerEmail
      let password = this.registerPassword
      let picture = this.profilePicture
      let gender = this.gender
      let name = this.name
      let phone = this.phone
      let created = this.curday("/")
      let role = "user"
      let birthday = this.birthFormat(this.date)
      let gdpr = true

      this.$store.dispatch("profilePictureRegister", {
        Picture: picture
      })
      this.$store.dispatch("register", {
        Email: email,
        Password: password,
        Gender: gender,
        Name: name,
        Phone: phone,
        Created: created,
        Role: role,
        Birthdate: birthday,
        GDPR: gdpr
      });
    },
    recoverPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.recoverEmail)
        .then(function() {})
        .catch(function(error) {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped>
section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('../assets/background/skyline.svg') no-repeat;
  background-size: auto 63vh;
  background-position: 45% 40vh;
  overflow: hidden;
}

section .wave {
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 15vh;
  transform: scaleY(-1);
  background: url('../assets/background/wave.png');
  background-size: 73.2vw 15vh;
}

section .wave.wave1 {
  animation: animate 30s linear infinite;
  z-index:1000;
  opacity: 1;
  animation-delay: 0s;
  top:0;
}

section .wave.wave2 {
  animation: animate 15s linear infinite;
  animation-direction: reverse;
  z-index: 999;
  opacity: 0.5;
  animation-delay: -5s;
  top: 1.5vh;
}

section .wave.wave3 {
  animation: animate 30s linear infinite;
  z-index: 998;
  opacity: 0.2;
  animation-delay: -2s;
  top: 2.3vh;
}

section .wave.wave4 {
  animation: animate 17s linear infinite;
  animation-direction: reverse;
  z-index: 997;
  opacity: 0.7;
  animation-delay: -5s;
  top: 3.1vh;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 73.2vw;
  }
}

.fullscreen {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  background-image: linear-gradient(to top, #27aae1 65%, #78909C);
  z-index: 9999;
}

.entrance-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
}

.login-wrapper {
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  z-index: 9999;
}

.register-wrapper {
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  z-index: 9999;
}

.entrance-buttons {
  width: 10vw !important;
  height: 10vw !important;
}

.entrance-button-position-1{
  position: absolute;
  top: 30vh;
  left: 25%;
}

.entrance-button-position-2{
  position: absolute;
  top: 30vh;
  left: 45%;
}

.entrance-button-position-3{
  position: absolute;
  top: 30vh;
  left: 65%;
}

.entrance-buttons-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}

.entrance-buttons-text-register{
  font-size: 2vw !important;
}

.entrance-buttons-text-recover{
  font-size: 1.5vw !important;
}

.entrance-buttons-text-login{
  font-size: 2vw !important;
}

.entrance-buttons-icon{
  font-size: 3.5vw !important;
}

.entrance-buttons-line-1 {
  position: absolute !important;
  top: 0vh !important;
  left: 29.8vw !important;
}

.entrance-buttons-line-2 {
  position: absolute !important;
  top: 0vh !important;
  left: 49.8vw !important;
}

.entrance-buttons-line-3 {
  position: absolute !important;
  top: 0vh !important;
  left: 69.9vw !important;
}

.align-self-center {
  align-self: center;
}

.margin-L-R {
  margin-left: auto;
  margin-right: auto;
}

.padding-zero {
  padding: 0px !important;
}

.display-flex {
  display: flex;
}

.width-100 {
  width: 100%;
}

.train {
  height: 5vh;
  position: absolute;
  bottom: 1.8vh;
  left: 50%;
  transform: translateX(-46vw);
  animation: train-move 13s infinite;
}

@keyframes train-move {
  0% {
    transform: translateX(-47vw);
  }
  50% {
    transform: translateX(20.5vw);
  }
  100% {
    transform: translateX(-47vw);
  }
}

.fade-enter-active{
  transition: all 0.5s;
  transition-delay: 0.2s
}

.fade-leave-active {
  transition: all 0.5s;
  transition-delay: 0.2s
}

.fade-enter {
  opacity: 0;
  /* transform: translateY(-10%) */
}
.fade-leave-to {
  opacity: 0;
  /* transform: translateY(10%) */
}

.slide-up-enter-active{
  transition: all 0.5s;
}

.slide-up-leave-active {
  transition: all 0.5s;
  transition-delay: 0.2s
}

.slide-up-enter {
  opacity: 0;
  transform: translateY(10%)
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10%)
}

.slide-left-enter-active{
  transition: all 0.5s;
}

.slide-left-leave-active {
  transition: all 0.5s;
  transition-delay: 0.2s
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(10%)
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(10%)
}

.slide-right-enter-active{
  transition: all 0.5s;
}

.slide-right-leave-active {
  transition: all 0.5s;
  transition-delay: 0.2s
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-10%)
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-10%)
}

.fade-entrance-buttons-enter-active, .fade-entrance-buttons-leave-active {
  transition: opacity .15s;
}
.fade-entrance-buttons-enter, .fade-entrance-buttons-leave-to {
  opacity: 0;
}
</style>