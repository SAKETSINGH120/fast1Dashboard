import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

// Upload Image to Firebase Cloud Storage
export const UploadImage = async (imageFile) => {


  const imgName = `&$&${imageFile?.name}&$&${crypto.randomUUID()}`;
  const storageRef = ref(storage, `images/${imgName}.jpg`);

  const upload = await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(upload.ref);

  return downloadURL;
};


export const UploadImageForMultiple = async (imageFile,imageName) => {

  // const imgName = crypto.randomUUID();


  let imgName=`&$&${imageName}&$&${crypto.randomUUID()}`


  const storageRef = ref(storage, `images/${imgName}.jpg`);

  const upload = await uploadBytes(storageRef, imageFile);
  const downloadURL = await getDownloadURL(upload.ref);

  return downloadURL;
};
export const deleteImage = async (imageUrl) => {
  try{

    const storageRef = ref(storage, imageUrl);
  
    const deletes = await deleteObject(storageRef);
    return true;
  }catch(err){
    return true;

  }
    
};






export const UploadMultipleImages = async (arr) => {


 let promiseArr = []

  promiseArr = arr.map(async (res)=> await UploadImageForMultiple(res.imgUrl,res.name))

return Promise.all(promiseArr)
};
export const UploadMultipleImagesE = async (arr) => {


 let promiseArr = []

  promiseArr = arr.map(async (res)=> await UploadImageForMultiple(res.file,res.name))

return Promise.all(promiseArr)
};
