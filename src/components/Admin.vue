<template>
  <div class="admin-wrapper">
    <div class="custom-back-button">
      <router-link :to="'home'" class="custom-router-link-transparency">
        <v-btn
          rounded
          dark
          color="#D95033"
          elevation="0"
          >
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
    </div>
    <v-card class="custom-menu-wrapper" outlined elevation="0">
      <v-card color="#D95033" elevation="0" class="mt-2 mx-2 custom-card-grid">
          <v-icon class="menu-icon" dark size="30">mdi-chart-arc</v-icon>
          <span class="menu-title">Statistics</span>
          <v-btn fab class="menu-button" elevation="0" @click="statisticsWrapper()">
              <v-icon color="#D95033">mdi-chevron-right</v-icon>
          </v-btn>
      </v-card>
      <v-divider class="mb-2 mt-2"></v-divider>
      <v-card color="#D95033" elevation="0" class="mt-2 mx-2 custom-card-grid">
          <v-icon class="menu-icon" dark size="25">mdi-account-search-outline</v-icon>
          <span class="menu-title">Student Validation</span>
          <v-btn fab class="menu-button" elevation="0" @click="studentValidationWrapper()">
              <v-icon color="#D95033">mdi-chevron-right</v-icon>
          </v-btn>
      </v-card>
      <v-divider class="mb-2 mt-2"></v-divider>
      <v-card color="#D95033" elevation="0" class="mt-2 mx-2 custom-card-grid">
          <v-icon class="menu-icon" dark size="25">mdi-subway</v-icon>
          <span class="menu-title">Metro Status</span>
          <v-btn fab class="menu-button" elevation="0" @click="metroStatusWrapper()">
              <v-icon color="#D95033">mdi-chevron-right</v-icon>
          </v-btn>
      </v-card>
      <v-divider class="mb-2 mt-2"></v-divider>
      <v-card color="#D95033" elevation="0" class="mt-2 mx-2 custom-card-grid">
          <v-icon class="menu-icon" dark size="25">mdi-message-text-clock-outline</v-icon>
          <span class="menu-title">Notifications</span>
          <v-btn fab class="menu-button" elevation="0" @click="notificationSenderWrapper()">
              <v-icon color="#D95033">mdi-chevron-right</v-icon>
          </v-btn>
      </v-card>
      <v-divider class="mb-2 mt-2"></v-divider>
    </v-card>
    <div v-if="emptyWrap" class="custom-content-wrapper">
    </div>
    <div v-if="statistics" class="custom-content-wrapper">
        <h4 style="display:none">{{ this.searchHistoryPiechart() }}</h4>
        <h4 style="display:none">{{ this.purchaseHistoryPieChart() }}</h4>
        <h4 style="display:none">{{ this.walletPieChart() }}</h4>
        <h4 style="display:none">{{ this.SUTPieChart() }}</h4>
        <h4 style="display:none">{{ this.cardsPieChart() }}</h4>
        <h4 style="display:none">{{ this.gendersPieChart() }}</h4>
        <h4 style="display:none">{{ this.studentsPieChart() }}</h4>
        <h4 style="display:none">{{ this.agePieChart() }}</h4>
        <div class="statistics-grid">
            <div id="historyChart"></div>
            <div id="purchaseChart"></div>
        </div>
        <div class="statistics-grid">
            <div id="walletChart"></div>
            <div id="SUTChart"></div>
        </div>
        <div class="statistics-grid">
            <div id="cardsChart"></div>
            <div id="gendersChart"></div>
        </div>
        <div class="statistics-grid">
            <div id="studentsChart"></div>
        </div>
        <div class="statistics-grid-full-line">
          <div id="ageChart"></div>
        </div>
        <div class="statistics-grid-full-line">
            <v-divider></v-divider>
            <v-chip class="custom-users-created-title" dark color="#7CB342">
              <v-icon>mdi-account-multiple-plus-outline</v-icon>
              <span class="ml-1 mr-2">Users Created</span>
            </v-chip>
        </div>
        <div class="statistics-grid">
          <div class="ml-8 calendar-created-users">
            <v-date-picker v-model="userCreatedRange" range color="#7CB342"></v-date-picker>
          </div>
          <div class="mr-8">
            <v-data-table
              :headers="headerUserCreatedRange"
              :items="usersCreatedTable"
              :items-per-page="9"
              :footer-props="footer_props"
              class="elevation-3 table-width"
            ></v-data-table>
          </div>
        </div>
        <div class="statistics-grid-full-line">
            <v-divider class="mt-5"></v-divider>
            <v-chip class="custom-users-created-title" dark color="#00B0FF">
              <v-icon>mdi-cart-outline</v-icon>
              <span class="ml-1 mr-2">Purchases Made</span>
            </v-chip>
        </div>
        <div class="statistics-grid">
          <div class="ml-8 calendar-created-users">
            <v-date-picker v-model="purchasesRange" range color="#00B0FF"></v-date-picker>
          </div>
          <div class="mr-8">
            <v-data-table
              :headers="headerPurchasesRange"
              :items="purchasesTable"
              :items-per-page="9"
              :footer-props="footer_props"
              class="elevation-3 table-width"
            ></v-data-table>
          </div>
        </div>
        <div class="purchase-total-amount">
            <v-chip class="custom-total-amount-title" dark color="#00B0FF">
              <v-icon>mdi-cash-usd-outline</v-icon>
              <span class="ml-1 mr-2">Total Amount: {{this.purchasedTotalAmount}}</span>
            </v-chip>
          </div>
    </div>
    <div v-if="studentValidation" class="custom-content-wrapper display-flex">
      <v-card v-if="students.keys" class="custom-student-wrapper" outlined elevation="0">
        <v-card v-for="ps in students.keys" :key="ps" outlined class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" color="#ff8a65" size="30">mdi-account-search-outline</v-icon>
            <span class="menu-title">{{students.data[ps].Name}}</span>
            <v-btn fab color="#E0E0E0" class="menu-button" elevation="0" @click="loadStudentData(ps)">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card>
      </v-card>
      <div v-if="students.keys" class="custom-student-data">
        <v-card
          v-if="!studentSelected"
          class="custom-notification-card"
          outlined
          elevation="0"
        >
          <div class="custom-notification-card-wrap align-center">
            <v-avatar elevation="0" color="light-blue lighten-3" class="align-center justify-center">
              <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
            </v-avatar>
            <v-card-title class="custom-notification-empty-title" disabled>Make a selection</v-card-title>
          </div>
        </v-card>
        <div v-if="studentSelected" class="width-carousel overflow-y">
          <v-carousel hide-delimiters height="400">
            <v-carousel-item
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <img
              :src="studentPics.front.i"
              height="400px"
              class="student-id-image"
            />
            </v-carousel-item>
            <v-carousel-item
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
             <img
              :src="studentPics.back.i"
              height="400px"
              class="student-id-image"
            />
            </v-carousel-item>
            <v-carousel-item
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
             <img
              :src="studentPics.selfie.i"
              height="400px"
              class="student-id-image"
            />
            </v-carousel-item>
          </v-carousel>
          <div class="display-flex justify-center">
            <span class="confidence-score-text">Confidence score: {{studentConfidence}}<br>Identical face: {{studentIsIdentical}}</span>
          </div>
          <div class="student-buttons-grid">
            <v-text-field
              single-line
              label="Student ID"
              v-model="studentApproval.id"
              outlined
              hide-details
              class="ma-2"
            />
            <v-text-field
              single-line
              label="Validity"
              v-model="studentApproval.valid"
              outlined
              hide-details
              class="ma-2"
            />
          </div>
          <v-text-field
            single-line
            label="Rejection notification message"
            v-model="studentApproval.notification"
            outlined
            hide-details
            class="ma-2"
          />
          <div class="student-buttons-grid">
            <v-btn
              rounded
              small
              dark
              color="error"
              class="align-center justify-center ma-1"
              outlined
              elevation="0"
              @click="studentReject()"
            >
              <v-icon class="mr-1" dark size="20">mdi-close</v-icon>
              <span class="mr-1">Reject</span>
            </v-btn>
            <v-btn
              rounded
              small
              dark
              color="success"
              class="align-center justify-center ma-1"
              outlined
              elevation="0"
              @click="studentApprove()"
            >
              <v-icon class="mr-1" dark size="20">mdi-check</v-icon>
              <span class="mr-1">Approve</span>
            </v-btn>
          </div>
        </div>
      </div>
      <div v-if="!students.keys" class="custom-student-empty-data">
        <v-card
          class="custom-notification-empty-card"
          outlined
          elevation="0"
        >
          <div class="custom-notification-empty-card-wrap align-center">
            <v-avatar elevation="0" color="light-blue lighten-3" class="align-center justify-center">
              <v-icon color="light-blue darken-1" size="30">mdi-exclamation-thick</v-icon>
            </v-avatar>
            <v-card-title class="custom-notification-empty-title" disabled>No requests</v-card-title>
          </div>
        </v-card>
      </div>
    </div>
    <div v-if="metroStatus" class="custom-content-wrapper">
      <v-card outlined class="custom-metro-line-info">
        <div class="custom-metro-card-grid">
          <v-select
            :items="metro.keys" 
            v-model="metro.line"
            label="Select line"
            class="mx-2"
          >
          </v-select>
          <v-select
            :items="metro.options" 
            v-model="metro.status"
            label="Select status"
            class="mx-2"
          >
          </v-select>
          <v-btn
            rounded
            small
            dark
            color="success"
            outlined
            class="align-center justify-center ma-1"
            elevation="0"
            @click="metroStatusUpdate()"
          >
            <span>Update</span>
          </v-btn>
        </div>
        <div class="custom-subway-wrapper">
          <div class="custom-subway-card">
            <v-chip
            v-for="m in subway.keys"
            :key="m"
            class="ma-2 custom-subway-chip"
            :color="subway.data[m].Color"
            outlined
            >
              <div class="custom-chip-content-wrapper">
                  <span class="custom-subway-text">{{m}}</span>
                  <v-icon class="custom-subway-text">mdi-chevron-right</v-icon>
                  <span class="custom-subway-text-status">{{subway.data[m].Status}}</span>
              </div>
            </v-chip>
          </div>
        </div>
      </v-card>
    </div>
    <div v-if="notificationSender" class="custom-content-wrapper">
      <div>
        <v-text-field
          single-line
          label="Notification title"
          v-model="notification.title"
          outlined
          hide-details
          class="ma-2"
        />
      </div>
      <div>
        <v-select
          :items="notification.options" 
          v-model="notification.type"
          label="Select notification type"
          class="mx-2"
        >
        </v-select>
      </div>
      <div>
        <v-textarea v-model="notification.content" outlined class="mx-2">
        </v-textarea>
      </div>
      <div class="display-flex justify-content-center">
        <v-btn
          rounded
          small
          dark
          color="success"
          outlined
          class="align-center ma-1"
          elevation="0"
          @click="notificationSend()"
        >
          <span>Send Notification</span>
          <v-icon right size="20">mdi-send</v-icon>
        </v-btn>
      </div>
    </div>
    <v-snackbar v-model="studentNotification" :timeout="2000" color="success">
      <span class="custom-notification">The Student ID has been Approved</span>
    </v-snackbar>
    <v-snackbar v-model="metro.notification" :timeout="2000" color="success">
      <span class="custom-notification">Status updated</span>
    </v-snackbar>
    <v-snackbar v-model="notification.notif" :timeout="2000" color="success">
      <span class="custom-notification">Notification sent</span>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from '@/firebase'
/* eslint-disable */
export default {
  name: "Admin",
  data() {
    return {
        emptyWrap: true,
        statistics: false,
        studentValidation: false,
        metroStatus: false,
        notificationSender: false,
        studentSelected: false,
        studentConfidence: null,
        studentIsIdentical: null,
        users: {
          keys: null,
          data: null
        },
        students: {
          keys: null,
          data: null
        },
        metro: {
          keys: null,
          data: null,
          options: ["Good Service","Minor Delays","Major Delays","Suspended"],
          line: null,
          status: null,
          notification: false
        },
        subway: {
            keys: [],
            data: null
        },
        notification:{
          title: null,
          options: ["alert","info"],
          content: null,
          type: null,
          notif: false
        },
        studentPics:{
          front: null,
          back: null,
          selfie: null
        },
        studentApproval: {
          id: null,
          valid: null,
          notification: null
        },
        studentNotification: false,
        userCreatedRange: [],
        purchasesRange: [],
        footer_props: {
            "items-per-page-options": [9],
            "items-per-page-text": null,
            "disable-items-per-page": true
        },
        headerUserCreatedRange: [
            {
            text: 'User ID',
            align: 'start',
            sortable: false,
            value: 'id',
            },
            { text: 'Name', value: 'name' },
            { text: 'Created At', value: 'created' },
        ],
        usersCreatedTable: [],
        headerPurchasesRange: [
            {
            text: 'Purchase ID',
            align: 'start',
            sortable: false,
            value: 'id',
            },
            { text: 'Name', value: 'name' },
            { text: 'Date', value: 'date' },
            { text: 'Time', value: 'time' },
            { text: 'Cost', value: 'cost' },
        ],
        purchasesTable: [],
        purchasedTotalAmount: null
    };
  },

  created() {},

  watch: {
    userCreatedRange: {
      handler(userCreatedRange) {
        if(userCreatedRange.length === 2){
          this.userCreatedTableGenerate();
        }
      }
    },
    purchasesRange: {
      handler(purchasesRange) {
        if(purchasesRange.length === 2){
          this.purchasesTableGenerate();
        }
      }
    }
  },

  mounted() {
  },

  computed: {
  },

  methods: {
    statisticsWrapper() {
      this.emptyWrap = false
      this.studentValidation = false
      this.metroStatus = false
      this.notificationSender = false
      this.statistics = true
    },
    studentValidationWrapper() {
      this.emptyWrap = false
      this.statistics = false
      this.metroStatus = false
      this.notificationSender = false
      this.studentValidation = true
      this.pendingStudents()
    },
    metroStatusWrapper() {
      this.emptyWrap = false
      this.studentValidation = false
      this.statistics = false
      this.notificationSender = false
      this.metroStatus = true
      this.metroLoader()
      this.metroStatusLoad()
    },
    notificationSenderWrapper() {
      this.emptyWrap = false
      this.studentValidation = false
      this.statistics = false
      this.metroStatus = false
      this.notificationSender = true
    },
    searchHistoryPiechart() {
      var myObjwith = []
      var myObj = []
      firebase.database().ref('Users')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      firebase.database().ref('History/Search')
        .on('value', snap => {
          myObjwith = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('historyChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['With Search History', Object.keys(myObjwith).length],
          ['Without Search History', Object.keys(myObj).length - Object.keys(myObjwith).length]
        ]), { is3D: false, colors: ['#FF8A80', '#C62828']})
      }})
    },
    purchaseHistoryPieChart() {
      var myObjwith = []
      var myObj = []
      firebase.database().ref('Users')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      firebase.database().ref('History/Purchase')
        .on('value', snap => {
          myObjwith = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('purchaseChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['With Purchase History', Object.keys(myObjwith).length],
          ['Without Purchase History', Object.keys(myObj).length - Object.keys(myObjwith).length]
        ]), { is3D: false, colors: ['#81C784', '#388E3C']})
      }})
    },
    walletPieChart() {
      var myObjwith = []
      var myObj = []
      firebase.database().ref('Users')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      firebase.database().ref('Wallet')
        .on('value', snap => {
          myObjwith = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('walletChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['With Plans in Wallet', Object.keys(myObjwith).length],
          ['Without Plans in Wallet', Object.keys(myObj).length - Object.keys(myObjwith).length]
        ]), { is3D: false, colors: ['#FFAB40', '#E65100']})
      }})
    },
    SUTPieChart() {
      var myObjwith = []
      var myObj = []
      firebase.database().ref('Users')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      firebase.database().ref('SUT')
        .on('value', snap => {
          myObjwith = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('SUTChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['Users which have used SUT', Object.keys(myObjwith).length],
          ['Users which did not use SUT', Object.keys(myObj).length - Object.keys(myObjwith).length]
        ]), { is3D: false, colors: ['#00B0FF', '#0277BD']})
      }})
    },
    cardsPieChart() {
      var myObjwith = []
      var myObj = []
      firebase.database().ref('Users')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      firebase.database().ref('CardDetails')
        .on('value', snap => {
          myObjwith = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        var chart = new window.google.visualization.PieChart(document.getElementById('cardsChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['With a Card linked to the Account', Object.keys(myObjwith).length],
          ['Without a Card linked to the Account', Object.keys(myObj).length - Object.keys(myObjwith).length]
        ]), { is3D: false, colors: ['#1DE9B6', '#00796B']})
      }})
    },
    gendersPieChart() {
      let male = 0
      let female = 0
      let unspecified = 0
      firebase.database().ref('Users')
        .on('value', snap => {
          let myObj = snap.val()
          Object.keys(myObj).forEach(element => {
          if(myObj[element].Gender === 'Male')
          {
              male++
          } else {
              if(myObj[element].Gender === 'Female')
              {
              female++
              } else {
                  unspecified++
              }
          }
        }), error => {
        console.log('Error: ' + error.message)
      }
      });
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        let chart = new window.google.visualization.PieChart(document.getElementById('gendersChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['Male', male],
          ['Female', female],
          ['Unspecified', unspecified]
        ]), { is3D: false, colors: ['#D50000', '#FF4081', '#4A148C']})
      }})
    },
    studentsPieChart() {
      let regularUser = 0
      let studentUser = 0
      firebase.database().ref('Users')
        .on('value', snap => {
          let myObj = snap.val()
          Object.keys(myObj).forEach(element => {
          if(myObj[element].Student)
          {
              studentUser++
          } else {
              regularUser++
          }
        }), error => {
        console.log('Error: ' + error.message)
      }
      });
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        let chart = new window.google.visualization.PieChart(document.getElementById('studentsChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['Regular Users', regularUser],
          ['Student Users', studentUser]
        ]), { is3D: false, colors: ['#7CB342', '#64DD17']})
      }})
    },
    agePieChart() {
        let ages = []
        let x = []
        firebase.database().ref('Users')
            .on('value', snap => {
            let myObj = snap.val()
            Object.keys(myObj).forEach(element => {
                let today = new Date();
                let birthDate = new Date(myObj[element].Birthdate);
                let age = today.getFullYear() - birthDate.getFullYear();
                let m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age = age - 1;
                }
            ages.push(age)
            }), error => {
            console.log('Error: ' + error.message)
            }
            let a = []
            let b = []
            let prev
            let color = '#D84315'
            ages.sort()
            for ( let i = 0; i < ages.length; i++ ) {
                if ( ages[i] !== prev ) {
                    a.push(ages[i])
                    b.push(1)
                } else {
                    b[b.length-1]++
                }
                prev = ages[i]
            }
            x = [[ 'Age', 'Frequency', { role: 'style' } ]]
            for (let i = 0; i < a.length; i++) {
                x.push([a[i], b[i], color])
            }
        });
        google.charts.load('visualization', '1.0',
        { packages: ['corechart', 'bar', 'table'], callback: () => {
            let data = window.google.visualization.arrayToDataTable(x)
            let view = new window.google.visualization.DataView(data)
            view.setColumns([0, 1,
                { calc: 'stringify',
                sourceColumn: 1,
                type: 'string',
                role: 'annotation' },2])
            let chart = new window.google.visualization.ColumnChart(document.getElementById('ageChart'))
            chart.draw(view, {
             height: 500,
             bar: {groupWidth: '95%'},
            legend: { position: 'none' }})
        }})
    },
    pendingStudents() {
      firebase
        .database()
        .ref("StudentValidation")
        .on("value", snap => {
          let myObj = snap.val();
          if(myObj !== null)
          {
            let keys = Object.keys(snap.val());
            this.students.keys = keys;
            this.students.data = myObj;
          } else {
            this.students.keys = null
          }
        });
    },
    loadStudentData(id) {
      this.studentPics.front = firebase.storage().ref("/" + id + "/studentID/front").getDownloadURL()
      this.studentPics.back = firebase.storage().ref("/" + id + "/studentID/back").getDownloadURL()
      this.studentPics.selfie = firebase.storage().ref("/" + id + "/studentID/selfie").getDownloadURL()
      firebase
        .database()
        .ref("StudentValidation/" + id + "/Confidence")
        .on("value", snap => {
          let myObj = snap.val();
          this.studentConfidence = myObj.confidence;
          this.studentIsIdentical = myObj.isIdentical;
        });
      this.studentSelected = id
    },
    curday(sp) {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      return dd + sp + mm + sp + yyyy;
    },
    curtime() {
      let today = new Date();
      let hh = today.getHours();
      let mm = today.getMinutes();
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      let time = hh + ":" + mm;
      return time;
    },
    studentReject() {
      this.studentNotification = false
      firebase
        .database()
        .ref("Users/" + this.studentSelected + "/Student")
        .remove()
      firebase
        .database()
        .ref("Users/" + this.studentSelected + "/Notifications")
        .push({
          Title: "Student ID was Rejected",
          Type: "alert",
          Content: this.studentApproval.notification,
          Time: this.curtime(),
          Date: this.curday('-')
        })
      firebase
        .database()
        .ref("StudentValidation/" + this.studentSelected).remove().then(() => {
          this.studentSelected = false
          this.studentNotification = true
        })
    },
    studentApprove() {
      this.studentNotification = false
      firebase
        .database()
        .ref("Users/" + this.studentSelected + "/Student")
        .set({
          ID: this.studentApproval.id,
          Status: "approved",
          Valid: this.studentApproval.valid
        })
      firebase
        .database()
        .ref("Users/" + this.studentSelected + "/Notifications")
        .push({
          Title: "Student ID was Approved",
          Type: "info",
          Content: "Your Student ID has been validated. Now you can buy Student dedicated Plans.",
          Time: this.curtime(),
          Date: this.curday('-')
        })
      firebase
        .database()
        .ref("StudentValidation/" + this.studentSelected).remove().then(() => {
          this.studentSelected = false
          this.studentNotification = true
        })
    },
    metroLoader() {
      firebase
        .database()
        .ref("MetroLine")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.metro.keys = keys;
          this.metro.data = myObj;
        });
    },
    metroStatusUpdate() {
      this.metro.notification = false
      firebase
        .database()
        .ref("MetroLine/" + this.metro.line)
        .update({
          Status: this.metro.status
        }).then(()=>{this.metro.notification = true})
    },
    metroStatusLoad() {
      firebase
        .database()
        .ref("MetroLine")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.subway.keys = keys;
          this.subway.data = myObj;
        });
    },
    notificationSend() {
      this.notification.notif = false
      firebase
        .database()
        .ref("Users")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          this.users.keys = keys;
          this.users.data = myObj;
        });
      firebase
        .database()
        .ref("News")
        .push({
          Title: this.notification.title,
          Type: this.notification.type,
          Content: this.notification.content,
          Time: this.curtime(),
          Date: this.curday('-')
        }).then(()=>{
          this.users.keys.forEach(user => {
            firebase
              .database()
              .ref("Users/" + user + "/Notifications")
              .push({
                Title: this.notification.title,
                Type: this.notification.type,
                Content: this.notification.content,
                Time: this.curtime(),
                Date: this.curday('-')
              }).then(()=>{this.notification.notif = true})
        })
      });
    },
    userCreatedTableGenerate() {
      let startDate = this.userCreatedRange[0].replace(/-/g,"/")
      let startyear = startDate.slice(0,4)
      let startmonth = startDate.slice(5,7)
      let startday = startDate.slice(8,10)
      let dateBegin = new Date(startyear, startmonth, startday)

      let endDate = this.userCreatedRange[1].replace(/-/g,"/")
      let endyear = endDate.slice(0,4)
      let endmonth = endDate.slice(5,7)
      let endday = endDate.slice(8,10)
      let dateFinish = new Date(endyear, endmonth, endday)

      this.usersCreatedTable = []
      firebase
        .database()
        .ref("Users")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          keys.forEach(user => {
            let fireday = myObj[user].Created.slice(0,2)
            let firemonth = myObj[user].Created.slice(3,5)
            let fireyear = myObj[user].Created.slice(6,10)
            let dateCreated = new Date(fireyear, firemonth, fireday)
            if(dateCreated < dateFinish && dateCreated > dateBegin){
              this.usersCreatedTable.push({
                id:user,
                name:myObj[user].Name,
                created:myObj[user].Created
                })
            } else if (dateCreated > dateFinish && dateCreated < dateBegin){
              this.usersCreatedTable.push({
                id:user,
                name:myObj[user].Name,
                created:myObj[user].Created
                })
            }
          });
        });
    },
    purchasesTableGenerate() {
      let startDate = this.purchasesRange[0].replace(/-/g,"/")
      let startyear = startDate.slice(0,4)
      let startmonth = startDate.slice(5,7)
      let startday = startDate.slice(8,10)
      let dateBegin = new Date(startyear, startmonth, startday)

      let endDate = this.purchasesRange[1].replace(/-/g,"/")
      let endyear = endDate.slice(0,4)
      let endmonth = endDate.slice(5,7)
      let endday = endDate.slice(8,10)
      let dateFinish = new Date(endyear, endmonth, endday)

      this.purchasesTable = []
      let purchaseAmount = 0
      firebase
        .database()
        .ref("History/Purchase")
        .on("value", snap => {
          let myObj = snap.val();
          let keys = Object.keys(snap.val());
          keys.forEach(key => {
            let keys2 = Object.keys(myObj[key])
            keys2.forEach(purchase => {
              let fireday = myObj[key][purchase].Date.slice(0,2)
              let firemonth = myObj[key][purchase].Date.slice(3,5)
              let fireyear = myObj[key][purchase].Date.slice(6,10)
              let dateCreated = new Date(fireyear, firemonth, fireday)

              if(dateCreated < dateFinish && dateCreated > dateBegin){
                this.purchasedTotalAmount=null
                purchaseAmount += parseInt(myObj[key][purchase].Cost.replace(/ RON/g,""))
                this.purchasedTotalAmount = purchaseAmount
                this.purchasesTable.push({
                  id:purchase,
                  name:myObj[key][purchase].Type,
                  date:myObj[key][purchase].Date,
                  time:myObj[key][purchase].Time,
                  cost:myObj[key][purchase].Cost
                  })
              } else if (dateCreated > dateFinish && dateCreated < dateBegin){
                this.purchasedTotalAmount=null
                purchaseAmount += parseInt(myObj[key][purchase].Cost.replace(/ RON/g,""))
                console.log(purchaseAmount)
                this.purchasedTotalAmount = purchaseAmount
                this.purchasesTable.push({
                  id:purchase,
                  name:myObj[key][purchase].Type,
                  date:myObj[key][purchase].Date,
                  time:myObj[key][purchase].Time,
                  cost:myObj[key][purchase].Cost
                  })
              }
            });
          });
          // console.log(keys)
          // console.log(myObj[keys[1]])
          // keys.forEach(user => {
            // let fireday = myObj[user].Created.slice(0,2)
            // let firemonth = myObj[user].Created.slice(3,5)
            // let fireyear = myObj[user].Created.slice(6,10)
            // let dateCreated = new Date(fireyear, firemonth, fireday)
            // if(dateCreated < dateFinish && dateCreated > dateBegin){
            //   this.usersCreatedTable.push({
            //     id:user,
            //     name:myObj[user].Name,
            //     created:myObj[user].Created
            //     })
            // } else if (dateCreated > dateFinish && dateCreated < dateBegin){
            //   this.usersCreatedTable.push({
            //     id:user,
            //     name:myObj[user].Name,
            //     created:myObj[user].Created
            //     })
            // }
          // });
        });
    }
  },

};

</script>

<style scoped>
.custom-router-link-transparency {
  color: transparent;
  height: 25vh !important;
  align-self: center;
}

.custom-back-button {
  z-index: 1000;
  position: absolute;
  left: 8vw;
  bottom: 1vh;
}

.custom-content-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.admin-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: 0;
  background: white;
}

.custom-student-wrapper {
  align-self: center;
  width: 35vw;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.custom-student-empty-wrapper {
  display: flex;
  width: 35vw;
  height: 100%;
}

.custom-student-data {
  width: 60vw;
  display: flex;
}

.custom-student-empty-data {
  width: 100%;
  display: flex;
}

.custom-notification-card {
  margin-left: auto;
  justify-self: center;
  align-self: center;
  margin-right: auto;
  width: 20vw;
}

.custom-notification-empty-card {
  margin-left: auto;
  justify-self: center;
  align-self: center;
  margin-right: auto;
  width: 17vw;
}

.custom-notification-empty-card-wrap {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.custom-notification-card-wrap {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.custom-header-grid {
  display: grid;
  grid-template-columns:  1fr 10fr;
}

.custom-menu-wrapper {
  align-self: center;
  overflow-y: auto;
  width: 28vw;
  height: 100%;
}

.custom-card-grid {
  display: grid;
  grid-template-columns:  1fr 4fr 1fr;
}

.statistics-grid {
  display: grid;
  grid-template-columns:  1fr 1fr;
}

.statistics-grid-full-line {
  display: grid;
  grid-template-columns:  1fr;
}

.student-buttons-grid {
  display: grid;
  grid-template-columns:  1fr 1fr;
}

.menu-button {
    height: 30px;
    width: 30px;
    justify-self: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.menu-title {
    align-self: center;
    font-weight: 500;
    font-size: 1rem;
}

.student-title {
    margin-left: 5px;
    font-weight: 500;
    font-size: 1.2rem;
}

.custom-notification {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.custom-metro-line-info {
  width: 50vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.custom-metro-card-grid {
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1.8fr 4fr 1.3fr;
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

.custom-subway-text {
  font-size: 2.5vh;
}

.custom-subway-text-status {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87) !important;
  font-size: 2.5vh;
}

.display-flex {
  display: flex;
}

.align-center {
    align-self: center;
}

.justify-center {
  justify-self: center !important;
}

.justify-content-center {
  justify-content: center !important;
}

.margin-L-R {
  margin-left: auto;
  margin-right: auto;
}

.width-carousel {
  width: 710px;
}

.overflow-y {
  overflow-y: auto;
}

.custom-line-number {
  padding: 0px;
  margin-bottom: 0px !important;
  align-self: center;
  justify-content: start;
  text-overflow: ellipsis;
  width: -webkit-fill-available;
  font-weight: 600;
  font-size: 1.2rem;
  color: inherit;
}

.confidence-score-text{
  font-size: 2.5vh;
  font-weight: 800;
}

.student-id-image{
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.custom-users-created-title{
  display: flex;
  font-size: 21px;
  font-weight: 400;
  justify-self: center;
  margin-top: 1.5vh;
  margin-bottom: 2.5vh;
}

.table-width {
    width: 46vw;
    height: 83vh;
    border-radius: 30px;
}

.calendar-created-users{
  margin-top: 10vh;
}

.purchase-total-amount{
  width: 100%;
  display: flex;
  margin-top: 1vh;
  justify-content: center;
}

.custom-total-amount-title{
  display: flex;
  font-size: 21px;
  font-weight: 400;
  position: absolute;
  right: 17vw;
  margin-top: 1.5vh;
  margin-bottom: 2.5vh;
}
</style>