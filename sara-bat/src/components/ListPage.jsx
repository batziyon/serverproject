
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import useSearchAndSort from "../hooks/useSearchAndSort";
import useListData from "../hooks/useListData";
import useRowInputs from "../hooks/useRowInputs";

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
  endMessage = "-- אין עוד פריטים --"
}) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    items,
    filtered,
    setFiltered,
    isLoading,
    hasMore,
    loadMore,
    setItems
  } = useListData(fetchData, limit);

  const crud = useCrud({ title, baseData, setItems, setFiltered, onUpdate, primaryField });
  const searchSort = useSearchAndSort({
    title,
    items,
    setFiltered,
    searchableFields,
    baseData,
    userId
  });
  const rowInputs = useRowInputs(addItemFields, primaryField, crud.createMany);

  const handleUpdate = crud.update;
  const handleToggle = crud.toggle;
  const handleDelete = crud.remove;

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
        <select value={searchSort.searchField} onChange={e => searchSort.setSearchField(e.target.value)}>
          <option value="all">all</option>
          {searchableFields.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <input
          placeholder="חיפוש..."
          value={searchSort.searchValue}
          onChange={e => searchSort.setSearchValue(e.target.value)}
        />

        {showExtraSearchButton && (
          <select onChange={e => searchSort.extraFilter(e.target.value)}>
            {option.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        <select onChange={e => searchSort.sortBy(e.target.value)}>
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

      {!searchSort.searchValue && hasMore && !isLoading && (
        <button onClick={loadMore}>טען עוד</button>
      )}

      {isLoading && <p>טוען...</p>}

      {!searchSort.searchValue && !isLoading && !hasMore && items.length > 0 && (
        <p style={{ color: "#888", textAlign: "center" }}>
          {endMessage}
        </p>
      )}
      <hr />

      <button onClick={rowInputs.addRow}>הוסף שורה חדשה</button>

      {rowInputs.newRows.map((item, index) => (
        <div key={index}>
          {addItemFields.map(field => (
            <input
              key={field.key}
              placeholder={field.placeholder}
              value={item[field.key]}
              onChange={e =>
                rowInputs.changeRow(index, field.key, e.target.value)
              }
            />
          ))}
        </div>
      ))}

      {rowInputs.newRows.length > 0 && (
        <button onClick={rowInputs.createRows}>הוסף</button>
      )}
    </div>
  );
}

export default ListPage;
