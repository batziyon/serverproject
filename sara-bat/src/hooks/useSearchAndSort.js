import { useEffect, useState } from "react";
import { searchOne } from "../api/api";

function useSearchAndSort({
  title,
  items,
  setFiltered,
  searchableFields,
  baseData
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState(
    searchableFields[0] || "all"
  );

  useEffect(() => {
    const runSearch = async () => {
      if (!searchValue) {
        setFiltered(items);
        return;
      }

      const result = await searchOne(
        title.toLowerCase(),
        searchValue,
        searchField === "all" ? searchableFields : [searchField],
        baseData
      );

      setFiltered(result ? [result] : []);
    };

    runSearch();
  }, [searchValue, searchField, items]);

  const sortBy = (field) => {
    setFiltered(prev =>
      [...prev].sort((a, b) =>
        String(a[field]).localeCompare(String(b[field]))
      )
    );
  };

  const extraFilter = (completed) => {
    if (completed === "all") {
      setFiltered(items);
      return;
    }

    setFiltered(
      items.filter(item =>
        item.completed === (completed === "done")
      )
    );
  };

  return {
    searchValue,
    setSearchValue,
    searchField,
    setSearchField,
    sortBy,
    extraFilter
  };
}

export default useSearchAndSort;
