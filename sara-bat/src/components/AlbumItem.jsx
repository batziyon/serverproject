import { useState } from "react";
// import {handleDelete} from "../hooks/useListPage"
import { useAlbumPhotos } from "./useAlbumPhotos";

function AlbumItem({ item, onDelete, onChange }) {
  const [open, setOpen] = useState(false);
  const { photos, loadInitial, loadMore, handleDelete } = useAlbumPhotos();

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
      <button onClick={() => onChange(item.id)}>עידכון</button>

      {open && photos[item.id] && (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            {photos[item.id].map(p => (
              <div> <img key={p.id} src={p.thumbnailUrl} />
                <button onClick={() => handleDelete(item.id)}>   מחק </button>

              </div>
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
