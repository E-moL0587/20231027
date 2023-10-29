// アルバム画面
import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import './2-2_Album.css';

function Album({ onBack }) {
  const [data, setData] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [editTex, setEditTex] = useState('');
  const [snapshot, setSnapshot] = useState(null);
  const Space = (text) => { return text.replace(/ /g, ''); };

  const AlbumData = async () => {
    const collectionRef = collection(db, 'collection');
    const snap = await getDocs(collectionRef);
    setSnapshot(snap);
    const dataArray = snap.docs.map((doc) => {
      const { field1, field2 } = doc.data();
      return { field1, field2 };
    });
    setData(dataArray);
  };

  useEffect(() => { AlbumData(); }, []);

  const hl_Edit = (index) => {
    setSelectedPhotoIndex(index);
    setEditTex(data[index].field2);
  };

  const hl_Delete = async (index) => {
    const docToDelete = snapshot.docs[index];
    await deleteDoc(docToDelete.ref);
    AlbumData();
    setSelectedPhotoIndex(null);
  };

  const hl_SaveEdit = async (index) => {
    const docToEdit = snapshot.docs[index];
    await updateDoc(docToEdit.ref, { field2: editTex });
    setSelectedPhotoIndex(null);
    AlbumData();
    alert('保存されました！');
  };

  const goBack = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <div className="album-container">
      <h2>アルバム一覧</h2>
      {selectedPhotoIndex !== null ? (
        <div className="photo-detail">
          <img src={data[selectedPhotoIndex].field1} alt="Album" style={{ width: '50%' }} />
          <div>
            {Space(data[selectedPhotoIndex].field2).split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <input type="text" value={editTex} onChange={(e) => setEditTex(e.target.value)} />
          <button onClick={() => hl_SaveEdit(selectedPhotoIndex)}>保存</button>
          <button onClick={() => hl_Delete(selectedPhotoIndex)}>削除</button>
          <button onClick={goBack}>戻る</button>
        </div>
      ) : (
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
