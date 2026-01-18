import {Navigate ,useParams } from "react-router-dom";
import ListPage from "../components/ListPage";
import PhotoItem from "../components/items/PhotoItem";
import { getInnerList ,getCurrentUser} from "../api/api"; 

export default function PhotosPage() {
  console.log("Rendering PhotosPage");
  
  const { userId, albumId } = useParams();
  const currentUser = getCurrentUser();
  if (userId !== currentUser.id) {
   alert("אין לך גישה לעמוד זה.");
        return <Navigate to={`http://localhost:5173/users/${currentUser.id}/home`} />; // החזר לדף הבית אם ID שונה
  }
  const updatePhoto = (item, newTitle) => ({ ...item, title: newTitle });
  const fetchMyPhotos = async (page, limit) => {
     const start = (page - 1) * limit;
     return await getInnerList("photos","albumId",albumId, start, limit);
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