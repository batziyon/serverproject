import { useParams } from "react-router-dom";
import ListPage from "./ListPage";
import PhotoItem from "./PhotoItem";
import { getPhotosByAlbum } from "../api/api"; // וודאי שיש לך את הפונקציה הזו ב-api.js

export default function PhotosPage() {
  const { userId, albumId } = useParams();

  const updatePhoto = (item, newTitle) => ({ ...item, title: newTitle });

  // פונקציית טעינה מדורגת (ממירה עמודים ל-Start/Limit)
  const fetchMyPhotos = async (page, limit) => {
     const start = (page - 1) * limit;
     return await getPhotosByAlbum(albumId, start, limit);
  };

  return (
    <ListPage
      title="Photos"
      fetchData={fetchMyPhotos}
      limit={10} // טוען 10 תמונות בכל פעם
      
      baseData={{ albumId: parseInt(albumId) }}
      
      // כפתור חזור לאלבומים של המשתמש
      backPath={`/users/${userId}/albums`} 
      
      // שדות להוספת תמונה חדשה (כותרת וכתובת URL)
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