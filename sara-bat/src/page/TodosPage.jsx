import { Navigate, useParams } from "react-router-dom";
import ListPage from "../components/ListPage";
import TodoItem from "../components/items/TodoItem";
import { getList ,getCurrentUser} from "../api/api";

export default function TodosPage() {
  const { userId } = useParams();
  const currentUser = getCurrentUser();
  if (userId !== currentUser.id) {
    alert("אין לך גישה לעמוד זה.");
    return <Navigate to={`http://localhost:5173/users/${currentUser.id}/home`} />; // החזר לדף הבית אם ID שונה
  }

  const updateTodo = (item, newTitle) => {
    return { ...item, title: newTitle };
  };
  const fetchMyTodos = async (page, limit) => {
    const start = (page - 1) * limit;
    return await getList("todos", userId, start, limit);
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