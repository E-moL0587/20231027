import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import db from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function OCR({ image, clipPath, onRestart, onExit }) {
  const [text, setText] = useState('');
  const [searchResultURL, setSearchResultURL] = useState('');

  // データを保存する
  const handleSave = async () => {
    await addDoc(collection(db, 'collection'), { field1: image, field2: text, searchResultURL });
    alert('保存されました！');
  };

  useEffect(() => {

    // OCR処理
    const doOCR = async () => {
      const { data } = await Tesseract.recognize(image, 'jpn', { logger: (m) => console.log(m) });
      const cleanedText = data.text.replace(/\s/g, '');

      setText(cleanedText);

      // テキストを使用してウェブ検索をシミュレート
      const searchQuery = encodeURI(cleanedText);
      const searchURL = `https://www.google.com/search?q=${searchQuery}`;
      setSearchResultURL(searchURL);
    };
    doOCR();
  }, [image]);

  return (
    <div>
      <h2>撮影された画像はこちらです！</h2>
      <img src={image} alt="画像" style={{ clipPath: clipPath, width: '50%' }} /><br />
      <button onClick={onRestart}>もう一度</button>
      <button onClick={onExit}>終了する</button>
      <button onClick={handleSave}>保存</button>
      <h2>抽出した文字</h2>
      <p>{text}</p>
      {searchResultURL && (
        <div>
          <h2>検索結果</h2>
          <a href={searchResultURL} target="_blank" rel="noopener noreferrer">
            検索結果を表示
          </a>
        </div>
      )}
    </div>
  );
}

export default OCR;
