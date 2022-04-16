import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// We copy this from Firebase, when creating the new project
const firebaseConfig = {
  apiKey: 'AIzaSyD42NaDko8kSDozXRHS1Lz-L_2_DQW0S8M',
  authDomain: 'thedojosite-fe490.firebaseapp.com',
  projectId: 'thedojosite-fe490',
  storageBucket: 'thedojosite-fe490.appspot.com',
  messagingSenderId: '620817143562',
  appId: '1:620817143562:web:282e0aa5bf5b8fbcd08cf3',
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
