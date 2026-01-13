import { useEffect, useState } from "react";
import { toggleCompleted, updateData, deleteData } from "../api/api";

function ListPage({
  title,
  fetchData,
  searchableFields = [],
  sortableFields = [],
  renderItem,
  showExtraSearchButton,
  option,
  onUpdate // חובה
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
    if (searchField === "all") setFiltered(items);
    else setFiltered(
      items.filter(item =>
        String(item[searchField]).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, searchField, items]);

  const handleSort = (field) => {
    setFiltered([...filtered].sort((a, b) =>
      String(a[field]).localeCompare(String(b[field]))
    ));
  };

  const handleUpdate = async (...args) => {
    const payload = onUpdate(...args);
    const id = args[0].id;

    const updated = await updateData(title.toLowerCase(), id, payload);

    setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
    setFiltered(prev => prev.map(i => i.id === updated.id ? updated : i));
  };

  const handleToggle = async (todo) => {
    const updated = await toggleCompleted(todo);
    setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
    setFiltered(prev => prev.map(i => i.id === updated.id ? updated : i));
  };

  const handleDelete = async (id) => {
    await deleteData(title.toLowerCase(), id);
    setItems(prev => prev.filter(i => i.id !== id));
    setFiltered(prev => prev.filter(i => i.id !== id));
  };

  const handleExtraSearch = (completed) => {
    if (completed === "all") return setFiltered(items);
    const bool = completed === "done";
    setFiltered(items.filter(item => item.completed === bool));
  };

  return (
    <div>
      <h2>{title}</h2>

      <select onChange={e => setSearchField(e.target.value)}>
        {searchableFields.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      <input
        placeholder="חיפוש..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      {showExtraSearchButton &&
        <select onChange={e => handleExtraSearch(e.target.value)}>
          {option.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      }

      <select onChange={e => handleSort(e.target.value)}>
        {sortableFields.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      {!filtered.length && <h2>אין תוצאות</h2>}

      <ul>
        {filtered.map(item => (
          <li key={item.id}>
            {renderItem(item, handleDelete, handleToggle, handleUpdate)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
