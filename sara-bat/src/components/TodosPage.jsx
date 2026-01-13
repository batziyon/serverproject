import ListPage from "../components/ListPage";
import TodoItem from "../components/TodoItem";
import { getTodos } from "../api/api";

export default function TodosPage() {
  return (
    <ListPage
      title="Todos"
      fetchData={getTodos}
      searchableFields={["id", "title"]}
      sortableFields={["id", "title"]}
      renderItem={(item, del, toggle) => (
        <TodoItem
          item={item}
          onDelete={del}
          onToggle={toggle}
        />
      )}
    />
  );
}
