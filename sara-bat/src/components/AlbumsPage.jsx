import { useParams } from "react-router-dom";
import ListPage from "./ListPage";
import AlbumItem from "./AlbumItem";
import { getAlbums } from "../api/api";

export default function AlbumsPage() {
  const { userId } = useParams();

  const updateAlbum = (item, newTitle) => {
    return { ...item, title: newTitle };
  };

  // --- הפונקציה שתומכת בטעינה מדורגת ---
  const fetchMyAlbums = async (page, limit) => {
    // המרת מספר עמוד לנקודת התחלה (Offset)
    const start = (page - 1) * limit;
    return await getAlbums(userId, start, limit);
  };

  return (
    <ListPage
      title="Albums"
      fetchData={fetchMyAlbums} // שולחים את הפונקציה המעודכנת
      limit={10}                // טוענים 10 כל פעם
      
      baseData={{ userId: parseInt(userId) }} // נתונים להוספה (שיוך למשתמש)
      
      // כפתור חזור לדף הבית של המשתמש
      backPath={`/users/${userId}`} 
      
      // --- ההודעה שביקשת כשהכל נגמר ---
      endMessage="-- אין עוד אלבומים --"
      
      // שדות להוספת אלבום חדש
      addItemFields={[
        { key: "title", placeholder: "שם האלבום החדש" }
      ]}
      
      searchableFields={["title", "id"]}
      sortableFields={["id", "title"]}
      
      onUpdate={updateAlbum}
      
      renderItem={(item, del, _toggle, update) => (
        <AlbumItem
          key={item.id}
          item={item}
          onDelete={del}
          onChange={update}
        />
      )}
    />
  );
}