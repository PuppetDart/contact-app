import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkCPkcOvS_0GgRqT3AqzpHQ-1GrP9fMSU",
  authDomain: "contactapp-puppetdart.firebaseapp.com",
  projectId: "contactapp-puppetdart",
  storageBucket: "contactapp-puppetdart.appspot.com",
  messagingSenderId: "569406780549",
  appId: "1:569406780549:web:404500060c1d4bb4bee5ec",
  measurementId: "G-23R248LV0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export {storage,db};