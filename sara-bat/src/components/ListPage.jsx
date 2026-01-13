import { useEffect, useState } from "react";
import { deleteData, toggleCompleted } from "../api/api";

function ListPage({
  title,
  fetchData,
  searchableFields = [],
  sortableFields = [],
  renderItem,
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

  const handleSearch = () => {
    setFiltered(
      items.filter(item =>
        String(item[searchField])
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    );
  };

  const handleSort = (field) => {
    setFiltered([...filtered].sort((a, b) =>
      String(a[field]).localeCompare(String(b[field]))
    ));
  };

  const handleDelete = async (id) => {
    await deleteData(title.toLowerCase(), id);
    setItems(prev => prev.filter(i => i.id !== id));
    setFiltered(prev => prev.filter(i => i.id !== id));
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

  return (
    <div>
      <h2>{title}</h2>

      <select onChange={e => setSearchField(e.target.value)}>
        {searchableFields.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="חיפוש..."
      />
      <button onClick={handleSearch}>חפש</button>

      <select onChange={e => handleSort(e.target.value)}>
        {sortableFields.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <ul>
        {filtered.map(item => (
          <li key={item.id}>
            {renderItem(item, handleDelete, handleToggle)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
