
import React, { useState } from 'react';

function Home({ onCamera, onAlbum, onLogin, albumId }) {
  const [id, setId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(albumId !== 'collection');

  const handleLogin = () => {
    onLogin(id);
    setIsLoggedIn(true);
    alert('ログインされました！' + id + 'さんようこそ！');
  };


  return (
    <div>
      {isLoggedIn ? (
        <div style={{ textAlign: 'right' }}>
          <p>ログインID: {albumId} さん 専用</p>
        </div>
      ) : (
        <div style={{ textAlign: 'right' }}>
          <p>ゲストさん専用</p>
        </div>
      )}
      <br />
      <h1>phono!</h1>

      <img src="./images/book.gif" alt="ノート" style={{ width: '75%' }} />
      <br />
      <p>文字を抽出してノートに保存します.</p>

      <button onClick={onCamera}>カメラの起動</button>
      <button onClick={onAlbum}>アルバム</button>
      <br />

      <input
        type="text"
        placeholder="ID 6桁を入力"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
      <p>※000000と000001とcollection(ゲスト)が使えます</p>
    </div>
  );
}

export default Home;
