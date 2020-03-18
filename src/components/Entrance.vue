<template>
  <v-dialog v-model="entrance" fullscreen>
    <div class="entrance-wrapper" v-if="entranceWrap" style="background: white">
      <v-card width="35vw" elevation="0" color="transparent" class="margin-L-R align-self-center">
        <v-card-actions>
          <v-btn
            fab
            outlined
            elevation="0"
            color="success"
            class="entrance-buttons"
            @click="signupWrapper()"
          >
            <span>Join</span>
            <v-icon right>mdi-plus-circle-outline</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            fab
            outlined
            elevation="0"
            color="success"
            class="entrance-buttons"
            @click="loginWrapper()"
          >
            <span>Login</span>
            <v-icon right>mdi-location-enter</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions justify-align-center>
          <v-btn
            rounded
            outlined
            color="success"
            elevation="0"
            @click="recoverWrapper()"
            class="margin-L-R"
          >
            <span class="mx-1">Forgot password?</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="recover" class="login-wrapper">
      <v-card width="35vw" height="70vh" elevation="0" class="margin-L-R align-self-center">
        <v-card-title class="pa-0 justify-align-center">
          <div class="margin-L-R">
            <span>Recover Password</span>
            <v-icon right>mdi-lock-reset</v-icon>
          </div>
        </v-card-title>
        <v-container grid-list-sm class="pa-0 justify-align-center">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="recoverEmail"
                color="green"
                :rules="[rules.requiredRecover, rules.emailRecover]"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions justify-align-center>
          <v-btn fab outlined color="success" elevation="0" @click="entranceBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            fab
            outlined
            color="success"
            elevation="0"
            type="submit"
            @click="recoverPassword()"
          >
            <v-icon>mdi-location-enter</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="login" class="login-wrapper">
      <v-card width="35vw" height="70vh" elevation="0" class="margin-L-R align-self-center">
        <v-card-title class="pa-0 justify-align-center">
          <div class="margin-L-R">
            <span>TRANSIT</span>
            <v-icon right>mdi-tram-side</v-icon>
          </div>
        </v-card-title>
        <v-container grid-list-sm class="pa-0 justify-align-center">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="email"
                color="green"
                :rules="[rules.requiredLogin, rules.emailLogin]"
              ></v-text-field>
              <v-text-field
                name="input-10-1"
                label="Password"
                v-model="password"
                min="8"
                color="green"
                :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                :rules="[rules.requiredLogin]"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions justify-align-center>
          <v-btn fab outlined color="success" elevation="0" @click="entranceBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab outlined color="success" elevation="0" type="submit" @click="userSignin()">
            <v-icon>mdi-location-enter</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="register" class="register-wrapper">
      <v-card width="70vw" height="90vh" elevation="0" class="margin-L-R align-self-center">
        <v-card-title>
          <div class="margin-L-R">
            <span>Join</span>
            <v-icon right>mdi-plus-circle-outline</v-icon>
          </div>
        </v-card-title>
        <v-container grid-list-sm>
          <v-layout wrap>
            <v-flex xs6>
              <v-text-field label="Name" v-model="name" color="success"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Phone" color="success" v-model="phone"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select :items="genderSelect" v-model="gender" color="success" label="Gender"></v-select>
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
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    color="green"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="date"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  color="green"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="registerEmail"
                color="success"
                :rules="[rules.requiredRegister, rules.emailRegister]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                name="input-10-1"
                label="Password"
                color="success"
                hint="Minimum 8 characters"
                v-model="registerPassword"
                min="8"
                :append-icon-cb="() => (e1 = !e1)"
                :type="'password'"
                :rules="[rules.requiredRegister]"
                counter
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
        <v-card-actions>
          <v-btn fab outlined color="success" elevation="0" @click="entranceBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            fab
            outlined
            color="success"
            elevation="0"
            type="submit"
            :disabled="agreements === false"
            @click="userRegister()"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
        <v-dialog persistent scrollable v-model="gdpr" width="40vw">
          <v-card>
            <v-card-text style="height: 70vh;">Lorem ipsum dolor sit amet</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row justify="space-around" class="ma-1">
                <v-btn
                  fab
                  small
                  dark
                  color="blue-grey lighten-1"
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
  </v-dialog>
</template>

<script>
import firebase from "@/firebase";
/* eslint-disable */
export default {
  name: "Entrance",
  data() {
    return {
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
    this.$store.dispatch("AuthChange");
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
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
    loginWrapper() {
      this.login = true;
      this.entranceWrap = false;
      this.register = false;
      this.recover = false;
    },
    signupWrapper() {
      this.register = true;
      this.entranceWrap = false;
      this.login = false;
      this.recover = false;
    },
    recoverWrapper() {
      this.recover = true;
      this.login = false;
      this.register = false;
      this.entranceWrap = false;
    },
    entranceBack() {
      this.login = false;
      this.register = false;
      this.recover = false;
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
      let gender = this.gender
      let name = this.name
      let phone = this.phone
      let created = this.curday("/")
      let birthday = this.birthFormat(this.date)
      let gdpr = true

      this.$store.dispatch("register", {
        Email: email,
        Password: password,
        Gender: gender,
        Name: name,
        Phone: phone,
        Created: created,
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
.entrance-wrapper {
  background: white;
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
}

.register-wrapper {
  background: white;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
}

.entrance-buttons {
  width: 10vw !important;
  height: 10vw !important;
}

.align-self-center {
  align-self: center;
}

.margin-L-R {
  margin-left: auto;
  margin-right: auto;
}
</style>