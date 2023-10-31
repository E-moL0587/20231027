import React, { useState } from 'react';

function Home({ onCamera, onAlbum, onLogin }) {
  const [albumId, setAlbumId] = useState('');

  const handleLogin = () => {
    onLogin(albumId);
    alert('ログインされました！'+albumId+'さんようこそ！');
  };

  return (
    <div>
      <br />
      <h1>phono!</h1>
      <img src="./images/book.gif" alt="ノート" style={{ width: '75%' }} /><br/>
      <p>文字を抽出してノートに保存します。</p>
      <button onClick={onCamera}>カメラの起動</button>
      <button onClick={onAlbum}>アルバム</button><br />

      <input
        type="text"
        placeholder="ID 6桁を入力"
        value={albumId}
        onChange={(e) => setAlbumId(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}

export default Home;
