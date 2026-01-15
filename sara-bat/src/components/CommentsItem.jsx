import { useState } from "react";
import styles from "../css/PhotoItem.module.css";

function CommentsItem({ item, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  return (
    <div className={styles.card}>


      <div className={styles.info}>
        <div className={styles.id}>ID: {item.id}</div>
        {!isEditing ? (
          <div className={styles.title}>{item.title}</div>
        ) : (
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: 5, borderRadius: 5, border: "1px solid #ccc", width: "100%" }} />
        )}
      </div>

      <div className={styles.actions}>
        {!isEditing ? (
          <>
            <button onClick={() => setIsEditing(true)} className={`${styles.btn} ${styles.edit}`}>ערוך</button>
            <button onClick={() => onDelete(item.id)} className={`${styles.btn} ${styles.delete}`}>מחק</button>
          </>
        ) : (
          <button onClick={() => { onChange(item, title); setIsEditing(false); }} className={`${styles.btn} ${styles.save}`}>שמור</button>
        )}
      </div>
    </div>
  );
}
export default CommentsItem;