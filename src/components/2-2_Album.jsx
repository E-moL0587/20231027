// アルバム画面
import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import './2-2_Album.css';

function Album({ onBack }) {

  // 初期化
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [editTex, setEditTex] = useState('');
  const [snapshot, setSnapshot] = useState(null);
  const Space = (text) => { return text.replace(/ /g, ''); };

  // データを取得する
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

  // 編集する
  const hl_Edit = (index) => { setEdit(index); setEditTex(data[index].field2); };

  // 削除する
  const hl_Delete = async (index) => {
    const docToDelete = snapshot.docs[index];
    if (docToDelete) { await deleteDoc(docToDelete.ref); AlbumData(); }
  };

  // 編集を保存する
  const hl_SaveEdit = async (index) => {
    const docToEdit = snapshot.docs[index];
    await updateDoc(docToEdit.ref, { field2: editTex });
    setEdit(null); AlbumData(); alert('保存されました！');
  };

  return (
    <div className="album-container">
      <h2>アルバム一覧</h2>
      <div className="album-grid">
      {data.map((item, index) => (<div key={index}>
          <img src={item.field1} alt="Album" style={{ width: '50%' }} />

          {edit === index ? (
            // 編集モードである場合
            <div>
              <input type="text" value={editTex} onChange={(e) => setEditTex(e.target.value)} />
              <button onClick={() => hl_SaveEdit(index)}>保存</button>
            </div>
          ) : (
            // 編集モードでない場合
            <div>
              {Space(item.field2).split('\n').map((line, i) => (<div key={i}>{line}</div>))}<br/>
              <button onClick={() => hl_Edit(index)}>編集</button>
              <button onClick={() => hl_Delete(index)}>削除</button>
            </div>
          )}<br />

      </div>))}
      </div>
      <button onClick={onBack}>戻る</button>
    </div>
  );
}

export default Album;
