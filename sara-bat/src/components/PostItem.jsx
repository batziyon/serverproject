import { useState } from "react";

function PostItem({ item, onDelete, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <strong>{item.id}</strong> – {item.title}
      </div>

      <button onClick={() => onDelete(item.id)}>מחק</button>
      <button onClick={() => onChange(item.id)}>עידכון</button>
      {open && (
        <p style={{ marginTop: 8 }}>
          {item.body}
        </p>
      )}
    </div>
  );
}

export default PostItem;
