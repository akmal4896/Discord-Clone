import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCioaFETm9XZWoTSUVl3MfpnLwp-XqUc4E",
    authDomain: "discord-mern-22f39.firebaseapp.com",
    databaseURL: "https://discord-mern-22f39.firebaseio.com",
    projectId: "discord-mern-22f39",
    storageBucket: "discord-mern-22f39.appspot.com",
    messagingSenderId: "863395472786",
    appId: "1:863395472786:web:48e5ac872f6f1c12a34d4b",
    measurementId: "G-W428H7L7P1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;