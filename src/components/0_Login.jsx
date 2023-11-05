import React, { useState } from "react";
import db from "../firebase";
import {
  collection,
  query,
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import SvgIcon from "@mui/material/SvgIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./0_Login.css";

function Login({ onCamera, onAlbum, onShare, onLogin, albumId, onHome }) {
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
      onHome();
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
    onHome();
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

      <SvgIcon variant="contained" color="success" className="Icon_Position">
        <AccountCircleIcon />
      </SvgIcon>
      <br />
      <div>
        <button class="new_login_button" onClick={hl_newLogin}>
          新規ログイン
        </button>
        <br />
        <br />
        <div className="Login_Container">
          <input
            class="login_box"
            type="text"
            placeholder="ID 6桁を入力"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button class="login_button" onClick={hl_Login}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
