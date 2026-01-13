import { useState } from "react";
import PhotoItem from "./PhotoItem";
import { useAlbumPhotos } from "./useAlbumPhotos";

function AlbumItem({ album, onDelete, onUpdate }) {
  const [title, setTitle] = useState(album.title);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const { photos, loadInitial, deletePhoto, updatePhoto } = useAlbumPhotos();

  const handleSave = () => {
    onUpdate(album.id, { title });
    setIsEditing(false);
  };

  const togglePhotos = () => {
    setOpen(prev => !prev);
    if (!photos[album.id]) loadInitial(album.id);
  };

  return (
    <div style={{ border: "1px solid #aaa", padding: 8, marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {isEditing ? (
          <input value={title} onChange={e => setTitle(e.target.value)} />
        ) : (
          <strong>{title}</strong>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)}>עדכן אלבום</button>
              <button onClick={() => onDelete(album.id)}>מחק אלבום</button>
              <button onClick={togglePhotos}>{open ? "סגור תמונות" : "פתח תמונות"}</button>
            </>
          ) : (
            <>
              <button onClick={handleSave}>שמור</button>
              <button onClick={() => { setIsEditing(false); setTitle(album.title); }}>ביטול</button>
            </>
          )}
        </div>
      </div>

      {open && photos[album.id] && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {photos[album.id].map(photo => (
            <PhotoItem
              key={photo.id}
              albumId={album.id}
              photo={photo}
              onDelete={deletePhoto}
              onUpdate={updatePhoto}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AlbumItem;
