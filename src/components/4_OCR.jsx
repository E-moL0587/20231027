import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { doc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import db from "../firebase";
import SimpleBottomNavigation from "./parts/footer";
import "./parts/bottom_position.css";
import "./4_OCR.css";

const API_KEY = "AIzaSyBMgAv1bD4gemQNd6FSlSaDM-nmgD7IEiU";
const CX = "b384a2b660bf747b0";

function OCR({ image, clipPath, onRestart, onExit, albumId, onBack, onAlbum, onShare }) {
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSave = async () => {
    const collectionRef = collection(db, albumId);
    const querySnapshot = await getDocs(collectionRef);
    const cleanedText = text.replace(/\n/g, ",").replace(/\s+/g, " ").trim();
  
    let documentToDeleteId = null;
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.field1 === "image" && data.field2 === "text") {
        documentToDeleteId = doc.id;
      }
    });
  
    if (documentToDeleteId) {
      // 削除対象のドキュメントが見つかった場合に削除
      await deleteDoc(doc(collectionRef, documentToDeleteId));
    }
  
    await addDoc(collectionRef, { field1: image, field2: cleanedText });
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
      <br />
      <h2><font face="Haettenschweiler" size="5">撮影した画像はこちらです！</font></h2>
      <img
        src={image}
        alt="画像"
        className="image-container"
        style={{ clipPath, width: "90%" }}
      />
      <br />
      <button onClick={onRestart}><font face="Haettenschweiler" size="3">もう一度</font></button>
      <button onClick={onExit}><font face="Haettenschweiler" size="3">終了する</font></button>
      <button onClick={handleSave}><font face="Haettenschweiler" size="3">保存</font></button>
      <h2>検索結果</h2>
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title.length > 10 ? result.title.slice(0, 10) + "..." : result.title}
            </a>
          </div>
        ))}
      </div>
      <h2>抽出した文字</h2>
      <div className="search-results">
          <textarea value={text} />
      </div>
      <div className="bottom-navigation-container">
        <SimpleBottomNavigation onBack={onBack} onAlbum={onAlbum} onShare={onShare} />
      </div>
      <br /><br /><br /><br />
    </div>
  );
}

export default OCR;
