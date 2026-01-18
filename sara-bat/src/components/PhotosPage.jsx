import {Navigate ,useParams } from "react-router-dom";
import ListPage from "./ListPage";
import PhotoItem from "./items/PhotoItem";
import { getPhotosByAlbum } from "../api/api"; 

export default function PhotosPage() {
  console.log("Rendering PhotosPage");
  
  const { userId, albumId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (userId !== currentUser.id) {
    return <Navigate to="/login" />; // החזר לדף הבית אם ID שונה
  }
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
      endMessage="-- אין עוד תמונות --"
      searchableFields={["title", "id"]}
      sortableFields={["id", "title"]}
      onUpdate={updatePhoto}
      showExtraSearchButton={false}
      
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