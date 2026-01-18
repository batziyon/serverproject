import { Navigate, useParams } from "react-router-dom";
import CommentsItem from "../components/CommentsItem";
import { getCommentsByPost } from "../api/api";
import ListPage from "../components/ListPage";

export default function CommentsPage() {
  const { userId, postId } = useParams();

  const fetchMycomments = async (page, limit) => {
    const start = (page - 1) * limit;
    return await getCommentsByPost(postId, start, limit);
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (userId !== currentUser.id) {
    return <Navigate to="/login" />; // החזר לדף הבית אם ID שונה
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