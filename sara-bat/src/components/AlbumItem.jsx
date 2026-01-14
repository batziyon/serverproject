import { useState, useEffect } from "react";
import PhotoItem from "./PhotoItem";
import { deleteData, updateData, createData, getPhotosByAlbum } from "../api/api";

function AlbumItem({ item, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.title);
  const [open, setOpen] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;

  const togglePhotos = () => setOpen(prev => !prev);

  // טעינת תמונות לפי page
  const loadMore = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    try {
      const offset = page * pageSize;
      const newBatch = await getPhotosByAlbum(item.id, offset, pageSize);

      if (newBatch.length < pageSize) {
        setHasMore(false);
      }

      setPhotos(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const filtered = newBatch.filter(p => !existingIds.has(p.id));
        return [...prev, ...filtered];
      });

      setPage(prev => prev + 1);
    } catch (err) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // מחיקת תמונה
  const deletePhoto = async (photoId) => {
    await deleteData("photos", photoId);
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  // עדכון תמונה
  const updatePhoto = async (photo, newTitle) => {
    await updateData("photos", photo.id, { ...photo, title: newTitle });
    setPhotos(prev => prev.map(p => p.id === photo.id ? { ...p, title: newTitle } : p));
  };

  // הוספת שורה חדשה של תמונה
  const addNewPhotoRow = () => {
    setNewPhotos(prev => [...prev, { title: "", url: "" }]);
  };

  const handleChangeNewPhoto = (index, field, value) => {
    setNewPhotos(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleAddAllNewPhotos = async () => {
    const itemsToAdd = newPhotos.filter(p => p.title && p.url);
    if (!itemsToAdd.length) return;

    const created = await Promise.all(
      itemsToAdd.map(p => createData("photos", { ...p, albumId: item.id }))
    );

    setPhotos(prev => [...prev, ...created]);
    setNewPhotos([]);
  };

  // טעינת התמונות הראשוניות כשפותחים את האלבום
  useEffect(() => {
    if (open && photos.length === 0) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div style={{ marginBottom: "24px", border: "1px solid #ddd", padding: "12px" }}>
      {/* כותרת האלבום */}
      {!isEditing ? (
        <h3>{item.id} - {item.title}</h3>
      ) : (
        <input value={value} onChange={e => setValue(e.target.value)} />
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

      <button onClick={togglePhotos}>
        {open ? "הסתר תמונות" : "הצג תמונות"}
      </button>
      <button onClick={() => onDelete(item.id)}>מחק</button>

      {/* תמונות */}
      {open && (
        <>
          {isLoading && <p>טוען...</p>}
          {!isLoading && photos.length === 0 && <p>אין תמונות</p>}

          {photos.map(photo => (
            <PhotoItem
              key={photo.id}
              item={photo}
              onDelete={deletePhoto}
              onChange={updatePhoto}
            />
          ))}

          {hasMore && !isLoading && (
            <button onClick={loadMore}>טען עוד</button>
          )}

          {/* הוספת תמונות חדשות */}
          <div style={{ marginTop: "16px", borderTop: "1px solid #ccc", paddingTop: "8px" }}>
            <h4>הוסף תמונה חדשה</h4>
            <button onClick={addNewPhotoRow}>הוסף שורה</button>
            {newPhotos.map((p, index) => (
              <div key={index} style={{ marginTop: "8px" }}>
                <input
                  type="text"
                  placeholder="כותרת"
                  value={p.title}
                  onChange={e => handleChangeNewPhoto(index, "title", e.target.value)}
                  style={{ width: "45%", marginRight: "4%" }}
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={p.url}
                  onChange={e => handleChangeNewPhoto(index, "url", e.target.value)}
                  style={{ width: "45%" }}
                />
              </div>
            ))}
            {newPhotos.length > 0 && (
              <button onClick={handleAddAllNewPhotos} style={{ marginTop: "8px" }}>
                שמור את כל התמונות
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AlbumItem;
