import ListPage from "../components/ListPage";
import AlbumItem from "./AlbumItem";
import { getAlbums, updateData, deleteData } from "../api/api";

export default function AlbumsPage() {

  const handleUpdateAlbum = (albumId, newData) => updateData("albums", albumId, newData);
  const handleDeleteAlbum = (albumId) => deleteData("albums", albumId);

  return (
    <ListPage
      title="Albums"
      fetchData={getAlbums}
      searchableFields={["all", "id", "title"]}
      sortableFields={["id", "title"]}
      renderItem={(item) => (
        <AlbumItem
          album={item}
          onDelete={handleDeleteAlbum}
          onUpdate={handleUpdateAlbum}
        />
      )}
      showExtraSearchButton={false}
    />
  );
}
