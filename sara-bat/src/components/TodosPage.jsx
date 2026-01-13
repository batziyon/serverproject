// TodosPage.jsx
import ListPage from "../components/ListPage";
import TodoItem from "../components/TodoItem";
import { getTodos } from "../api/api";

export default function TodosPage() {
  const updateTodo = (item, newTitle) => ({
    userId: item.userId,
    id: item.id,
    title: newTitle,
    completed: item.completed
  });

  return (
    <ListPage
      title="Todos"
      fetchData={getTodos}
      searchableFields={["all", "id", "title"]}
      sortableFields={["id", "title"]}
      option={["all","done","not done"]}
      onUpdate={updateTodo}
      renderItem={(item, del, toggle, update) => (
        <TodoItem
          item={item}
          onDelete={del}
          onToggle={toggle}
          onChange={update}
        />
      )}
      showExtraSearchButton={true}
    />
  );
}
