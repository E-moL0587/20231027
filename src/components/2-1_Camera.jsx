// 撮影画面
import React, { useRef, useEffect, useState } from "react";
import Makebackbutton from "./parts/back";

function Camera({ onEditor, onExit }) {
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
    <div>
      <h2>画像を編集する</h2>
      <video ref={videoRef} autoPlay style={{ width: "50%" }} />
      <br />
      <Makebackbutton hl_Back={onExit} />
      <button onClick={captureImage}>撮影する</button>
      <button onClick={toggleFacingMode}>カメラ切替</button>
    </div>
  );
}

export default Camera;
