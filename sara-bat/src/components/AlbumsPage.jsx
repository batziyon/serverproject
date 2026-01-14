import ListPage from "../components/ListPage";
import AlbumItem from "../components/AlbumItem";
import { getAlbums } from "../api/api";

export default function AlbumsPage() {
  const updateAlbum = (item, newTitle) => ({
    userId: item.userId,
    id: item.id,
    title: newTitle
  });

  return (
    <ListPage
      title="Albums"
      fetchData={getAlbums}
      searchableFields={["all", "id", "title"]}
      sortableFields={["id", "title"]}
      onUpdate={updateAlbum}
      renderItem={(item, del, _toggle, update) => (
        <AlbumItem
          item={item}
          onDelete={del}
          onChange={update}
        />
      )}
      addBody={false}
   
      showExtraSearchButton={false}
    />
  );
}
