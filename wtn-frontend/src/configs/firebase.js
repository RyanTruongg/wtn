import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMqPcnRiihKtbefN99C1e0mIZsaFOMChM",
  authDomain: "wtn-2022.firebaseapp.com",
  projectId: "wtn-2022",
  storageBucket: "wtn-2022.appspot.com",
  messagingSenderId: "113375633550",
  appId: "1:113375633550:web:899234b815fae8b3f1a9df",
  measurementId: "G-CVGK7F8J1Y",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
