// 画面の状態管理

import React, { useState } from "react";
import Login from "./components/0_Login";
import Home from "./components/1_Home";
import Camera from "./components/2-1_Camera";
import Album from "./components/2-2_Album";
import Share from "./components/2-3_Share";
import Editor from "./components/3_Editor";
import OCR from "./components/4_OCR";

function App() {
  // 初期化
  const [image, setImage] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showOCR, setShowOCR] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [albumId, setAlbumId] = useState("collection");

  const handlePhotoSelected = (imageData) => {
    setImage(imageData); // 選択された写真をstateに保存
    setShowEditor(true);
    setShowHome(false);
    // Editor画面に遷移するためのロジックをここに追加することもできます
  };

  // 0 --> 1
  const hl_Home = () => {
    setShowHome(true);
    setShowLogin(false);
  };

  // 1 --> 2-1
  const hl_Camera = () => {
    setShowCamera(true);
    setShowHome(false);
  };

  // 2-1 --> 3
  const hl_Editor = (imageData) => {
    setImage(imageData);
    setShowEditor(true);
    setShowCamera(false);
  };

  // 3 --> 4
  const hl_OCR = (Image) => {
    setImage(Image);
    setShowOCR(true);
    setShowEditor(false);
  };

  // 4 --> 2-1
  const hl_Restart = () => {
    setShowCamera(true);
    setShowEditor(false);
  };

  // 4 --> 1 && 2-2 --> 1
  const hl_Exit = () => {
    setShowLogin(false);
    setShowHome(true);
    setShowOCR(false);
    setShowAlbum(false);
    setShowShare(false);
    setShowCamera(false);
    setShowEditor(false);
  };

  //  --> 2-2
  const hl_Album = () => {
    setShowAlbum(true);
    setShowHome(false);
    setShowCamera(false);
    setShowEditor(false);
    setShowOCR(false);
    setShowShare(false);
  };

  //  --> 2-3
  const hl_Share = () => {
    setShowShare(true);
    setShowHome(false);
    setShowOCR(false);
    setShowAlbum(false);
    setShowCamera(false);
    setShowEditor(false);
  };

  const handleLogin = (newAlbumId) => {
    setAlbumId(newAlbumId);
  };

  return (
    <div className="App">

      {showLogin ? (
        <Login
          onHome={hl_Home}
          onBack={hl_Exit}
          albumId={albumId}
          onCamera={hl_Camera}
          onAlbum={hl_Album}
          onShare={hl_Share}
          onLogin={handleLogin}
        />
      ) : showHome ? (
        <Home
          onCamera={hl_Camera}
          onAlbum={hl_Album}
          onShare={hl_Share}
          onLogin={handleLogin}
          albumId={albumId}
          onPhotoSelected={handlePhotoSelected}
        />
      ) : showCamera ? (
        <Camera onEditor={hl_Editor} onExit={hl_Exit} onAlbum={hl_Album} onShare={hl_Share} />
      ) : showEditor ? (
        <Editor image={image} onOCR={hl_OCR} onExit={hl_Exit} onAlbum={hl_Album} onShare={hl_Share}/>
      ) : showOCR ? (
        <OCR
          image={image}
          onRestart={hl_Restart}
          onExit={hl_Exit}
          albumId={albumId}
          onAlbum={hl_Album}
          onShare={hl_Share}
        />
      ) : showAlbum ? (
        <Album albumId={albumId} onBack={hl_Exit} onExit={hl_Exit} onAlbum={hl_Album} onShare={hl_Share}/>
      ) : showShare ? (
        <Share albumId={albumId} onBack={hl_Exit} onExit={hl_Exit} onAlbum={hl_Album} onShare={hl_Share}/>
      ) : (


        showLogin  ? (<Login  onHome={hl_Home} onBack={hl_Exit}  />) :
        showHome   ? (<Home   onCamera={hl_Camera} onAlbum={hl_Album} onShare={hl_Share} onLogin={handleLogin} albumId={albumId} />) :
        showCamera ? (<Camera onEditor={hl_Editor}  onAlbum={hl_Album} onShare={hl_Share} onExit={hl_Exit}/>) :
        showEditor ? (<Editor image={image} onOCR={hl_OCR}  onAlbum={hl_Album} onShare={hl_Share} onExit={hl_Exit}/>) :
        showOCR    ? (<OCR    image={image} onRestart={hl_Restart} onExit={hl_Exit} albumId={albumId}  onAlbum={hl_Album} onShare={hl_Share} />) :
        showAlbum  ? (<Album  albumId={albumId} onBack={hl_Exit} />) :
        showShare  ? (<Share  albumId={albumId} onBack={hl_Exit} />) :
        ""
      )}
    </div>
  );
}

export default App;
