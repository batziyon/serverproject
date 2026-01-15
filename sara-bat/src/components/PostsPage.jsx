import { useParams } from "react-router-dom";
import ListPage from "./ListPage";
import PostItem from "./PostItem";
import { getPosts } from "../api/api";

export default function PostsPage() {
  const { userId } = useParams();

  const updatePost = (item, updatedFields) => ({
    ...item,
    ...updatedFields
  });

  const fetchMyPosts = async (page, limit) => {
    const start = (page - 1) * limit;
    return await getPosts(userId, start, limit); 
  };

  return (
    <ListPage
      title="Posts"
      fetchData={fetchMyPosts}
      limit={10}
      addItemFields={[
        { key: "title", placeholder: "כותרת הפוסט" },
        { key: "body", placeholder: "תוכן הפוסט" } 
      ]}
      searchableFields={["all", "title", "id"]}
      sortableFields={["id", "title"]}
      onUpdate={updatePost}
      renderItem={(item, del, _toggle, update) => (
        <PostItem
          key={item.id}
          item={item}
          onDelete={del}
          onChange={update}
        />
      )}
    />
  );
}