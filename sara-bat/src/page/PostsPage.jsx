import { Navigate, useParams } from "react-router-dom";
import ListPage from "../components/ListPage";
import PostItem from "../components/items/PostItem";
import { getList,getCurrentUser } from "../api/api";

export default function PostsPage() {
  const { userId } = useParams();
  const currentUser = getCurrentUser();
  if (userId !== currentUser.id) {
     alert("אין לך גישה לעמוד זה.");
        return <Navigate to={`http://localhost:5173/users/${currentUser.id}/home`} />; // החזר לדף הבית אם ID שונה
  }
  const updatePost = (item, updatedFields) => ({
    ...item,
    ...updatedFields
  });

  const fetchMyPosts = async (page, limit) => {
    const start = (page - 1) * limit;
    return await getList("posts", userId, start, limit);
  };

  return (
    <ListPage
      title="Posts"
      fetchData={fetchMyPosts}
      backPath={`/users/${userId}/home`}
        endMessage="-- אין עוד פוסטים --"
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