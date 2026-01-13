import { useState } from "react";

function PostItem({ item, onDelete, onChange }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  return (
    <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        <strong>{item.id}</strong> – {!isEditing ? title : (
          <input value={title} onChange={e => setTitle(e.target.value)} />
        )}
      </div>

      {!isEditing ? (
        <>
          <button onClick={() => onDelete(item.id)}>מחק</button>
          <button onClick={() => setIsEditing(true)}>שינוי</button>
        </>
      ) : (
        <button onClick={() => { onChange(item, title, body); setIsEditing(false); }}>שמור</button>
      )}

      {open && (
        <p style={{ marginTop: 8 }}>
          {!isEditing ? body : (
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={3} style={{ width: "100%" }} />
          )}
        </p>
      )}
    </div>
  );
}

export default PostItem;
