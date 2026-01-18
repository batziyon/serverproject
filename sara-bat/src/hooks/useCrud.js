import {
  toggleCompleted,
  updateData,
  deleteData,
  createData
} from "../api/api";

function useCrud({ title, baseData, setItems, setFiltered, onUpdate, primaryField = "title" }) {
  const entity = title.toLowerCase();

  const update = async (...args) => {
    const payload = onUpdate(...args);
    const updated = await updateData(entity, args[0].id, payload);
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
    setFiltered(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };


  const toggle = async (item) => {
    const updated = await toggleCompleted(item);
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
    setFiltered(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };

  const remove = async (id) => {
    await deleteData(entity, id);
    setItems(prev => prev.filter(i => i.id !== id));
    setFiltered(prev => prev.filter(i => i.id !== id));
  };

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
