import ListPage from "../components/ListPage";
import PostItem from "../components/PostItem";
import { getPosts } from "../api/api";

export default function PostsPage() {
  const updatePost = (item, newTitle, newBody) => ({
    id: item.id,
    userId: item.userId,
    title: newTitle,
    body: newBody
  });

  return (
    <ListPage
      title="Posts"
      fetchData={getPosts}
      searchableFields={["all", "id", "title"]}
      sortableFields={["id", "title"]}
      option={[]}
      onUpdate={updatePost}
      renderItem={(item, onDelete, toggle, update) => (
        <PostItem
          item={item}
          onDelete={onDelete}
          onChange={update}
        />
      )}
         addBody={true}
      addPhoto={false}
      showExtraSearchButton={false}
    />
  );
}

