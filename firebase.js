// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcmUBCILjYrrgWTFXvORu_-Oq49i2Pc8k",
  authDomain: "inventory-management-f0687.firebaseapp.com",
  projectId: "inventory-management-f0687",
  storageBucket: "inventory-management-f0687.appspot.com",
  messagingSenderId: "171460663246",
  appId: "1:171460663246:web:01671e9554687ee5b33d9f",
  measurementId: "G-CF3VTFQV6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
