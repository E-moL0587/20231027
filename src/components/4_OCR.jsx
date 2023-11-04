import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import db from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import SimpleBottomNavigation from "./parts/footer";
import "./parts/bottom_position.css"

function OCR({
  image,
  clipPath,
  onRestart,
  onExit,
  albumId,
  onBack,
  onAlbum,
  onShare,
}) {
  const [text, setText] = useState("");

// データを保存する
const handleSave = async () => {
  const querySnapshot = await getDocs(query(collection(db, albumId), where('field1', '==', 'image'), where('field2', '==', 'text')));

  // 文の改行の間に「,」を挿入し、文章からすべての空白を取り除く
  const cleanedText = text.replace(/\n/g, ',').replace(/\s+/g, ' ').trim();

  if (querySnapshot.empty) {
    await addDoc(collection(db, albumId), { field1: image, field2: cleanedText });
  } else {
    const docId = querySnapshot.docs[0].id;
    await updateDoc(doc(collection(db, albumId), docId), { field1: image, field2: cleanedText });
  }
  alert('保存されました！');
};


  useEffect(() => {
    // OCR処理
    const doOCR = async () => {
      const { data } = await Tesseract.recognize(image, "jpn", {
        logger: (m) => console.log(m),
      });
      const cleanedText = data.text.replace(/ /g, "");

      setText(cleanedText);
    };
    doOCR();
  }, [image]);

  return (
    <div>
      <h2><font face="Haettenschweiler" size="6">撮影した画像はこちらです！</font></h2>
      <br />
      <img
        src={image}
        alt="画像"
        style={{ clipPath: clipPath, width: "50%" }}
      />
      <br />
      <button onClick={onRestart}><font face="Haettenschweiler" size="3">もう一度</font></button>
      <button onClick={onExit}><font face="Haettenschweiler" size="3">終了する</font></button>
      <button onClick={handleSave}><font face="Haettenschweiler" size="3">保存</font></button>
      <h2>抽出した文字</h2>
      <p><font face="Haettenschweiler" size="5">{text}</font></p>
      <div className="bottom-navigation-container">
      <SimpleBottomNavigation
        onExit={onExit}
        onAlbum={onAlbum}
        onShare={onShare}
      />
      </div>
    </div>
  );
}

export default OCR;
