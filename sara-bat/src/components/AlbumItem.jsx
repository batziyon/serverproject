import { useState } from "react";
import { useAlbumPhotos } from "./useAlbumPhotos";

function AlbumItem({ item, onDelete }) {
  const [open, setOpen] = useState(false);
  const { photos, loadInitial, loadMore } = useAlbumPhotos();

  const toggle = () => {
    setOpen(!open);
    if (!photos[item.id]) {
      loadInitial(item.id);
    }
  };

  return (
    <div>
      <strong onClick={toggle}>{item.id}-{item.title}</strong>
      <button onClick={() => onDelete(item.id)}>מחק</button>

      {open && photos[item.id] && (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            {photos[item.id].map(p => (
              <img key={p.id} src={p.thumbnailUrl} />
            ))}
          </div>
          <button onClick={() => loadMore(item.id)}>
            טען עוד
          </button>
        </>
      )}
    </div>
  );
}

export default AlbumItem;
