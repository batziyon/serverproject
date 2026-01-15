import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/PostItem.module.css"; // ייבוא העיצוב

function PostItem({ item, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [isExpanded, setIsExpanded] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    onChange(item, { title, body });
    setIsEditing(false);
  };
  const handleShowComments = () => {
    navigate(`/users/${userId}/posts/${item.id}/comments`);


  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div style={{ flex: 1 }}>
          <span className={styles.idBadge}>#{item.id}</span>
          {!isEditing ? (
            <span className={styles.title}>{item.title}</span>
          ) : (
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: 5, borderRadius: 8, border: "1px solid #ccc" }} />
          )}
        </div>

        {!isEditing && (
          <button onClick={() => setIsExpanded(prev => !prev)} className={styles.expandBtn}>
            {isExpanded ? "סגור ▲" : "קרא עוד ▼"}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className={styles.bodyContent}>
          {!isEditing ? (
            <p>{item.body}</p>
          ) : (
            <textarea value={body} onChange={(e) => setBody(e.target.value)} style={{ width: "100%", height: 100, padding: 10, borderRadius: 8, border: "1px solid #ccc" }} />
          )}

          <div className={styles.actions}>
            {!isEditing ? (
              <>
                <button onClick={() => setIsEditing(true)} className={`${styles.btn} ${styles.editBtn}`}>עריכה</button>
                <button onClick={handleShowComments} className={styles.viewBtn}>פתח תגובות</button>
                <button onClick={() => onDelete(item.id)} className={`${styles.btn} ${styles.deleteBtn}`}>מחק</button>
              </>
            ) : (
              <>
                <button onClick={handleSave} className={`${styles.btn} ${styles.saveBtn}`}>שמור</button>
                <button onClick={() => setIsEditing(false)} className={styles.btn} style={{ background: "#eee" }}>ביטול</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostItem;