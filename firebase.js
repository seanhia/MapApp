// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth'; // Import additional services as needed (e.g., 'firebase/firestore')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHImvQ-8khMcF0NvTbVAo4vJoTcpxSaKY",
  authDomain: "com.seanhia.MapMobileApp",
  projectId: "mapapp-c59c0",
  storageBucket: "mapapp-c59c0.appspot.com",
  messagingSenderId: "298912299170",
  appId: "1:298912299170:ios:8fdf4e8c45d1ca6bf57ffb"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
