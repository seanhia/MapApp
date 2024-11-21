// firebase.js
import { initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

//import firebase from 'firebase/app';
//import 'firebase/auth'; // Import additional services as needed (e.g., 'firebase/firestore')


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHImvQ-8khMcF0NvTbVAo4vJoTcpxSaKY",
  authDomain: "mapapp-c59c0.firebaseapp.com",
  projectId: "mapapp-c59c0",
  storageBucket: "mapapp-c59c0.firebasestorage.app",
  messagingSenderId: "298912299170",
  appId: "1:298912299170:ios:8fdf4e8c45d1ca6bf57ffb"
};


// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
