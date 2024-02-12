// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl85PG3HiFMQ8TDhlQgo1WPOP774jHzTE",
  authDomain: "practica-ru.firebaseapp.com",
  projectId: "practica-ru",
  storageBucket: "practica-ru.appspot.com",
  messagingSenderId: "596125378014",
  appId: "1:596125378014:web:18164110a8640c5e16e94f"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)
const rtdb = getDatabase(app);
export { app, db, storage, rtdb }