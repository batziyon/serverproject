import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  toggleCompleted,
  updateData,
  deleteData,
  createData,
  searchOne
} from "../api/api";

function ListPage({
  title,
  fetchData,
  searchableFields = [],
  sortableFields = [],
  renderItem,
  showExtraSearchButton,
  option,
  onUpdate,
  addItemFields = [{ key: "title", placeholder: "כותרת" }],
  baseData = {},
  limit = 10,
  backPath,
  primaryField = "title",
  endMessage="-- אין עוד פריטים --"
}) {
  const navigate = useNavigate();
  const { userId } = useParams();

  /* ===== STATE (כמו שהיה) ===== */
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState(searchableFields[0] || "all");
  const [newItems, setNewItems] = useState([]);

  /* ===== LOAD DATA ===== */
  const loadData = async (pageNum) => {
    setIsLoading(true);
    const data = await fetchData(pageNum, limit);

    if (data.length < limit) setHasMore(false);

    if (pageNum === 1) {
      setItems(data);
      setFiltered(data);
    } else {
      setItems(prev => [...prev, ...data]);
      setFiltered(prev => [...prev, ...data]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    
    console.log("Fetching data...");
    setPage(1);
    setHasMore(true);
    loadData(1);
  }, [fetchData]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    loadData(next);
  };

  /* ===== 🔥 SEARCH – זה החלק שהוחלף ===== */
  useEffect(() => {
    const runSearch = async () => {
      if (!searchValue) {
        setFiltered(items);
        return;
      }
      setIsLoading(true);
      const result = await searchOne(
        title.toLowerCase(),
        searchValue,
        searchField === "all" ? searchableFields : [searchField],
        baseData,
        userId
      );
      setFiltered(result || []);
      setIsLoading(false);
    };
    runSearch();
    // eslint-disable-next-line
  }, [searchValue, searchField]);

  // Whenever items change (from loadData), update filtered only if not searching
  useEffect(() => {
    if (!searchValue) {
      setFiltered(items);
    }
    // eslint-disable-next-line
  }, [items]);

  /* ===== SORT ===== */
  const handleSort = (field) => {
    setFiltered([...filtered].sort((a, b) =>
      String(a[field]).localeCompare(String(b[field]))
    ));
  };

  /* ===== EXTRA FILTER ===== */
  const handleExtraSearch = (completed) => {
    if (completed === "all") return setFiltered(items);
    setFiltered(
      items.filter(item => item.completed === (completed === "done"))
    );
  };

  /* ===== CRUD ===== */
  const handleUpdate = async (...args) => {
    const payload = onUpdate(...args);
    const updated = await updateData(
      title.toLowerCase(),
      args[0].id,
      payload
    );

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

  /* ===== ADD ===== */
  const addNewRow = () => {
    const obj = {};
    addItemFields.forEach(f => obj[f.key] = "");
    setNewItems(prev => [...prev, obj]);
  };

  const handleChangeRow = (index, field, value) => {
    setNewItems(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleAddAll = async () => {
    const valid = newItems.filter(i => i[primaryField]);
    if (!valid.length) return;

    const created = await Promise.all(
      valid.map(item =>
        createData(title.toLowerCase(), { ...item, ...baseData })
      )
    );

    setItems(prev => [...created, ...prev]);
    setFiltered(prev => [...created, ...prev]);
    setNewItems([]);
  };

  /* ===== RENDER ===== */
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        {userId && (
          <button onClick={() => navigate(`/users/${userId}/home`)}>🏠 בית</button>
        )}
        {backPath && (
          <button onClick={() => navigate(backPath)}>🡨 חזור</button>
        )}
      </div>

      <h2>{title}</h2>

      <div style={{ marginBottom: 15 }}>
        <select value={searchField} onChange={e => setSearchField(e.target.value)}>
          <option value="all">all</option>
          {searchableFields.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <input
          placeholder="חיפוש..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />

        {showExtraSearchButton && (
          <select onChange={e => handleExtraSearch(e.target.value)}>
            {option.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        <select onChange={e => handleSort(e.target.value)}>
          {sortableFields.map(fields => (
            <option key={fields} value={fields}>{fields}</option>
          ))}
        </select>
      </div>


      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.map(item => (
          <li key={item.id}>
            {renderItem(item, handleDelete, handleToggle, handleUpdate)}
          </li>
        ))}
      </ul>

      {!searchValue && hasMore && !isLoading && (
        <button onClick={handleLoadMore}>טען עוד</button>
      )}

      {isLoading && <p>טוען...</p>}

      {!searchValue && !isLoading && !hasMore && items.length > 0 && (
        <p style={{ color: "#888", textAlign: "center" }}>
          {endMessage}
        </p>
      )}
      <hr />

      <button onClick={addNewRow}>הוסף שורה חדשה</button>

      {newItems.map((item, index) => (
        <div key={index}>
          {addItemFields.map(field => (
            <input
              key={field.key}
              placeholder={field.placeholder}
              value={item[field.key]}
              onChange={e =>
                handleChangeRow(index, field.key, e.target.value)
              }
            />
          ))}
        </div>
      ))}

      {newItems.length > 0 && (
        <button onClick={handleAddAll}>הוסף</button>
      )}
    </div>
  );
}

export default ListPage;
