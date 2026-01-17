function ListItems({ items, renderItem, onDelete, onToggle, onUpdate }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map(item => (
        <li key={item.id}>
          {renderItem(item, onDelete, onToggle, onUpdate)}
        </li>
      ))}
    </ul>
  );
}

export default ListItems;
