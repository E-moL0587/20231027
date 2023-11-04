import React, { useEffect, useState, useCallback } from "react";
import db from "../firebase";
import { collection, setDoc, getDocs, addDoc } from "firebase/firestore";
import "./2-2_Album.css";
import SimpleBottomNavigation from "./parts/footer";
import "./parts/bottom_position.css"

function Share({ albumId, onBack, onAlbum, onExit, onShare }) {
  const [data, setData] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const Space = (text) => {
    return text.replace(/ /g, "");
  };

  const AlbumData = useCallback(async () => {
    const collectionRef = collection(db, albumId);
    const snap = await getDocs(collectionRef);
    const dataArray = snap.docs.map((doc) => {
      const { field1, field2 } = doc.data();
      return { field1, field2 };
    });
    setData(dataArray);
    setLoading(false);
  }, [albumId]);

  useEffect(() => {
    AlbumData();
  }, [AlbumData]);

  const hl_Edit = (index) => {
    setPhotoIndex(index);
    setEditText(data[index].field2);
  };

  const sharePhoto = async () => {
    if (collectionName && photoIndex !== null) {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);

      if (snapshot.empty) {
        alert("このコレクション名は存在しません。");
      } else {
        const newCollectionRef = collection(db, collectionName);
        const existingDocs = snapshot.docs;

        // ドキュメントのfield1が'image'で、field2が'text'という文字を持つか確認
        const isImageTextPair = existingDocs.some(
          (doc) => doc.data().field1 === "image" && doc.data().field2 === "text"
        );

        if (isImageTextPair) {
          // 既存のドキュメントがある場合、上書きする
          const existingDoc = existingDocs.find(
            (doc) =>
              doc.data().field1 === "image" && doc.data().field2 === "text"
          );
          await setDoc(existingDoc.ref, {
            field1: data[photoIndex].field1,
            field2: editText,
          });
        } else {
          // 既存のドキュメントがない場合、新しいドキュメントを作成する
          await addDoc(newCollectionRef, {
            field1: data[photoIndex].field1,
            field2: editText,
          });
        }
        alert("写真を共有しました！");
        setShowTextInput(false);
        setCollectionName("");
      }
    } else {
      alert("コレクション名を入力してください。");
    }
  };

  const goBack = () => {
    setPhotoIndex(null);
    setShowTextInput(false);
  };

  const isAlbumEmpty = data.every(
    (item) => item.field1 === "image" && item.field2 === "text"
  );

  return (
    <div className="album-container">
      <h2>共有するアルバム写真を選択して下さい</h2>
      {loading ? (
        <div>読み込み中です！</div>
      ) : isAlbumEmpty ? (
        <div>
          アルバムは空です
          <br />
          <br />
          <button onClick={onBack}>戻る</button>
        </div>
      ) : photoIndex !== null ? (
        <div className="photo-detail">
          <img
            src={data[photoIndex].field1}
            alt="Album"
            style={{ width: "50%" }}
          />
          <div>
            {Space(data[photoIndex].field2)
              .split("\n")
              .map((line, i) => (
                <div key={i}>{line}</div>
              ))}
          </div>
          {showTextInput ? (
            <div>
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="コレクション名を入力"
              />
              <button onClick={sharePhoto}>共有</button>
            </div>
          ) : (
            <button onClick={() => setShowTextInput(true)}>共有</button>
          )}
          <button onClick={goBack}>戻る</button>
        </div>
      ) : (
        <div>
          <div className="album-grid">
            {data.map((item, index) => (
              <div key={index} onClick={() => hl_Edit(index)}>
                <img
                  src={item.field1}
                  alt="Album"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
            ))}
          </div>
          <br />
          <button onClick={onBack}>戻る</button>
        </div>
      )}
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

export default Share;
