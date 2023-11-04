import React, { useState } from "react";
import Makebutton from "./parts/button";

import db from "../firebase";
import SimpleBottomNavigation from "./parts/footer";
import {
  collection,
  query,
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

function Home({ onCamera, onAlbum, onShare, onLogin, albumId }) {
  const [id, setId] = useState("");
  const [guest, setGuest] = useState(albumId !== "collection");

  // ログイン処理
  const hl_Login = async () => {
    const userCollectionRef = collection(db, id);
    const userQuery = query(userCollectionRef);
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      alert("ユーザーが存在しません。");
    } else {
      onLogin(id);

      setGuest(true);
      alert("ログインされました！" + id + "さんようこそ！");
    }
  };

  // 新規ログイン処理
  const hl_newLogin = async () => {
    await handleDeleteCollection();
    const num = Math.floor(100000 + Math.random() * 900000).toString();

    await addDoc(collection(db, num), { field1: "image", field2: "text" });
    await setDoc(doc(collection(db, "history"), num), {});

    onLogin(num);
    setGuest(true);

    alert(
      "ログインされました！" +
        num +
        "さんようこそ！\nID は忘れずにメモしてください！"
    );
  };

  // コレクションの削除処理
  const handleDeleteCollection = async () => {
    const querySnapshot = await getDocs(collection(db, "history"));

    querySnapshot.forEach(async (doc) => {
      const collectionSnapshot = await getDocs(collection(db, doc.id));

      if (!collectionSnapshot.empty) {
        let shouldDelete = true;
        collectionSnapshot.forEach((colDoc) => {
          const data = colDoc.data();
          if (data.field1 !== "image" || data.field2 !== "text")
            shouldDelete = false;
        });
        if (shouldDelete) {
          collectionSnapshot.forEach(async (colDoc) => {
            await deleteDoc(colDoc.ref);
          });
          await deleteDoc(doc.ref);
        }
      }
    });
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  return (
    <div>
      {guest ? (
        <div style={{ textAlign: "right" }}>
          <p>ログインID: {albumId} さん 専用</p>
        </div>
      ) : (
        <div style={{ textAlign: "right" }}>
          <p>ゲストさん 専用</p>
        </div>
      )}

      <br />
      <h1>phono!</h1>

      <img src="./images/book.gif" alt="ノート" style={{ width: "75%" }} />
      <br />
      <p>文字を抽出してノートに保存します.</p>

      <Makebutton onCamera={onCamera} />
      <button onClick={onCamera}>カメラの起動</button>
      <button onClick={onAlbum}>アルバム</button>

      <button onClick={onShare}>共有</button>
      <br />
      <br />
      <button onClick={hl_newLogin}>新規ログイン</button>
      <br />

      <button onClick={onShare}>共有</button>
      <br />
      <br />
      <button onClick={hl_newLogin}>新規ログイン</button>
      <br />
      <input
        type="text"
        placeholder="ID 6桁を入力"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={hl_Login}>ログイン</button>
      <br />
      <SimpleBottomNavigation onAlbum={onAlbum} onShare={onShare} />
    </div>
  );
}

export default Home;
