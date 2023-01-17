import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;