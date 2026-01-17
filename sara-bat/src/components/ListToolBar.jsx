function ListToolbar({
  searchableFields,
  sortableFields,
  searchField,
  setSearchField,
  searchValue,
  setSearchValue,
  showExtraSearchButton,
  option,
  onExtraSearch,
  onSort
}) {
  return (
    <div>
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
        <select onChange={e => onExtraSearch(e.target.value)}>
          {option.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )}

      <select onChange={e => onSort(e.target.value)}>
        {sortableFields.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
    </div>
  );
}

export default ListToolbar;
