import ListPage from "../components/ListPage";
import PostItem from "../components/PostItem";
import { getPosts } from "../api/api";

export default function PostsPage() {
  return (
    <ListPage
      title="Posts"
      fetchData={getPosts}
      searchableFields={["id", "title"]}
      sortableFields={["id", "title"]}
      renderItem={(item, onDelete) => (
        <PostItem item={item} onDelete={onDelete} />
      )}
    />
  );
}
