// import {initializeApp} from 'firebase/app';
// import {getFirestore,collection,doc,getDocs, orderBy} from 'firebase/firestore';
// import {getAnalytics} from 'firebase/analytics';


// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
//     measurementId: process.env.measurementId
//   }

// let analytics; let db;
// if (firebaseConfig?.projectId) {
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   if (app.name && typeof window !== 'undefined') {
//     analytics = getAnalytics(app);
//   }

//   // Access Firebase services using shorthand notation
//   db = getFirestore();
// }

// export { db};


// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBE0K5Gp8s8uBFNZmCQRWedXhYvJ6PgPM",
  authDomain: "dev-louix.firebaseapp.com",
  projectId: "dev-louix",
  storageBucket: "dev-louix.appspot.com",
  messagingSenderId: "1088516982571",
  appId: "1:1088516982571:web:69bd1b0c113a05aa4e276e",
  measurementId: "G-RHD6V7SJ3N"
};
let analytics; let db;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  db = getFirestore();
}

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore();
export{ db }