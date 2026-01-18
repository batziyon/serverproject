import { useState } from "react";
// אנחנו מייבאים את העיצוב כאובייקט בשם styles
import styles from "../../css/TodoItem.module.css"; 

function TodoItem({ item, onDelete, onToggle, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.title);

  return (
    // משתמשים ב-styles.card במקום לכתוב את כל ה-style הארוך
    <div className={styles.card}>
      
      <div className={styles.content}>
        <input 
          type="checkbox" 
          checked={item.completed} 
          onChange={() => onToggle(item)} 
          className={styles.checkbox}
        />

        <span className={styles.idBadge}>{item.id}</span>

        {!isEditing ? (
          <span className={`${styles.title} ${item.completed ? styles.completed : ""}`}>
            {item.title}
          </span>
        ) : (
          <input 
            value={value} 
            onChange={e => setValue(e.target.value)} 
            className={styles.inputField}
            autoFocus
          />
        )}
      </div>

      <div className={styles.actions}>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className={`${styles.btn} ${styles.editBtn}`}
          >
            ✎ עריכה
          </button>
        ) : (
          <button 
            onClick={() => { onChange(item, value); setIsEditing(false); }}
            className={`${styles.btn} ${styles.saveBtn}`}
          >
            ✓ שמור
          </button>
        )}

        <button 
          onClick={() => onDelete(item.id)}
          className={`${styles.btn} ${styles.deleteBtn}`}
        >
          🗑 מחק
        </button>
      </div>
    </div>
  );
}

export default TodoItem;