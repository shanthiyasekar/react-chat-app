// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBc2kM7ZX2O7Z15vc6HXGbMrXVSZ_dEInA",
  authDomain: "facebook-clone-178d5.firebaseapp.com",
  projectId: "facebook-clone-178d5",
  storageBucket: "facebook-clone-178d5.appspot.com",
  messagingSenderId: "564133910390",
  appId: "1:564133910390:web:4f25260a815aa278228c57",
  measurementId: "G-2TVP5JM7BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);