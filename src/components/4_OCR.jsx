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
    const querySnapshot = await getDocs(
      query(
        collection(db, albumId),
        where("field1", "==", "image"),
        where("field2", "==", "text")
      )
    );

    if (querySnapshot.empty) {
      await addDoc(collection(db, albumId), { field1: image, field2: text });
    } else {
      const docId = querySnapshot.docs[0].id;
      await updateDoc(doc(collection(db, albumId), docId), {
        field1: image,
        field2: text,
      });
    }
    alert("保存されました！");
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
      <h2>撮影された画像はこちらです！</h2>
      <img
        src={image}
        alt="画像"
        style={{ clipPath: clipPath, width: "50%" }}
      />
      <br />
      <button onClick={onRestart}>もう一度</button>
      <button onClick={onBack}>終了する</button>
      <button onClick={handleSave}>保存</button>
      <h2>抽出した文字</h2>
      <p>{text}</p>
      <SimpleBottomNavigation
        onBack={onBack}
        onAlbum={onAlbum}
        onShare={onShare}
      />
    </div>
  );
}

export default OCR;
