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
      
      // אין צורך לשלוח backPath ידני, כי אנחנו נוסיף כפתור בית קבוע בליסט
      
      addItemFields={[
        { key: "title", placeholder: "כותרת הפוסט" },
        { key: "body", placeholder: "תוכן הפוסט" } 
      ]}
      
      // --- התיקון: החזרתי את "all" להתחלה ---
      searchableFields={["all", "title", "id", "body"]}
      // ---------------------------------------
      
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