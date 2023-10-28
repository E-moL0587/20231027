// データベースの初期化と設定
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCuk-oYaHvhjWYuUrPEmymeC8hreXPYLvA",
  authDomain: "hackathon20231027.firebaseapp.com",
  projectId: "hackathon20231027",
  storageBucket: "hackathon20231027.appspot.com",
  messagingSenderId: "802993201521",
  appId: "1:802993201521:web:46644898a07ddbe4acd6d0",
  measurementId: "G-H40YY70S71"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
