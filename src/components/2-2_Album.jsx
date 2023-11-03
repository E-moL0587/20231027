import React, { useEffect, useState, useCallback } from 'react';
import db from '../firebase';
import { collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import './2-2_Album.css';

function Album({ albumId, onBack }) {
  const [data, setData] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [editTex, setEditTex] = useState('');
  const [snapshot, setSnapshot] = useState(null);
  const [loading, setLoading] = useState(true);

  const Space = (text) => { return text.replace(/ /g, ''); };

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

  const hl_Edit = (index) => {
    setPhotoIndex(index);
    setEditTex(data[index].field2);
  };

  const hl_Delete = async (index) => {
    const docToDelete = snapshot.docs[index];
    await deleteDoc(docToDelete.ref);
    AlbumData();
    setPhotoIndex(null);
  };

  const hl_SaveEdit = async (index) => {
    const docToEdit = snapshot.docs[index];
    await updateDoc(docToEdit.ref, { field2: editTex });
    setPhotoIndex(null);
    AlbumData();
    alert('保存されました！');
  };

  const goBack = () => {
    setPhotoIndex(null);
  };

  const isAlbumEmpty = data.every(item => item.field1 === 'image' && item.field2 === 'text');

  return (
    <div className="album-container">
      <h2>アルバム一覧</h2>
      {loading ? (
        <div>読み込み中です！</div>
      ) : isAlbumEmpty ? (
        <div>アルバムは空です<br /><br />
          <button onClick={onBack}>戻る</button>
        </div>
      ) : photoIndex !== null ? (
        // データが取得済みで選択された写真の詳細表示
        <div className="photo-detail">
          <img src={data[photoIndex].field1} alt="Album" style={{ width: '50%' }} />
          <div>
            {Space(data[photoIndex].field2).split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <input type="text" value={editTex} onChange={(e) => setEditTex(e.target.value)} />
          <button onClick={() => hl_SaveEdit(photoIndex)}>保存</button>
          <button onClick={() => hl_Delete(photoIndex)}>削除</button>
          <button onClick={goBack}>戻る</button>
        </div>
      ) : (
        // データが取得済みでアルバム一覧を表示
        <div>
          <div className="album-grid">
            {data.map((item, index) => (
              <div key={index} onClick={() => hl_Edit(index)}>
                <img src={item.field1} alt="Album" style={{ width: '150px', height: '150px' }} />
              </div>
            ))}
          </div><br />
          <button onClick={onBack}>戻る</button>
        </div>
      )}
    </div>
  );
}

export default Album;
