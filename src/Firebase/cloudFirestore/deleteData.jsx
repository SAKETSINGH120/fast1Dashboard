import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

// Delete a Document from a Collection
export const deleteDocument = async (collectionName, documentName) => {
  const res = deleteDoc(doc(db, collectionName, documentName)).catch((err) =>
    console.log(err)
  );

  return res;
};
