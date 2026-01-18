import { Navigate, useParams } from "react-router-dom";
import CommentsItem from "../components/items/CommentsItem";
import { getCommentsByPost ,getCurrentUser} from "../api/api";
import ListPage from "../components/ListPage";

export default function CommentsPage() {
  const { userId, postId } = useParams();

  const fetchMycomments = async (page, limit) => {
    const start = (page - 1) * limit;
    return await getCommentsByPost(postId, start, limit);
  };
  const currentUser = getCurrentUser();
  if (userId !== currentUser.id) {
    alert("אין לך גישה לעמוד זה.");
    return <Navigate to={`http://localhost:5173/users/${currentUser.id}/home`} />; // החזר לדף הבית אם ID שונה
  }


  return (
   <ListPage
  title="comments"
  fetchData={fetchMycomments}
  limit={10}
  baseData={{ postId }}
  backPath={`/users/${userId}/posts`}
  primaryField="body"   // ⭐️ חשוב מאוד
  addItemFields={[
    { key: "name", placeholder: "שם המגיב" },
    { key: "body", placeholder: "תוכן התגובה" }
  ]}
  searchableFields={["id","name"]}
  sortableFields={["id", "name"]}
  renderItem={(item, del, _toggle, update) => (
    <CommentsItem
      key={item.id}
      item={item}
      onDelete={del}
      onChange={update}
    />
  )}
/>
  );
}