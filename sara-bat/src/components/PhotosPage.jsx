import { useParams } from "react-router-dom";
import ListPage from "./ListPage";
import PhotoItem from "./PhotoItem";
import { getPhotosByAlbum } from "../api/api"; 

export default function PhotosPage() {
  const { userId, albumId } = useParams();

  const updatePhoto = (item, newTitle) => ({ ...item, title: newTitle });
  const fetchMyPhotos = async (page, limit) => {
     const start = (page - 1) * limit;
     return await getPhotosByAlbum(albumId, start, limit);
  };

  return (
    <ListPage
      title="Photos"
      fetchData={fetchMyPhotos}
      limit={10} 
      baseData={{ albumId: parseInt(albumId) }}
      backPath={`/users/${userId}/albums`} 
      addItemFields={[
        { key: "title", placeholder: "כותרת התמונה" },
        { key: "url", placeholder: "קישור לתמונה (URL)" }
      ]}

      searchableFields={["title", "id"]}
      sortableFields={["id", "title"]}
      onUpdate={updatePhoto}
      
      renderItem={(item, del, _toggle, update) => (
        <PhotoItem
          key={item.id}
          item={item}
          onDelete={del}
          onChange={update}
        />
      )}
    />
  );
}