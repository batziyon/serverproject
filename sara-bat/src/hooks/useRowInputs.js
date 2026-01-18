import { useState } from "react";

/**
 * Hook for managing new row inputs and creation in ListPage
 * @param {Array} addItemFields - array of field definitions {key, placeholder}
 * @param {string} primaryField - the main field to check for validity
 * @param {Function} onCreateMany - function to call with valid items (e.g. crud.createMany)
 * @returns {object}
 */
export default function useRowInputs(addItemFields, primaryField, onCreateMany) {
  const [newRows, setNewRows] = useState([]);

 
  const addRow = () => {
    const obj = {};
    addItemFields.forEach(f => (obj[f.key] = ""));
    setNewRows(prev => [...prev, obj]);
  };

  const changeRow = (index, field, value) => {
    setNewRows(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const createRows = async () => {
    const valid = newRows.filter(i => i[primaryField]);
    if (!valid.length) return;
    await onCreateMany(valid);
    setNewRows([]);
  };

  const removeRow = (index) => {
    setNewRows(prev => prev.filter((_, i) => i !== index));
  };

  return {
    newRows,
    addRow,
    changeRow,
    createRows,
    removeRow,
    setNewRows
  };
}
