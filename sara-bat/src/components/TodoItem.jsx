function TodoItem({ item, onDelete, onToggle, onChange }) {
  
  return (
    <div>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item)}
      />
      {item.id}-{item.title}
      <button onClick={() => onDelete(item.id)}>מחק</button>
        <button onClick={() => onChange(item.id)}>עידכון</button>
    </div>
  );
}

export default TodoItem;
