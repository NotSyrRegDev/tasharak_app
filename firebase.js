import { initializeApp , getApps } from "firebase/app";
import { collection, doc, setDoc  , getDocs , getFirestore , where , query , deleteDoc  , updateDoc , increment  , getDoc  , orderBy , limit , or } from "firebase/firestore";
import { signInWithEmailAndPassword , getAuth , signOut , updatePassword  , createUserWithEmailAndPassword , onAuthStateChanged , updateProfile  , fetchSignInMethodsForEmail, sendEmailVerification    } from 'firebase/auth';

import { getStorage, ref, uploadBytes, getDownloadURL  , refFromURL, deleteObject } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyD804Ovhhrb4X32pBxnzG9o4S2WdvuSxnc",
  authDomain: "tasharakapp.firebaseapp.com",
  projectId: "tasharakapp",
  storageBucket: "tasharakapp.appspot.com",
  messagingSenderId: "411296530889",
  appId: "1:411296530889:web:589aa1f74af09290fea818",
  measurementId: "G-ZMTNJEB3PB"
};

const isFirebaseConnected = () => {
  const firebaseApps = getApps();
  return firebaseApps.length > 0;
};


  
   const FIREBASE_APP = initializeApp(firebaseConfig);
   const auth = getAuth(FIREBASE_APP);
   const db = getFirestore(FIREBASE_APP);
   const storage = getStorage(FIREBASE_APP);



   export { FIREBASE_APP , auth , db ,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged , setDoc , doc , where , query , collection , getDocs   , deleteDoc , updateDoc , increment , getDoc  , signOut , orderBy ,limit , updatePassword  , updateProfile , fetchSignInMethodsForEmail , storage , ref , getDownloadURL , uploadBytes , refFromURL, deleteObject , sendEmailVerification  , or }