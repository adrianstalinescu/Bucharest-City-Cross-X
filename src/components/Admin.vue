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
        </div>
        <div id="ageChart"></div>
    </div>
    <div v-if="studentValidation" class="custom-content-wrapper">
        <v-expansion-panels v-for="ps in students.keys" :key="ps" class="custom-student-wrapper">
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <div class="custom-header-grid">
                        <v-icon color="deep-orange lighten-2" size="30">mdi-account-search-outline</v-icon>
                        <!-- <span>{{ps}}</span>  -->
                        <span class="align-center student-title">{{students.data[ps].Name}}</span>
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
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
        students: {
            keys: null,
            data: null
        },
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
    width: 500px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
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

.align-center {
    align-self: center;
}
</style>