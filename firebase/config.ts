import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDRv6guuL45b0_CsRshpO0YaOsTJyi9jpo',
  authDomain: 'planr-eedd7.firebaseapp.com',
  databaseURL: 'https://planr-eedd7.firebaseio.com',
  projectId: 'planr-eedd7',
  storageBucket: 'planr-eedd7.appspot.com',
  messagingSenderId: '509788535140',
  appId: '1:509788535140:web:47f6c0f113e5eb16a82271',
};

firebase.initializeApp(firebaseConfig);

export { firebase };
