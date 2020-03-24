<template>
  <div class="admin-wrapper">
    <v-card class="custom-menu-wrapper" outlined elevation="0">
        <v-card color="blue-grey lighten-3" elevation="0" class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" dark size="30">mdi-chart-arc</v-icon>
            <span class="menu-title">Statistics</span>
            <v-btn fab class="menu-button" elevation="0" @click="statisticsWrapper()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card>
        <v-divider class="mb-2 mt-2"></v-divider>
        <v-card color="blue-grey lighten-3" elevation="0" class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" dark size="25">mdi-account-search-outline</v-icon>
            <span class="menu-title">Student Validation</span>
            <v-btn fab class="menu-button" elevation="0" @click="studentValidationWrapper()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card>
        <v-divider class="mb-2 mt-2"></v-divider>
        <v-card color="blue-grey lighten-3" elevation="0" class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" dark size="25">mdi-subway</v-icon>
            <span class="menu-title">Metro Status</span>
            <v-btn fab class="menu-button" elevation="0">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card>
        <v-divider class="mb-2 mt-2"></v-divider>
        <v-card color="blue-grey lighten-3" elevation="0" class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" dark size="25">mdi-message-text-clock-outline</v-icon>
            <span class="menu-title">Notifications</span>
            <v-btn fab class="menu-button" elevation="0">
                <v-icon>mdi-chevron-right</v-icon>
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
            <div id="ageChart"></div>
        </div>
    </div>
    <div v-if="studentValidation" class="custom-content-wrapper display-flex">
      <v-card class="custom-student-wrapper" outlined elevation="0">
        <v-card v-for="ps in students.keys" :key="ps" outlined class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" color="#ff8a65" size="30">mdi-account-search-outline</v-icon>
            <span class="menu-title">{{students.data[ps].Name}}</span>
            <v-btn fab color="#E0E0E0" class="menu-button" elevation="0" @click="loadStudentData(ps)">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card>
      </v-card>
      <div class="custom-student-data">
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
    </div>
    <v-snackbar v-model="studentNotification" :timeout="2000" color="success">
      <span class="student-notification">The Student ID has been Approved</span>
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
        studentSelected: false,
        students: {
            keys: null,
            data: null
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
        studentNotification: false
    };
  },

  created() {},

  watch: {
  },

  mounted() {
  },

  computed: {
  },

  methods: {
    statisticsWrapper() {
        this.emptyWrap = false
        this.studentValidation = false
        this.statistics = true
    },
    studentValidationWrapper() {
        this.emptyWrap = false
        this.statistics = false
        this.studentValidation = true
        this.pendingStudents()
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
          let keys = Object.keys(snap.val());
          this.students.keys = keys;
          this.students.data = myObj;
        });
    },
    loadStudentData(id) {
      this.studentPics.front = firebase.storage().ref("/" + id + "/studentID/front").getDownloadURL()
      this.studentPics.back = firebase.storage().ref("/" + id + "/studentID/back").getDownloadURL()
      this.studentPics.selfie = firebase.storage().ref("/" + id + "/studentID/selfie").getDownloadURL()
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
      
    }
  },

};

</script>

<style scoped>
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
  overflow-y: auto;
  width: 35vw;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.custom-student-data {
  width: 60vw;
  display: flex;
}

.custom-notification-card {
  margin-left: auto;
  justify-self: center;
  align-self: center;
  margin-right: auto;
  width: 20vw;
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

.student-notification {
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
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

.width-carousel {
  width: 710px;
}

.overflow-y {
  overflow-y: auto;
}
</style>