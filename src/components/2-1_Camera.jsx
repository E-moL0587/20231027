// 撮影画面
import React, { useRef, useEffect, useState } from "react";
import Makebackbutton from "./parts/back";
import MakeCamerabutton from "./parts/cameraButton";
import "./2-1_Camera.css";
import SimpleBottomNavigation from "./parts/footer";
import "./parts/bottom_position.css";

function Camera({ onEditor, onBack, onShare, onExit, onAlbum }) {
  // 初期化
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    // カメラを起動する
    const startCamera = async () => {
      const constraints = { video: { facingMode } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    };
    startCamera();
  }, [facingMode]);

  // カメラを停止する
  const stopCamera = () => {
    const tracks = streamRef.current.getTracks();
    tracks.forEach((track) => track.stop());
  };

  // 撮影する
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    onEditor(dataUrl);
    stopCamera();
  };

  // 切り替え
  const toggleFacingMode = () => {
    stopCamera();
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  return (
    <div class="whole">
      <div class="main">
        <div class="containertop">
          <h2>
            <font face="Haettenschweiler" size="6">
              画像を撮影する
            </font>
          </h2>
        </div>
        <button onClick={toggleFacingMode} className="changeCamera">カメラ切替</button>
        <video class="display" ref={videoRef} autoPlay />
        <br />
        <MakeCamerabutton captureImage={captureImage} />
      </div>
      <div className="bottom-navigation-container">
        <SimpleBottomNavigation
          onExit={onExit}
          onAlbum={onAlbum}
          onShare={onShare}
        />
      </div>
    </div>
  );
}

export default Camera;
