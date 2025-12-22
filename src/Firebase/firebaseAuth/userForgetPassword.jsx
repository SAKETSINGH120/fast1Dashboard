import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export const userForgetPassword = async (mail) => {
  const res = await sendPasswordResetEmail(auth, mail)
  // .catch((err)=>{
  // console.log(err)
  //   alert("please cheack your email")
  // });

  return res;
};
