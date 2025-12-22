// import { getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCAk4x3pgH1whZr6ESiwPaVMvLOIBNFIP4",
//   authDomain: "dating-app-f2931.firebaseapp.com",
//   projectId: "dating-app-f2931",
//   storageBucket: "dating-app-f2931.appspot.com",
//   messagingSenderId: "306418358106",
//   appId: "1:306418358106:web:98a9d51433ea29de908563",
//   measurementId: "G-S081Y1RPTF"
// };

// const app = initializeApp(firebaseConfig);

// export const storage = getStorage(app);
// export const db = getFirestore(app);
// export const auth = getAuth(app);



// firebase.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


  // your firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCA9QTm9muWTfQWuv_pmkVj4YXY8ecqKYI",
  authDomain: "ziggta.firebaseapp.com",
  projectId: "ziggta",
  storageBucket: "ziggta.appspot.com",
  messagingSenderId: "550442068544",
  appId: "1:550442068544:web:a3abb8b485e0a339db4da5"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);