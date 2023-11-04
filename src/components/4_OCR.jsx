import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import db from "../firebase";
import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import SimpleBottomNavigation from "./parts/footer";

const API_KEY = "AIzaSyBim71NCsgxVGOpNCXrswtQ0OjN5vzvomI";
const CX = "502fc3d9bfefa4fcc";

function OCR({ image, clipPath, onRestart, onExit, albumId, onBack, onAlbum, onShare }) {
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSave = async () => {
    const collectionRef = collection(db, albumId);
    const querySnapshot = await getDocs(collectionRef);
    const cleanedText = text.replace(/\n/g, ",").replace(/\s+/g, " ").trim();
    let documentExists = false;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.field1 === image && data.field2 === cleanedText) {
        documentExists = true;
        const docId = doc.id;
        updateDoc(doc(collectionRef, docId), { field1: image, field2: cleanedText });
      }
    });

    if (!documentExists) {
      await addDoc(collectionRef, { field1: image, field2: cleanedText });
    }
    alert("保存されました！");
  };

  useEffect(() => {
    const doOCR = async () => {
      const { data } = await Tesseract.recognize(image, "jpn", { logger: (m) => console.log(m) });
      const cleanedText = data.text.replace(/ /g, "");
      setText(cleanedText);
    };
    doOCR();
  }, [image]);

  useEffect(() => {
    const performGoogleSearch = async () => {
      const searchQuery = text;
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error("Google検索に失敗しました");
      }
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const topResults = data.items.slice(0, 3);
        setSearchResults(topResults);
      } else {
        setSearchResults([]);
      }
    };
    if (text) {
      performGoogleSearch();
    }
  }, [text]);

  return (
    <div>
      <h2>撮影された画像はこちらです！</h2>
      <img src={image} alt="画像" style={{ clipPath, width: "50%" }} />
      <br />
      <button onClick={onRestart}>もう一度</button>
      <button onClick={onExit}>終了する</button>
      <button onClick={handleSave}>保存</button>
      <h2>抽出した文字</h2>
      <p>{text}</p>
      <h2>検索結果</h2>
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
          </div>
        ))}
      </div>
      <SimpleBottomNavigation onBack={onBack} onAlbum={onAlbum} onShare={onShare} />
    </div>
  );
}

export default OCR;
