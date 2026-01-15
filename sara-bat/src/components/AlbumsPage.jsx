import { useParams } from "react-router-dom";
import ListPage from "./ListPage";
import AlbumItem from "./AlbumItem";
import { getAlbums } from "../api/api";

export default function AlbumsPage() {
  const { userId } = useParams();

  const updateAlbum = (item, newTitle) => {
    return { ...item, title: newTitle };
  };

  const fetchMyAlbums = async (page, limit) => {
    const start = (page - 1) * limit;
    return await getAlbums(userId, start, limit);
  };

  return (
    <ListPage
      title="Albums"
      fetchData={fetchMyAlbums} 
      limit={10}              
      baseData={{ userId: parseInt(userId) }} 
      backPath={`/users/${userId}`} 
      endMessage="-- אין עוד אלבומים --"
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