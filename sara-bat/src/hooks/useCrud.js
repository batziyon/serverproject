import {
  toggleCompleted,
  updateData,
  deleteData,
  createData
} from "../api/api";

function useCrud({ title, baseData, setItems, setFiltered, onUpdate, primaryField = "title" }) {
  const entity = title.toLowerCase();

  // Update item (used for handleUpdate)
  const update = async (...args) => {
    const payload = onUpdate(...args);
    const updated = await updateData(entity, args[0].id, payload);
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
    setFiltered(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };

  // Toggle completed (used for handleToggle)
  const toggle = async (item) => {
    const updated = await toggleCompleted(item);
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
    setFiltered(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };

  // Remove item (used for handleDelete)
  const remove = async (id) => {
    await deleteData(entity, id);
    setItems(prev => prev.filter(i => i.id !== id));
    setFiltered(prev => prev.filter(i => i.id !== id));
  };

  // Create many items (used for handleAddAll)
  const createMany = async (items) => {
    const created = await Promise.all(
      items.map(item =>
        createData(entity, { ...item, ...baseData })
      )
    );
    setItems(prev => [...created, ...prev]);
    setFiltered(prev => [...created, ...prev]);
  };

  return { update, toggle, remove, createMany };
}

export default useCrud;
