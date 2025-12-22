import { UploadImage } from "./cloudStorage/UploadImage";

// Cloud Firestore Functions
export {
  compoundQuery,
  numOfDocuments,
  getDocumentData,
  getMatchingData,
  getCollectionData,
} from "./cloudFirestore/getData";
export { updateDocument, updateArray } from "./cloudFirestore/updateData";
export { addDocument, createDocument } from "./cloudFirestore/setData";
export { deleteDocument } from "./cloudFirestore/deleteData";

// Authentication Functions
export {
  googleLogin,
  facebookLogin,
  emailPasswordLogin,
} from "./firebaseAuth/userLogin";
export { emailPasswordSignUp } from "./firebaseAuth/userSignUp";
export { userLogout } from "./firebaseAuth/userLogout";
export { userForgetPassword } from "./firebaseAuth/userForgetPassword";

// Cloud Storage Functions
// export { uploadImage } from "./cloudStorage/UploadImage";

export {UploadImage} from "./cloudStorage/UploadImage";
