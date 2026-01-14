import { useState } from "react";
import { useAlbumPhotos } from "./useAlbumPhotos";
import PhotoItem from "./PhotoItem";

function AlbumItem({ item, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.title);
  const [open, setOpen] = useState(false);

  // המרת albumId למספר
  const { photos, loadMore, hasMore, reset } = useAlbumPhotos(Number(item.id));

  const togglePhotos = () => {
    debugger
    if (!open) {
      reset();    
      setTimeout(() => loadMore(), 0); // מבטיח שה-fetch הראשון יתרחש
    }
    setOpen(prev => !prev);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      {!isEditing ? (
        <h3>{item.id}-{item.title}</h3>
      ) : (
        <input value={value} onChange={e => setValue(e.target.value)} />
      )}

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>שינוי</button>
      ) : (
        <button onClick={() => { onChange(item, value); setIsEditing(false); }}>
          שמור
        </button>
      )}

      <button onClick={togglePhotos}>
        {open ? "הסתר תמונות" : "הצג תמונות"}
        
      </button>

      <button onClick={() => onDelete(item.id)}>מחק</button>

      {open && (
        <>
          <div>
            {photos.map(photo => (
              <PhotoItem
                key={photo.id}
                item={photo}
                onDelete={() => {}}
                onChange={() => {}}
              />
            ))}
          </div>

          {hasMore && <button onClick={loadMore}>טען עוד</button>}
        </>
      )}
    </div>
  );
}

export default AlbumItem;
