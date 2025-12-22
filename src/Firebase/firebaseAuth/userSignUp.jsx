import { useState } from "react";
import { auth } from "../firebase";
import {
  updateProfile,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createContext } from "react";
// import { SignUp } from "../../pages";




// SignUp users using their Email and Password
export const emailPasswordSignUp = async (name, mail, pass) => {
  const res = await createUserWithEmailAndPassword(auth, mail, pass)
    .then(() => {
      console.log(auth.currentUser)
      updateProfile(auth.currentUser, { displayName: name }).then((res1) =>{
        console.log(res1)
        sendEmailVerification(auth.currentUser).then((res) => {
          console.log(res)
          return res;
        })
    });
    })
    .catch((err) => {
      return err.message;
    });

  return res;
};


export const updateName = async (nameOne, nameTwo) => {
  const res = await updateProfile(auth.currentUser, {
    displayName: nameOne || nameTwo,
  });
  
  return res;
};

// export const SignUpContext = createContext()

// export const SignUpContainer = () =>{
//   const [name1,setName1] = useState('')
//   const [email1,setEmail1] = useState('')
//   const [pass1,setPass1] = useState('')

//   console.log(name1)
//   console.log(email1)
//   console.log(pass1)

//   const check = () =>{
//     console.log('okokokokokokoo')
//   }
//   return (
//     <SignUpContext.Provider value={{setName1,setEmail1,setPass1,name1,email1,pass1,check}}>
//       <SignUp/>
//     </SignUpContext.Provider>
//   )
// }
