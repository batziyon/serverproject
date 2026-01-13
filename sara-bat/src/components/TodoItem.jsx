import { useState } from "react";

function TodoItem({ item, onDelete, onToggle, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.title);

  return (
    <div>
      <input type="checkbox" checked={item.completed} onChange={() => onToggle(item)} />

      {!isEditing ? (
        <span>{item.title}</span>
      ) : (
        <input value={value} onChange={e => setValue(e.target.value)} />
      )}

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>שינוי</button>
      ) : (
        <button onClick={() => { onChange(item, value); setIsEditing(false); }}>שמור</button>
      )}

      <button onClick={() => onDelete(item.id)}>מחק</button>
    </div>
  );
}

export default TodoItem;
