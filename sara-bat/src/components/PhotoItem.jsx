import { useState } from "react";
import { useParams } from "react-router-dom";

function PhotoItem({ item, onDelete, onChange }) {

const { userId, albumId, photoId } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  return (
    <div style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
      <img src={item.thumbnailUrl} alt="" />

      <div>
        <strong>{item.id}</strong> –{" "}
        {!isEditing ? (
          title
        ) : (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        )}
      </div>

      {!isEditing ? (
        <>
          <button onClick={() => onDelete(item.id)}>מחק</button>
          <button onClick={() => setIsEditing(true)}>שינוי</button>
        </>
      ) : (
        <button
          onClick={() => {
            onChange(item, title);
            setIsEditing(false);
          }}
        >
          שמור
        </button>
      )}
    </div>
);

}

export default PhotoItem;
