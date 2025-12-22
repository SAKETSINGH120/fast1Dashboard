import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

// Add Document to a Collection
export const addDocument = async (collectionName, data) => {
  await addDoc(collection(db, collectionName), {
    ...data,
  }).catch((err) => console.log(err));
};

// Create a Document with DocId
export const createDocument = async (collectionName, docId, data) => {
  await setDoc(doc(db, collectionName, docId), {
    ...data,
  });
};
