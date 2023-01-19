import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCuCjr9Gmzpx6GQhCu6FFNFLwyAVbGznVA",
    authDomain: "sistema-59c34.firebaseapp.com",
    projectId: "sistema-59c34",
    storageBucket: "sistema-59c34.appspot.com",
    messagingSenderId: "1081438247342",
    appId: "1:1081438247342:web:796bbd39bd08db0278903f",
    measurementId: "G-TG3B81PS1V"
  };
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);

  export {auth, db, storage};