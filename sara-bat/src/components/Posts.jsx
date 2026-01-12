import ListPage from "../components/ListPage";
import { getPosts } from "../api/api";

function Posts() {
  return (
    <ListPage
      title="Posts"
      fetchData={getPosts}
      searchableFields={["id", "title"]}
      sortableFields={["id", "title"]}
      showCompleted={false}
    />
  );
}

export default Posts;
