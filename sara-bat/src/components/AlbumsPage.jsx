import ListPage from "../components/ListPage";
import AlbumItem from "./AlbumItem";
import { getAlbums } from "../api/api";

export default function AlbumsPage() {
  return (
    <ListPage
      title="Albums"
      fetchData={getAlbums}
      searchableFields={["all", "id", "title"]}
      sortableFields={["id", "title"]}
      option={[]}
      renderItem={(item, onDelete) => (
        <AlbumItem item={item} onDelete={onDelete} />
      )}
      showExtraSearchButton={false}
    />
  );
}
