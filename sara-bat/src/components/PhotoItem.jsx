import { useState } from "react";

function PhotoItem({ item, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.title);

  return (
    <div style={{ marginBottom: "16px" }}>
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        width={150}
      />

      {!isEditing ? (
        <p>{item.title}</p>
      ) : (
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      )}

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>שינוי</button>
      ) : (
        <button
          onClick={() => {
            onChange(item, value);
            setIsEditing(false);
          }}
        >
          שמור
        </button>
      )}

      <button onClick={() => onDelete(item.id)}>מחק</button>
    </div>
  );
}

export default PhotoItem;
