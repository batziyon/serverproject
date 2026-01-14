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
  onUpdate,
  addBody,

}) {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState(searchableFields[0] || "");
  
  // סטייט עבור פריטים חדשים
  const [newItems, setNewItems] = useState([]);

  // טעינת נתונים
  useEffect(() => {
    async function load() {
      const data = await fetchData();
      setItems(data);
      setFiltered(data);
    }
    load();
  }, [fetchData]);

  // חיפוש
  useEffect(() => {
    if (searchField === "all") setFiltered(items);
    else setFiltered(
      items.filter(item =>
        String(item[searchField]).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, searchField, items]);

  // סידור
  const handleSort = (field) => {
    setFiltered([...filtered].sort((a, b) =>
      String(a[field]).localeCompare(String(b[field]))
    ));
  };

  // עדכון פריט
  const handleUpdate = async (...args) => {
    const payload = onUpdate(...args);
    const id = args[0].id;

    const updated = await updateData(title.toLowerCase(), id, payload);

    setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
    setFiltered(prev => prev.map(i => i.id === updated.id ? updated : i));
  };

  // שינוי סטטוס
  const handleToggle = async (todo) => {
    const updated = await toggleCompleted(todo);
    setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
    setFiltered(prev => prev.map(i => i.id === updated.id ? updated : i));
  };

  // מחיקה
  const handleDelete = async (id) => {
    await deleteData(title.toLowerCase(), id);
    setItems(prev => prev.filter(i => i.id !== id));
    setFiltered(prev => prev.filter(i => i.id !== id));
  };

  // חיפוש מתקדם
  const handleExtraSearch = (completed) => {
    if (completed === "all") return setFiltered(items);
    const bool = completed === "done";
    setFiltered(items.filter(item => item.completed === bool));
  };

  // --- הוספה דינמית ---
  const addNewRow = () => {
    setNewItems(prev => [...prev, { title: "", body: "" }]);
  };

  const handleChangeRow = (index, field, value) => {
 
    setNewItems(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleAddAll = () => {
    const itemsToAdd = newItems.filter(i => i.title); // רק עם כותרת
    setItems(prev => [...prev, ...itemsToAdd]);
    setFiltered(prev => [...prev, ...itemsToAdd]);
    //צריך להוסיף שליחה לשר
    setNewItems([]); // איפוס השורות
  };

  return (
    <div>
      <h2>{title}</h2>

      {/* חיפוש */}
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

      {/* סידור */}
      <select onChange={e => handleSort(e.target.value)}>
        {sortableFields.map(f => <option key={f} value={f}>{f}</option>)}
      </select>

      {/* רשימת פריטים */}
      {!filtered.length && <h2>אין תוצאות</h2>}
      <ul>
        {filtered.map(item => (
          <li key={item.id}>
            {renderItem(item, handleDelete, handleToggle, handleUpdate)}
          </li>
        ))}
      </ul>

      {/* כפתור הוספה */}
      <button onClick={addNewRow}>הוסף שורה חדשה</button>

      {/* שורות חדשות */}
      {newItems.map((item, index) => (
        <div key={index} style={{ marginTop: "8px", padding: "8px", border: "1px solid #ccc", borderRadius: "6px", maxWidth: "400px" }}>
          <input
            type="text"
            placeholder="כותרת"
            value={item.title}
            onChange={e => handleChangeRow(index, "title", e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />
        
          {addBody && (
            <input
              type="text"
              placeholder="גוף הפוסט"
              value={item.body}
              onChange={e => handleChangeRow(index, "body", e.target.value)}
              style={{ width: "100%", marginBottom: "8px" }}
            />
          )}
        </div>
      ))}

      {/* כפתור להוספה סופית */}
      {newItems.length > 0 && <button onClick={handleAddAll} style={{ marginTop: "8px" }}>הוסף את כל הפריטים</button>}
    </div>
  );
}

export default ListPage;
