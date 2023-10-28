// 編集画面
import React, { useState, useEffect } from 'react';

function Editor({ image, onOCR }) {

  // 初期化
  const [t, setT] = useState(0);
  const [r, setR] = useState(0);
  const [b, setB] = useState(0);
  const [l, setL] = useState(0);
  const [dim, setDim] = useState({ width: 0, height: 0 });
  const hl_clipPath = () => { return `inset(${t}px ${r}px ${b}px ${l}px)`; };
  const hl_Input = (e, setter) => setter(parseInt(e.target.value, 10));

  // 画像の読み込みと画像の大きさの設定
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setDim({ width: img.width, height: img.height });
  }, [image]);

  return (
    <div>
      <h2>画像を編集する</h2>
      <img src={image} alt="Captured" style={{ clipPath: hl_clipPath(), width: '50%' }} /><br />
      <button onClick={() => onOCR(hl_clipPath())}>次に進む</button><br />
      <label>上:</label><input type="range" min="0" max={dim.height / 2} value={t} onChange={(e) => hl_Input(e, setT)} /><br />
      <label>右:</label><input type="range" min="0" max={dim.width  / 2} value={r} onChange={(e) => hl_Input(e, setR)} /><br />
      <label>下:</label><input type="range" min="0" max={dim.height / 2} value={b} onChange={(e) => hl_Input(e, setB)} /><br />
      <label>左:</label><input type="range" min="0" max={dim.width  / 2} value={l} onChange={(e) => hl_Input(e, setL)} /><br />
    </div>
  );
}

export default Editor;
