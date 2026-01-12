import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ListPage({ title, fetchData, searchableFields = [], sortableFields = [] }) {
  const location = useLocation();

  const isTodo = location.pathname.includes("/todo");
  const isPost = location.pathname.includes("/posts");
  const isAlbum = location.pathname.includes("/albums");

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState(searchableFields[0] || "");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedItems, setExpandedItems] = useState({});
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    async function load() {
      const data = await fetchData();
      setItems(data);
      setFiltered(data);
    }
    load();
  }, [fetchData]);

  const handleSearch = () => {
    const results = items.filter(item => {
      const matchesText = String(item[searchField]).toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = isTodo? filterStatus === "all" ? true :
          filterStatus === "completed" ? item.completed :!item.completed : true;
      return matchesText && matchesStatus;
    });
    setFiltered(results);
  };

  const handleSort = (field) => {
    setFiltered([...filtered].sort((a, b) => String(a[field]).localeCompare(String(b[field]))));
  };

  const toggleCompleted = (item) => {
    if (!isTodo) return;
    //צריך לסדר את זה שיגש לשרת נכון
    const newItems = items.map(i => i.id === item.id ? { ...i, completed: !i.completed } : i);
    setItems(newItems);

    const results = newItems.filter(i => {
      const matchesText = String(i[searchField]).toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ? true :
        filterStatus === "completed" ? i.completed :
        !i.completed;
      return matchesText && matchesStatus;
    });
    setFiltered(results);
  };

  const toggleExpanded = async (item) => {
    if (!(isPost || isAlbum)) return; // רק Posts/Albums פתוחים
    setExpandedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }));
 //צריך לסדר את זה שיגש לשרת נכון
    if (isAlbum && !photos[item.id]) {
      const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${item.id}`);
      const data = await res.json();
      setPhotos(prev => ({ ...prev, [item.id]: data }));
    }
  };

  return (
    <div>
      <h2>{title}</h2>

      {/* חיפוש */}
      <div>
        <select value={searchField} onChange={e => setSearchField(e.target.value)}>
          {searchableFields.map(f => <option key={f} value={f}>{f}</option>)}
        </select>

        <input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="חיפוש..."
        />

        {isTodo && (
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">הכל</option>
            <option value="completed">הושלמו</option>
            <option value="pending">לא הושלמו</option>
          </select>
        )}

        <button onClick={handleSearch}>חפש</button>
      </div>

      {/* מיון */}
      <div>
        <select onChange={e => handleSort(e.target.value)}>
          {sortableFields.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {/* רשימה */}
      <ul>
        {filtered.length > 0 ? (
          filtered.map(item => (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: isPost || isAlbum ? "pointer" : "default" }}
                   onClick={() => toggleExpanded(item)}>
                {isTodo && (
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={e => { e.stopPropagation(); toggleCompleted(item); }}
                    style={{ marginRight: "8px" }}
                  />
                )}
                <strong>{item.id}</strong> - {item.title}
              </div>

              {expandedItems[item.id] && (
                <div style={{ paddingLeft: "24px", marginTop: "4px" }}>
                  {isPost && (
                    <div>
                      <p><strong>Content:</strong> {item.body}</p>
                      {/* אפשר להוסיף comments כאן */}
                    </div>
                  )}
                  {isAlbum && (
                    <div>
                      {photos[item.id] ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {photos[item.id].map(p => (
                            <img key={p.id} src={p.thumbnailUrl} alt={p.title} style={{ width: "100px" }} />
                          ))}
                        </div>
                      ) : (
                        <p>Loading photos...</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          <li>אין תוצאות</li>
        )}
      </ul>
    </div>
  );
}

export default ListPage;
