<template>
  <v-dialog v-model="entrance" fullscreen>
    <div class="entrance-wrapper" v-if="entranceWrap" style="background: white">
      <v-card
        width="35vw"
        elevation="0"
        color="transparent"
        class="margin-L-R entrance-card-wrapper"
      >
        <v-card-actions>
          <v-btn
            fab
            elevation="0"
            color="success"
            class="entrance-buttons"
            @click="signupWrapper()"
          >
            Join
            <v-icon right>mdi-plus-circle-outline</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab elevation="0" color="success" class="entrance-buttons" @click="loginWrapper()">
            Login
            <v-icon right>mdi-location-enter</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="login" class="login-wrapper">
      <v-card width="35vw" height="70vh" elevation="0" class="margin-L-R login-card-wrapper">
        <v-card-title class="pa-0 justify-align-center">
          <div class="margin-L-R">
            TRANSIT
            <v-icon>mdi-tram-side</v-icon>
          </div>
        </v-card-title>
        <v-container grid-list-sm class="pa-0 justify-align-center">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="email"
                color="green"
                :rules="[rules.required, rules.email]"
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
                :rules="[rules.required]"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions justify-align-center>
          <v-btn fab color="success" elevation="0" @click="entranceBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab color="success" elevation="0" type="submit" @click="userSignin()">
            <v-icon>mdi-location-enter</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions justify-align-center>
          <v-btn
            rounded
            color="success"
            elevation="0"
            @click="userSignin"
            class="margin-L-R"
          >Forgot password?</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="register" class="register-wrapper">
      <v-card width="70vw" height="90vh" elevation="0" class="margin-L-R register-card-wrapper">
        <v-card-title>
          <div class="margin-L-R">
            Join
            <v-icon>mdi-plus-circle-outline</v-icon>
          </div>
        </v-card-title>
        <v-container grid-list-sm>
          <v-layout wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-text-field
                label="Email"
                v-model="email"
                color="success"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-flex>
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
            <v-flex xs6>
              <v-text-field
                name="input-10-1"
                label="Password"
                color="success"
                hint="Minimum 8 characters"
                v-model="password"
                min="8"
                :append-icon-cb="() => (e1 = !e1)"
                :type="'password'"
                :rules="[rules.required]"
                counter
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                name="input-10-1"
                label="Password confirm"
                hint="Minimum 8 caractere"
                color="success"
                v-model="confirmPassword"
                min="8"
                :type="'password'"
                :rules="[comparePasswords]"
              ></v-text-field>
            </v-flex>
            <v-btn
              elevation="0"
              color="grey darken-1"
              @click="gdprRegister = true"
              class="white--text justify-center margin-L-R mt-2"
            >
              GDPR and Privacy Policy
              <v-icon right dark>mdi-library-books</v-icon>
            </v-btn>
            <v-flex xs12>
              <v-checkbox
                class="justify-center margin-L-R mt-2"
                label="I agree to the terms and conditions"
                color="success"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn fab color="success" elevation="0" @click="entranceBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab color="success" elevation="0" type="submit" @click="userRegister()">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
        <v-dialog persistent scrollable v-model="gdprRegister" width="40vw">
          <v-card>
            <v-row justify="space-around" class="ma-1">
              <v-btn
                fab
                small
                dark
                color="blue-grey lighten-1"
                elevation="0"
                @click="gdprRegister = false"
              >
                <v-icon dark size="25">mdi-close</v-icon>
              </v-btn>
            </v-row>
            <v-divider></v-divider>
            <v-card-text style="height: 70vh;">Lorem ipsum dolor sit amet</v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
/* eslint-disable */
export default {
  name: "Entrance",
  data() {
    return {
      name: null,
      email: null,
      date: null,
      phone: null,
      password: null,
      confirmPassword: null,
      menu: false,
      gdprRegister: false,
      gdpr: false,
      genderSelect: ["Male", "Female"],
      gender: null,
      entrance: true,
      entranceWrap: true,
      login: false,
      register: false,
      e1: true,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        }
      }
    };
  },

  created() {
    this.$store.dispatch("AuthChange");
  },

  watch: {},

  computed: {
    user() {
      return this.$store.getters.user;
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    }
  },

  mounted() {},

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    loginWrapper() {
      this.login = true;
      this.entranceWrap = false;
      this.register = false;
    },
    signupWrapper() {
      this.register = true;
      this.entranceWrap = false;
      this.login = false;
    },
    entranceBack() {
      this.login = false;
      this.register = false;
      this.entranceWrap = true;
    },
    
    userSignin() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password
      });
    },
    ceva() {
      this.gdpr = true;
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

.login-card-wrapper {
  align-self: center;
}

.register-card-wrapper {
  align-self: center;
}

.entrance-card-wrapper {
  align-self: center;
}

.margin-L-R {
  margin-left: auto;
  margin-right: auto;
}
</style>