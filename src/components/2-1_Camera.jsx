// 撮影画面
import React, { useRef, useEffect } from 'react';

function Camera({ onEditor }) {

  // 初期化
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {

    // カメラを起動する
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    };
    startCamera();
  }, []);

  // カメラを停止する
  const stopCamera = () => {
    const tracks = streamRef.current.getTracks();
    tracks.forEach(track => track.stop());
  };

  // 撮影する
  const captureImage = () => {
    const canvas  = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width  = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    onEditor(dataUrl);
    stopCamera();
  };

  return (
    <div>
      <h2>画像を編集する</h2>
      <video ref={videoRef} autoPlay style={{ width: '25%' }} /><br/>
      <button onClick={captureImage}>撮影する</button>
    </div>
  );
}

export default Camera;
