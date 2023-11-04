import React, { useState } from "react";
import Makebutton from "./parts/button";
import "./1_Home.css";
import db from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";

function Home({ onCamera, onAlbum, onLogin, albumId }) {
  const [id, setId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(albumId !== "collection");

  const handleLogin = async () => {
    const userCollectionRef = collection(db, id);
    const userQuery = query(userCollectionRef);
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      alert("ユーザーが存在しません。");
    } else {
      onLogin(id);
      setIsLoggedIn(true);
      alert("ログインされました！" + id + "さんようこそ！");
    }
  };

  const sinki = async () => {
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    const collectionRef = collection(db, num);
    await addDoc(collectionRef, { field1: "image", field2: "text" });
    onLogin(num);
    setIsLoggedIn(true);

    alert(
      "ログインされました！" +
        num +
        "さんようこそ！\nID は忘れずにメモしてください！"
    );
  };

  const handleDeleteCollections = async () => {
    const collectionRef = collection(db, id.toString());

    try {
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        if (data.field1 === "image" && data.field2 === "text") {
          await deleteDoc(doc.ref);
        }
      });
    } catch (error) {
      console.error(`Error deleting collection ${id}: ${error.message}`);
    }

    alert("削除が完了しました。");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div style={{ textAlign: "right" }}>
          <p>ログインID: {albumId} さん 専用</p>
        </div>
      ) : (
        <div style={{ textAlign: "right" }}>
          <p>ゲストさん専用</p>
        </div>
      )}
      <br />
      <h1>phono!</h1>

      <img src="./images/book.gif" alt="ノート" style={{ width: "75%" }} />
      <br />
      <p>文字を抽出してノートに保存します.</p>

      <Makebutton onCamera={onCamera} />
      <button onClick={onAlbum}>アルバム</button>

      <br />

      <input
        type="text"
        placeholder="ID 6桁を入力"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
      <br />
      <button onClick={sinki}>新規ログイン</button>
      {/* <button onClick={handleDeleteCollections}>nn</button> */}
    </div>
  );
}

export default Home;
