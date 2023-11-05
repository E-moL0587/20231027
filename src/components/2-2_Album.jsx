import React, { useEffect, useState, useCallback } from "react";
import db from "../firebase";
import { collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import "./2-2_Album.css";
import SimpleBottomNavigation from "./parts/footer";
import "./parts/bottom_position.css"

function Album({ albumId, onBack, onShare, onAlbum, onExit }) {
  const [data, setData] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [editTex, setEditTex] = useState("");
  const [snapshot, setSnapshot] = useState(null);
  const [loading, setLoading] = useState(true);

  const AlbumData = useCallback(async () => {
    const collectionRef = collection(db, albumId);
    const snap = await getDocs(collectionRef);
    setSnapshot(snap);
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

  // 写真個々に割り当てられたボタン
  const hl_Edit = (index) => {
    setPhotoIndex(index);
    const field2Value = data[index].field2;
    setEditTex(field2Value);
  };

  // 削除ボタン
  const hl_Delete = async (index) => {
    const docToDelete = snapshot.docs[index];
    await deleteDoc(docToDelete.ref);
    setPhotoIndex(null);
    AlbumData();
    alert("削除されました！");
  };

  // 保存ボタン
  const hl_SaveEdit = async (index) => {
    const docToEdit = snapshot.docs[index];
    const updatedField2 = editTex.split('\n').join(', ');
    await updateDoc(docToEdit.ref, { field2: updatedField2 });
    setPhotoIndex(null);
    AlbumData();
    alert("保存されました！");
  };

  const goBack = () => {
    setPhotoIndex(null);
  };

  const isAlbumEmpty = data.every((item) => item.field1 === 'image' && item.field2 === 'text');

  return (
    <div className="album-container">
      <h2>アルバム一覧</h2>
      {loading ? ( // ローディング中か否か
        <div>読み込み中です！</div>
      ) : isAlbumEmpty ? ( // ローディング終了後、アルバムに写真がない時はtrue、写真がある時はfalse
        <div>
          アルバムは空です
          <br />
          <br />
          <button onClick={onBack}>戻る</button>
        </div>                    // ローディング終了後、アルバムに写真がある時、trueで写真のノート(編集)を表示、falseで写真を選択する一覧の表示
      ) : photoIndex !== null ? ( // trueとfalseは写真を選択するか否かで変化する
        <div className="photo-detail">
          <div className="search-results">
            <textarea value={editTex} onChange={(e) => setEditTex(e.target.value)} />
          </div>
          <br />
          <button onClick={() => hl_SaveEdit(photoIndex)}>保存</button>
          <button onClick={() => hl_Delete(photoIndex)}>削除</button>
          <button onClick={goBack}>戻る</button>
        </div>
      ) : (
        <div>
          <div className="album-grid">
            {data.map((item, index) => (
              <div key={index} onClick={() => hl_Edit(index)}>
                <img src={item.field1} alt="Album" style={{ width: "150px", height: "150px" }} />
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

export default Album;
