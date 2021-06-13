import firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA_qAOMpzs9Pd7lZSEAnQPloQI_BXCXBw8",
  authDomain: "white-proxy-313620.firebaseapp.com",
  databaseURL: "https://white-proxy-313620-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "white-proxy-313620",
  storageBucket: "white-proxy-313620.appspot.com",
  messagingSenderId: "883007742482",
  appId: "1:883007742482:web:ef1361f1107bb14560eecb",
  measurementId: "G-SGC0JQKGSV"
};


export default function firebaseClient () {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}