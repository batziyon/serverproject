import { useEffect, useState } from "react";
// import { handleDelete } from "../hooks/useListPage"
import { toggleCompleted,updateData ,deleteData} from "../api/api";

function ListPage({
  title,
  fetchData,
  searchableFields = [],
  sortableFields = [],
  renderItem,
  showExtraSearchButton,
  option,
}) {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState(searchableFields[0] || "");

  useEffect(() => {
    async function load() {
      const data = await fetchData();
      setItems(data);
      setFiltered(data);
    }
    load();
  }, [fetchData]);

  useEffect(() => {
    if (searchField === "all") {
      setFiltered(items);
      return;
    }
    setFiltered(
      items.filter(item =>
        String(item[searchField])
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    );

  }, [searchValue, searchField, items]);

  const handleSort = (field) => {
    setFiltered([...filtered].sort((a, b) =>
      String(a[field]).localeCompare(String(b[field]))
    ));
  };



  const handleToggle = async (todo) => {
    const updated = await toggleCompleted(todo);

    setItems(prev =>
      prev.map(item =>
        item.id === updated.id ? updated : item
      )
    );

    setFiltered(prev =>
      prev.map(item =>
        item.id === updated.id ? updated : item
      )
    );
  };

  const handleExstraSearch = (completed) => {

    if (completed === "all") {
      setFiltered(items)
      return
    }
    if (completed === "done")
      completed = true
    else
      completed = false;
    setFiltered(
      items.filter(item =>
        item["completed"] === completed
      )
    );
  }
  const handleDelete = async (id) => {
    await deleteData(title.toLowerCase(), id);
    setItems(prev => prev.filter(i => i.id !== id));
    setFiltered(prev => prev.filter(i => i.id !== id));
  };
  const handleUpdate = async (id) => {
    await updateData(title.toLowerCase(), id,"{title: 'updated title'} );");
    
  };
  return (
    <div>
      <h2>{title}</h2>

      <select onChange={e => setSearchField(e.target.value)}>

        {searchableFields.map(fields => (
          <option key={fields} value={fields}>{fields}</option>
        ))}
      </select>

      <input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="חיפוש..."
      />

      {showExtraSearchButton &&
        <select onChange={e => handleExstraSearch(e.target.value)}>

          {option.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      }

      <select onChange={e => handleSort(e.target.value)}>
        {sortableFields.map(fields => (
          <option key={fields} value={fields}>{fields}</option>
        ))}
      </select>

      {!filtered.length && <h2>אין תוצאות</h2>}

      <ul>
        {filtered.map(item => (
          <li key={item.id}>
            {renderItem(item, handleDelete, handleToggle,)}
          </li>
        ))}
      </ul>
    </div >
  );
}

export default ListPage;
