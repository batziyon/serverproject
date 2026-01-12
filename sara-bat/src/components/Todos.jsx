import ListPage from "../components/ListPage";
import { getTodos } from "../api/api";
import { toggleCompleted } from "../api/api";

function Todos() {
  return (
    <ListPage
      title="Todos"
      fetchData={getTodos} // הפונקציה הגנרית ל־todos
      searchableFields={["id", "title"]}
      sortableFields={["id", "title"]}
      showCompleted={true} // כאן כן מציגים Checkbox
      onToggle={toggleCompleted} // פונקציה לעדכון סטטוס
    />
  );
}

export default Todos;
