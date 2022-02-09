import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDYDZlXKK2GDT4v8pGQ3Y7yMxgGpNWPPtA",
  authDomain: "zenhome-48e97.firebaseapp.com",
  projectId: "zenhome-48e97",
  storageBucket: "zenhome-48e97.appspot.com",
  messagingSenderId: "854512153610",
  appId: "1:854512153610:web:f3df77279b3b7e3f4cdbf3",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage();

export { firebaseApp, db, auth, storage };
