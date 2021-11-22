import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoxqJQ9OU2of9FBk4hbdTIx7MCHfiCEdI",
    authDomain: "clone-dd608.firebaseapp.com",
    projectId: "clone-dd608",
    storageBucket: "clone-dd608.appspot.com",
    messagingSenderId: "489787523442",
    appId: "1:489787523442:web:3e385d83fee6f6560e5deb",
    measurementId: "G-TKKWRN5XKT"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();
export { auth, db }