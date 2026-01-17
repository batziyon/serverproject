import { Navigate, useParams } from "react-router-dom";
import ListPage from "./ListPage";
import TodoItem from "./TodoItem";
import { getTodos } from "../api/api";

export default function TodosPage() {
  const { userId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (userId !== currentUser.id) {
    return <Navigate to="/login" />; // החזר לדף הבית אם ID שונה
  }

  const updateTodo = (item, newTitle) => {
    return { ...item, title: newTitle };
  };

  // --- הפונקציה החדשה לטעינה מדורגת ---
  const fetchMyTodos = async (page, limit) => {
    const start = (page - 1) * limit;
    // קריאה ל-API עם הפרמטרים החדשים
    return await getTodos(userId, start, limit);
  };

  return (
    <ListPage
      title="Todos"
      fetchData={fetchMyTodos} // משתמשים בפונקציה החדשה
      limit={10}               // טוענים 10 בכל פעם

      // הגדרת שדות להוספה (רק כותרת)
      addItemFields={[{ key: "title", placeholder: "מטלה חדשה" }]}

      searchableFields={["title", "id"]}
      sortableFields={["id", "completed", "title"]}

      backPath={`/users/${userId}/home`}
      endMessage="-- אין עוד מטלות --"
      showExtraSearchButton={true}
      option={["all", "done", "active"]}

      onUpdate={updateTodo}

      renderItem={(item, del, toggle, update) => (
        <TodoItem
          key={item.id}
          item={item}
          onDelete={del}
          onToggle={toggle}
          onChange={update}
        />
      )}
    />
  );
}