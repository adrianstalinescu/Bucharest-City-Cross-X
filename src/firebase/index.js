import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDvJts9uKbOE5GOVMHvuYXtE6ZpgYtLPbA",
  authDomain: "city-cross-x.firebaseapp.com",
  databaseURL: "https://city-cross-x.firebaseio.com",
  projectId: "city-cross-x",
  storageBucket: "city-cross-x.appspot.com",
  messagingSenderId: "756869361865",
  appId: "1:756869361865:web:9e91d7387ce0fbdf"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
