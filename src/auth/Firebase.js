import {getStorage} from 'firebase/storage'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAk4x3pgH1whZr6ESiwPaVMvLOIBNFIP4",
  authDomain: "dating-app-f2931.firebaseapp.com",
  projectId: "dating-app-f2931",
  storageBucket: "dating-app-f2931.appspot.com",
  messagingSenderId: "306418358106",
  appId: "1:306418358106:web:3ca9d75dd4414d21908563",
  measurementId: "G-7N95NL56GN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app) 