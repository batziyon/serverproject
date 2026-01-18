import { useEffect, useState } from "react";

function useListData(fetchData, limit) {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async (pageNum) => {
    setIsLoading(true);
    const data = await fetchData(pageNum, limit);
    if (data.length < limit) setHasMore(false);
    if (pageNum === 1) {
      setItems(data);
      setFiltered(data);
    } else {
      setItems(prev => [...prev, ...data]);
      setFiltered(prev => [...prev, ...data]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadData(1);
  }, [fetchData]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    loadData(next);
  };

  return {
    items,
    filtered,
    setFiltered,
    isLoading,
    hasMore,
    loadMore,
    setItems
  };
}

export default useListData;
