import { useParams } from "react-router-dom";
import CommentsItem from "./CommentsItem";
import { getCommentsByPost } from "../api/api"; 
import ListPage from "./ListPage";

export default function CommentsPage() {
  const { userId, postId } = useParams();

  const updatecomments = (item, newTitle) => ({ ...item, title: newTitle });
  const fetchMycomments = async (page, limit) => {
     const start = (page - 1) * limit;
     return await getCommentsByPost(postId, start, limit);
  };

  return (
    <ListPage
      title="comments"
      fetchData={fetchMycomments}
      limit={10} 
      baseData={{ postId: parseInt(postId) }}
      backPath={`/users/${userId}/albums`} 
      addItemFields={[
        { key: "title", placeholder: "כותרת התגובה" },
        { key: "body", placeholder: "תוכן התגובה" }
      ]}
      
      searchableFields={["title", "id"]}
      sortableFields={["id", "title"]}

      onUpdate={updatecomments}
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