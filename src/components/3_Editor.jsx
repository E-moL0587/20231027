import React, { useState, useEffect, useRef } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import SimpleBottomNavigation from "./parts/footer";
import "./parts/bottom_position.css"

function ImageEditor({ image, onOCR, onExit, onAlbum, onShare }) {
  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);


  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      if (cropperRef.current) {
        const cropper = new Cropper(cropperRef.current, {
          viewMode: 2,
          crop: function() {
            const canvas = cropper.getCroppedCanvas();
            setCroppedImage(canvas.toDataURL());
          },
        });
      }
    };
  }, [image]);

  const handleCrop = () => { if (croppedImage) onOCR(croppedImage); };

  return (
    <div>
      <h2>画像を編集する</h2>
      <img src={image} ref={cropperRef} alt="Captured" style={{ width: "50%" }} /><br />
      <button onClick={handleCrop}>次に進む</button><br />
      <div className="bottom-navigation-container">
      <SimpleBottomNavigation onExit={onExit} onAlbum={onAlbum} onShare={onShare} />
      </div>
    </div>
  );
}

export default ImageEditor;
