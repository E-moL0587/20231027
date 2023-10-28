// ホーム画面
import React from 'react';

function Home({ onCamera, onAlbum }) {
  return (
    <div>
      <h2>写真ノート</h2>
      <img src="./images/book.gif" alt="ノート" style={{ width: '50%' }} /><br/>
      <p>文字を抽出してノートに保存します。</p>
      <button onClick={onCamera}>カメラの起動</button>
      <button onClick={onAlbum}>アルバム</button>
    </div>
  );
}

export default Home;
