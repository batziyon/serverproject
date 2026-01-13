import ListPage from "../components/ListPage";
import TodoItem from "../components/TodoItem";
import { getTodos } from "../api/api";

export default function TodosPage() {
  return (
    <ListPage
      title="Todos"
      fetchData={getTodos}
      searchableFields={["all","id", "title"]}
      sortableFields={["id", "title"]}
      option={["all","done", "not done"]}
      renderItem={(item, del, toggle, change) => (
        <TodoItem
          item={item}
          onDelete={del}
          onToggle={toggle}
          onChange={change}
        />
      )}
      showExtraSearchButton={true}
    />
  );
}
