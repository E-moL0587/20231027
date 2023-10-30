// ホーム画面
import React from 'react';

function Home({ onCamera, onAlbum }) {
  return (
    <div>
      <br />
      <h1>phono!</h1>
      <p>kaito反映されました</p>
      <p>taiyo反映されました</p>
      <img src="./images/book.gif" alt="ノート" style={{ width: '75%' }} /><br/>
      <p>文字を抽出してノートに保存します。</p>
      <button onClick={onCamera}>カメラの起動</button>
      <button onClick={onAlbum}>アルバム</button>
    </div>
  );
}

export default Home;
