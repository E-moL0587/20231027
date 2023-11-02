// データベースの初期化と設定
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD4OfXYb9uocp5xH-BbiQ_bb-5FeOCowO4",
  authDomain: "project-1576673766024200710.firebaseapp.com",
  projectId: "project-1576673766024200710",
  storageBucket: "project-1576673766024200710.appspot.com",
  messagingSenderId: "80869918120",
  appId: "1:80869918120:web:e3dcd040a3cf73c0b7899d",
  measurementId: "G-Q3BF09T7EN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
