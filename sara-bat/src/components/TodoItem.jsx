function TodoItem({ item, onDelete, onToggle }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item)}
      />
      {item.title}
      <button onClick={() => onDelete(item.id)}>מחק</button>
    </div>
  );
}

export default TodoItem;
