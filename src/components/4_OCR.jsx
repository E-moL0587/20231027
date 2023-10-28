// OCR処理(画像からテキストを抽出する)画面
import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import db from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function OCR({ image, clipPath, onRestart, onExit }) {
  const [text, setText] = useState('');

  // データを保存する
  const handleSave = async () => {
    await addDoc(collection(db, 'collection'), { field1: image, field2: text });
    alert('保存されました！');
  };

  useEffect(() => {

    // OCR処理
    const doOCR = async () => {
      const { data } = await Tesseract.recognize(image, 'jpn', { logger: (m) => console.log(m) });
      setText(data.text);
    };
    doOCR();
  }, [image]);

  return (
    <div>
      <h2>撮影された画像はこちらです！</h2>
      <img src={image} alt="画像" style={{ clipPath: clipPath, width: '25%' }} /><br />
      <button onClick={onRestart}>もう一度</button>
      <button onClick={onExit}>終了する</button>
      <button onClick={handleSave}>保存</button>
      <h2>抽出した文字</h2>
      <p>{text}</p>
    </div>
  );
}

export default OCR;
