import ListPage from "../components/ListPage";
import PostItem from "../components/PostItem";
import { getPosts } from "../api/api";

export default function PostsPage() {
  return (
    <ListPage
      title="Posts"
      fetchData={getPosts}
      searchableFields={["all","id", "title"]}
      sortableFields={["id", "title"]}
        option={[]}
      renderItem={(item, onDelete, change) => (
        <PostItem
         item={item} 
         onDelete={onDelete} 
         onChange={change} />
      )}
      showExtraSearchButton={false}
    />
  );
}
