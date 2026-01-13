import { useState } from "react";

import { getData,deleteData } from "../api/api";

export function useAlbumPhotos() {
  const [photos, setPhotos] = useState([]);
  const [pages, setPages] = useState({});

  const loadInitial = async (albumId) => {
    const data = await getData(albumId);
    setPhotos(prev => ({ ...prev, [albumId]: data }));
    setPages(prev => ({ ...prev, [albumId]: 1 }));
  };

  // const handleDelete = async (id) => {
  //   await deleteData("albums", id);
  //   setPhotos(prev => prev.filter(i => i.id !== id));
  //   setPages(prev => prev.filter(i => i.id !== id));
  // };

  const loadMore = async (albumId) => {
    const next = (pages[albumId] || 1) + 1;
    const more = await getPhotos(albumId, next, 10);

    setPhotos(prev => ({
      ...prev,
      [albumId]: [...prev[albumId], ...more]
    }));
    setPages(prev => ({ ...prev, [albumId]: next }));
  };

  return { photos, loadInitial, loadMore };
}
