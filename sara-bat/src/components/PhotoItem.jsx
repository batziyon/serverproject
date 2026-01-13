import { useState } from "react";

function PhotoItem({ albumId, photo, onDelete, onUpdate }) {
  const [title, setTitle] = useState(photo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => onDelete(albumId, photo.id);
  const handleSave = () => {
    onUpdate(albumId, photo.id, { title });
    setIsEditing(false);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 4, width: 150 }}>
      <img src={photo.thumbnailUrl} alt={photo.title} />
      <div>ID: {photo.id}</div>
      {isEditing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <button onClick={handleSave}>שמור</button>
          <button onClick={() => setIsEditing(false)}>ביטול</button>
        </>
      ) : (
        <>
          <div>{title}</div>
          <button onClick={() => setIsEditing(true)}>עדכן</button>
          <button onClick={handleDelete}>מחק</button>
        </>
      )}
    </div>
  );
}

export default PhotoItem;
