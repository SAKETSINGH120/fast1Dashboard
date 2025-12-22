import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createDocument } from "../cloudFirestore/setData";
import { getDocumentData } from "../cloudFirestore/getData";
// Login users using their Email and Password
export const emailPasswordLogin = async (mail, pass) => {
  const res = await signInWithEmailAndPassword(auth, mail, pass).catch((err) => { }
  );

  return res;
};

// Login users using their Google account
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider).then((res) => {
    const obj = {
      email: res.user.email,
      userName: res.user.displayName,
      photo: res.user.photoURL,
      isActive: false,
    }
    getDocumentData("users", res.user.uid).then((res1) => {
      if (res1 === undefined) {
        createDocument("users", res.user.uid, obj).then(r => console.log(r)).catch(err => console.log(err))
      }
    })

  }).catch(() =>
    alert("Error occurred while logging in with Google")
  );

  return res;
};

// Login users using their Facebook account
export const facebookLogin = async () => {
  const provider = new FacebookAuthProvider();

  const res = await signInWithPopup(auth, provider).catch(() =>
    alert("Error occurred while logging In with Facebook")
  );

  return res;
};
