function InlineAddForm({
  fields,
  items,
  onChange,
  onAddRow,
  onSubmit,
  primaryField
}) {
  return (
    <>
      <button onClick={onAddRow}>הוסף שורה חדשה</button>

      {items.map((item, index) => (
        <div key={index}>
          {fields.map(field => (
            <input
              key={field.key}
              placeholder={field.placeholder}
              value={item[field.key]}
              onChange={e =>
                onChange(index, field.key, e.target.value)
              }
            />
          ))}
        </div>
      ))}

      {items.some(i => i[primaryField]) && (
        <button onClick={onSubmit}>הוסף</button>
      )}
    </>
  );
}

export default InlineAddForm;
