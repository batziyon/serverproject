import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../css/AlbumItem.module.css";

function AlbumItem({ item, onDelete, onChange }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  const handleShowPhotos = () => {
    navigate(`/users/${userId}/albums/${item.id}/photos`); 
  };

  return (
    <div className={styles.card}>
      <div className={styles.titleSection}>
        <div className={styles.icon}>📁</div> {/* אייקון של תיקייה */}
        <div>
          <div style={{ fontSize: "0.8rem", color: "#b8860b" }}>ALBUM #{item.id}</div>
          {!isEditing ? (
            <div style={{ fontWeight: "bold", color: "#555" }}>{item.title}</div>
          ) : (
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: 5 }} />
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className={styles.btn}>✏️</button>
        ) : (
            <button onClick={() => { onChange(item, title); setIsEditing(false); }} className={styles.btn}>💾</button>
        )}
        
        <button onClick={handleShowPhotos} className={styles.viewBtn}>פתח אלבום</button>
        <button onClick={() => onDelete(item.id)} className={styles.btn}>🗑️</button>
      </div>
    </div>
  );
}
export default AlbumItem;