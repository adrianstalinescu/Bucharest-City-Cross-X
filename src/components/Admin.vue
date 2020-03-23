<template>
  <div class="admin-wrapper">
    <v-card class="custom-menu-wrapper" outlined elevation="0">
        <v-card color="blue-grey lighten-3" elevation="0" class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" dark size="30">mdi-chart-arc</v-icon>
            <span class="menu-title">Statistics</span>
            <v-btn fab class="menu-button" elevation="0">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card>
        <v-divider class="mb-2 mt-2"></v-divider>
        <v-card color="blue-grey lighten-3" elevation="0" class="mt-2 mx-2 custom-card-grid">
            <v-icon class="menu-icon" dark size="25">mdi-account-search-outline</v-icon>
            <span class="menu-title">Student Validation</span>
            <v-btn fab class="menu-button" elevation="0">
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
    <div class="custom-content-wrapper">
        <!--code -->
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

    };
  },

  created() {},

  watch: {
  },

  mounted() {
    this.searchHistoryPiechart()
    this.purchaseHistoryPieChart()
    this.walletPieChart()
    this.SUTPieChart()
    this.cardsPieChart()
    this.gendersPieChart()
    this.studentsPieChart()
  },

  computed: {
  },

  methods: {
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
      let myObj = []
      let male = 0
      let female = 0
      let unspecified = 0
      firebase.database().ref('Users')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
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
      });
      google.charts.load('visualization', '1.0',
     { packages: ['corechart', 'bar', 'table'], callback: () => {
        let chart = new window.google.visualization.PieChart(document.getElementById('gendersChart'))
        chart.draw(window.google.visualization.arrayToDataTable([
          ['Type', 'Number'],
          ['Male', male],
          ['Female', female],
          ['Unspecified', unspecified]
        ]), { is3D: false, colors: ['#D50000', '#C2185B', '#4A148C']})
      }})
    },
    studentsPieChart() {
      let myObj = []
      let regularUser = 0
      let studentUser = 0
      firebase.database().ref('Users')
        .on('value', snap => {
          myObj = snap.val()
        }), error => {
        console.log('Error: ' + error.message)
      }
      Object.keys(myObj).forEach(element => {
          if(myObj[element].Student)
          {
              studentUser++
          } else {
              regularUser++
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
</style>